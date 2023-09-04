var Url = "";

if (import.meta.env.PROD) {
  Url = import.meta.env.VITE_APP_apiURL;
} else {
  Url = import.meta.env.VITE_APP_apiLocal;
}
import md5 from 'md5'

const apiUrl = Url;
export const url = Url;

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
  return now().split(" ")[0].substr(0, 8) + "01";
}
export function now() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  mm = mm < 10 ? "0" + mm : mm;
  dd = dd < 10 ? "0" + dd : dd;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  today =
    "" +
    yyyy +
    "-" +
    mm +
    "-" +
    dd +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return today;
}
export function getGravatar(email, size = 80) {
  if (email === null){
    email=''
  } 
  return `https://www.gravatar.com/avatar/${md5(email)}?s=${size}`;
}