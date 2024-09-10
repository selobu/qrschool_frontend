import md5 from 'md5'

export var url = import.meta.env.PROD ? import.meta.env.VITE_APP_apiURL : import.meta.env.VITE_APP_DEV_apiURL
export var bApiUrl = import.meta.env.PROD ? import.meta.env.VITE_APP_apiBaseURL : import.meta.env.VITE_APP_DEV_apiBaseURL
export var staticUrl = import.meta.env.VITE_APP_HOST_STATIC
export var uploadUrl = import.meta.env.VITE_APP_HOST +'/uploadpicture'

console.log(url)
url = url.slice(-1) === '/' ? url : `${url}/` 
bApiUrl = bApiUrl.slice(-1) === '/' ? bApiUrl : `${bApiUrl}/`

export function isadmin() {
  try {
    return JSON.parse(localStorage.getItem("isproyectadmin"));
  } catch {
    return false;
  }
}

export function today() {
  return now().split(" ")[0];
}

export function firstday() {
  return now().split(" ")[0].slice(0, 8) + "01";
}

export function now() {
  const fix = (time) => time < 10 ? `0${time}` : `${time}`
  const today = new Date();
  const yyyy = today.getFullYear();
  const dd = fix(today.getDate());
  const mm = fix(today.getMonth() + 1); //January is 0!
  const hours = fix(today.getHours());
  const minutes = fix(today.getMinutes());
  const seconds = fix(today.getSeconds());
  
  return `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`
}

export const getGravatar = (email, size=80) => `https://www.gravatar.com/avatar/${md5(email || '')}?s=${size}`

export function mask(cc, num = 6, mask = '*'){
  return `${cc}`.slice(0,-num).padEnd(`${cc}`.length, mask);
}

import dayjs from 'dayjs'
import customParseFormat  from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const datevalidation = dayjs
