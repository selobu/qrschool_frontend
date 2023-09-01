import { defineStore } from 'pinia'
import {getGravatar} from '../tools'
interface State {
  auth: Auth,
  user: UserInfo,
  modules: String[],
  hasChanged: Boolean,
}

export const authStore = defineStore('auth', {
  state: (): State => {
    return {
      auth: {authenticated: false,
          isAdmin: false,
          bearerKey: '',
          bearerRefresh: ''} ,
      user: {name: null, email: null, avatar: ''},
      modules: [] ,
      hasChanged: false,
    }
  },
  actions:{
    logout(){
      this.auth= {
          authenticated: false,
          isAdmin: false,
          bearerKey: null,
          bearerRefresh: null}
      this.user={name:null, email:null, avatar:''}
      console.log('salio en forma automatica')
      return true
    },
    async login(email: String, password: String) {
      try {
        const api = {post: async (data)=>({})}
        this.userData = await api.post({ email, password })
        this.user = {name: 'Sebastian', email, 
                  avatar: getGravatar(email) }
        this.auth = {authenticated: true,
          isAdmin: true,
          bearerKey: '',
          bearerRefresh: ''}
        return true
        //showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        //showTooltip(error)
        // let the form component display the error
        return error
      }
    },
  }
})

interface UserInfo {
  name: String | null,
  email: String | null,
  avatar: String
}

interface Auth {
  authenticated: Boolean,
  isAdmin: Boolean,
  bearerKey: String,
  bearerRefresh: String,
}

