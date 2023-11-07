import axios from 'axios'
import { authStore } from '../stores/authStore'
import { now, bApiUrl } from '../tools'
import { db } from '../plugins/dexie';

export const _fixurl = (endpoint, url = bApiUrl) =>
  endpoint.startsWith('http') ? endpoint :
    endpoint.startsWith('/') ? `${url}${endpoint.slice(1)}` :
      `${url}${endpoint}`


function decorator(fnc) {
  return async function (searchurl, includeheaders, data = null) {
    const endurl = _fixurl(searchurl)
    console.log(`endurl: ${endurl}`)
    var headers
    if (includeheaders.constructor == Object) { // if it's a dictionary
      headers = includeheaders
    } else {
      headers = includeheaders === true ? await get_headers() : {}
    }
    if (data === null) return await fnc(endurl, headers)
    if (data !== null) return await fnc(endurl, data, headers)
  }
}

const _get = decorator(async (endurl, headers) => await axios.get(endurl, headers))
const _post = decorator(async (endurl, headers, data) => await axios.post(endurl, headers, data))
export const put = decorator(async (endurl, headers, data) => await axios.put(endurl, data, headers))
export const patch = decorator(async (endurl, headers, data) => await axios.patch(endurl, data, headers))
export const del = decorator(async (endurl, headers, data) => await axios.delete(endurl, { ...headers, data: data || {} }))


export async function get(url = '', dt = 3600, includeheaders = true, memorize = true) {
  let _url = _fixurl(url)

  if (!memorize) return await _get(_url, includeheaders)

  var response = await db['Get'].get({ url: _url })
  if (!navigator.onLine) {
    if ([null, undefined].includes(response)) return {}
    return JSON.parse(response?.response || '{}')
  }

  const deltatime = response ? (Date.now() - response.time || 0) / 1000 : dt + 100

  response = dt === 0 ? null : response // forcing to refresh the content
  if (deltatime >= dt && response === null) {
    response = await get_and_updatedexie(_url, includeheaders)
  } else if (deltatime >= dt) {
    get_and_updatedexie(_url, includeheaders)
  }

  if (response === null) return {}

  return JSON.parse(response?.response || '{}')
}

const add_dexie = (baseurl, newurl, data, includeheaders) => db['Post'].add({
  baseurl,
  url: newurl,
  jsondata: JSON.stringify({ ...data, timestamp: now() }),
  tries: 0,
  maxtries: 5,
  lasttimetryed: null,
  includeheaders
})

export async function post(url, data, includeheaders = true, memorize = true) {
  const newurl = _fixurl(url)
  const baseurl = newurl.split('/').splice(-1).join('/')

  if (!navigator.onLine) {
    if (memorize) { return add_dexie(baseurl, newurl, data, includeheaders) }
    return
  }

  return await _post(newurl, includeheaders, data).catch(() => {
    if (memorize) add_dexie(baseurl, newurl, data, includeheaders)
  }
  )
}

function getStoredRefresKey() {
  return JSON.parse(localStorage.getItem('user'))['bearerRefresh']

}
function hasRefreshKey() {
  return getStoredRefresKey() !== null
}

export async function updateToken() {
  if (!hasRefreshKey()) return null

  try {
    // You cannot use _get function because it requires userRefresh instead
    var response = await _get(_fixurl('login/'),
      { headers: { Authorization: getStoredRefresKey() } })
    const newiten = {
      ...JSON.parse(localStorage.getItem('user')),
      'bearerkey': { time: Date.now(), token: response.data.access_token }
    }
    localStorage.setItem('user', JSON.stringify(newiten))
    return response.data.access_token
  } catch (error) {
    if (error?.response?.data?.auth === false) {
      authStore().logout()
      return null
    }
    // returning empty headers
    return { headers: {} }
  }
}

export async function get_headers() {
  if (!navigator.onLine) return {}

  if (!hasRefreshKey()) return { headers: {} }

  const usertoken = JSON.parse(localStorage.getItem('user'))['bearerkey']
  if (usertoken === null) {
    let token = await updateToken()
    if (token === null) return {}
    return { headers: { Authorization: token } }
  }

  let { time, token } = usertoken
  const delta = (Date.now() - time) / 1000 || 300
  if (delta > 20) token = await updateToken()

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


export async function download(url, filename = 'qrschool.csv', memorize=true, time=20) {
  // `${this.url}?${args.join('&')}`
  try {
    let response = await get(url, time, true, memorize)
    const contentType = response.headers['content-type']
    var blob = new Blob([response.data], { type: contentType });

    //downloading the file depends on the browser
    //IE handles it differently than chrome/webkit
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      // window.open(objectUrl);
      const saveFile = document.createElement("a");
      saveFile.href = URL.createObjectURL(blob);
      saveFile.download = filename;
      saveFile.click();
      setTimeout(() => URL.revokeObjectURL(saveFile.href), 60000);
    }
  } catch (exc) {
    console.log("Save Blob method failed with the following exception.");
    console.log(exc);
  }
}