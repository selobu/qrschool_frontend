import { defineStore } from 'pinia'
import {getGravatar} from '../tools'

interface State {
  auth: Auth,
  user: UserInfo,
  modules: String[],
  hasChanged: Boolean,
  updating: Boolean,
}

export const authStore = defineStore('auth', {
  state: (): State => {
    return {
      auth: {authenticated: false,
          isAdmin: false,
          bearerKey: '',
          bearerRefresh: '',} ,
      user: {name: null, email: null, profile: null, avatar: ''},
      modules: [] ,
      hasChanged: false,
      updating: false,
    }
  },
  actions:{
    logout(){
      localStorage.setItem('user', JSON.stringify({username: '',
          qrcode: '',
          email: '',
          profile: '',
          modules: [],
          bearerRefresh:'',
          bearerkey: '',
          isauth: false}))
      this.auth = {
          authenticated: false,
          isAdmin: false,
          bearerKey: null,
          bearerRefresh: null}
      this.user ={name:null, email:null, avatar:''}
      this.modules = []
      this.updating = false
      return true
    },
    async initRead(){
      if (this.updating){
        return
      }
      try{
        this.updating = true
        const cuenta = localStorage.getItem('user');
        if ( cuenta === null ){
          // se registra un valor nuevo
          localStorage.setItem('user', JSON.stringify({username: '',
            qrcode: '',
            email: '',
            profile: '',
            modules: [],
            bearerRefresh:'',
            bearerkey: '',
            isauth: false}))
          this.auth= {authenticated: false,
            isAdmin: false,
            bearerKey: '',
            bearerRefresh: ''}
          this.user= {name: null, email: null, avatar: ''}
          this.modules= []
        } else {
          // se consulta el primer registro
          const response = JSON.parse(cuenta)
          this.auth= {
            authenticated: response.isauth,
            isAdmin: false,
            bearerKey: response.bearerkey,
            bearerRefresh: response.bearerRefresh}
          this.user= {
            name: response.username,
            email: response.email,
            avatar: ''}
          this.modules= response.modules
        }
      } catch (error) {
        console.log(`authStore error onInit: ${error}`)
        this.updating = false
      }
      this.updating = false
    },
    async login(email: String, password: String) {
      const api = {post: async (data)=>({})}
      this.userData = await api.post({ email, password }) // TODO

      this.user = {name: 'Sebastian', email,
                avatar: getGravatar(email) }
      this.auth = {authenticated: true,
        isAdmin: true,
        bearerKey: '',
        bearerRefresh: ''}
      localStorage.setItem('user', JSON.stringify({username: 'Sebastian',
        qrcode: '',
        email: email,
        profile: '',
        modules: [],
        bearerRefresh:'',
        bearerkey: '',
        isauth: true}))
      return true
    },
  }
})

interface UserInfo {
  name: String | null,
  email: String | null,
  avatar: String,
  profile: String | null,
}

interface Auth {
  authenticated: Boolean,
  isAdmin: Boolean,
  bearerKey: String,
  bearerRefresh: String,
}

