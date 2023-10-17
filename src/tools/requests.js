import axios from 'axios'
import {authStore} from '../stores/authStore'
import { now, bApiUrl } from '../tools'
import { db } from '../plugins/dexie';

const _fixurl = (endpoint, url=bApiUrl) =>
  endpoint.startsWith('http') ? endpoint : 
  endpoint.startsWith('/') ? `${url}${endpoint.slice(1)}` :
  `${url}${endpoint}`

function decorator(fnc){
  return async function(searchurl, includeheaders, data=null){
    const endurl = _fixurl(searchurl)
    const headers =  includeheaders === true ? await get_headers() : {}
    if (data === null) return await fnc(endurl, headers)
    if (data !== null) return await fnc(endurl, data, headers)
  }
}

const _get = decorator(async (endurl, headers)=> await axios.get(endurl, headers))
const _post = decorator(async (endurl, headers, data)=> await axios.post(endurl, headers, data))
export const put = decorator(async (endurl, headers, data)=> await axios.put(endurl, data, headers))
export const patch = decorator(async (endurl, headers, data)=> await axios.patch(endurl, data, headers))
export const del = decorator(async (endurl, headers, data)=> await axios.delete(endurl, { ...headers, data: data || {} }))


export async function get(url, dt = 3600, includeheaders = true) {
  var response = await db['Get'].get({ url: _fixurl(url) })
  if (!navigator.onLine) {
    if ([null, undefined].includes(response)) return {}
    return JSON.parse(response?.response || '{}')
  }
  
  const deltatime = response ? (Date.now() - response.time || 0) / 1000 : dt + 100
  
  response = dt === 0 ? null : response // forcing to refresh the content
  if (deltatime >= dt && response === null) {
      response = await get_and_updatedexie(url, includeheaders)
  } else if (deltatime >= dt) {
    get_and_updatedexie(url, includeheaders)
  }
  
  if (response === null) return {}

  return JSON.parse(response?.response || '{}')
}

export async function post(url, data, includeheaders = true) {
  const newurl = _fixurl(url)
  const baseurl = newurl.split('/').splice(-1).join('/')
  const add_dexie = () => db['Post'].add({
        baseurl,
        url: newurl,
        jsondata: JSON.stringify({...data, timestamp:now()}),
        tries: 0,
        maxtries: 10,
        lasttimetryed: null,
        includeheaders
      })

  if (!navigator.onLine) return add_dexie()

  return await _post(newurl, includeheaders, data).catch(()=>add_dexie())
}

function getStoredRefresKey(){
  return JSON.parse(localStorage.getItem('user'))['bearerRefresh']

}
function hasRefreshKey(){
  return getStoredRefresKey() !== null
 }

export async function updateToken() {
  if (!hasRefreshKey()) return null

  try {
    // You cannot use _get function because it requires bearerRefresh instead
    var response = await axios.get(_fixurl('login/'),
            { headers: { Authorization: getStoredRefresKey() } })
    
    localStorage.setItem('userTkn', JSON.stringify({ time: Date.now(), token: response.data.access_token })
    )
    return response.data.access_token
  } catch (error) {
    if (error.response.data.auth === false) authStore().logout()
    return null
  }
}

export async function get_headers() {
  if (!navigator.onLine) return {}
  const storage = JSON.parse(localStorage.getItem('user'))
  if (storage['bearerRefresh'] === null)  return { headers: {} }

  const usertoken =storage['bearerkey']
  if (usertoken === null) {
    let token = await updateToken()
    if (token === null) return {}
    return { headers: { Authorization: token } }
  } 

  let {token, time} = usertoken
  const delta = (Date.now() - new Date(time).getTime()) / 1000 || 300
  if (delta > 296 ) token = await updateToken()

  return { headers: { Authorization: token } }
}

// It Needs to be done again
export async function get_unsaved_requests() {
  return await db['Post'].toCollection().toArray()
}

async function get_and_updatedexie(url, includeheaders) {
  try {
    const response = await _get(url, includeheaders)
    db['Get'].put({
      url: url,
      time: Date.now(),
      response: JSON.stringify(response)
    })
    return response
  } catch {
    return null
  }
}

export async function getUnposted(baseurl) {
  return await db['Post'].where({ baseurl }).toArray()
}

export async function getUnpost(parametrerAsObject) {
  return await db['Post'].where(parametrerAsObject).toArray()
}
