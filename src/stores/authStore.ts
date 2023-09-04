import { defineStore } from 'pinia'
import {getGravatar} from '../tools'
import { db } from '../plugins/dexie';

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
    async logout(){
      await db['user'].where('id')
        .equals(1)
        .modify({username: '',
        qrcode: '',
        email: '',
        profile: '',
        modules: [],
        bearerRefresh:'',
        bearerkey: '',
        isauth: false})
      this.auth = {
          authenticated: false,
          isAdmin: false,
          bearerKey: null,
          bearerRefresh: null}
      this.user ={name:null, email:null, avatar:''}
      this.modules = []
      this.updating = false
      console.log('loggin out')
      return true
    },
    async savetoIndexDb(){
      
    },
    async initRead(){
      if (this.updating){
        return
      }
      try{
        this.updating = true
        const cuenta = await db['user'].count();
        if ( cuenta === 0){
          // se registra un valor nuevo
          const id = await db['user'].add({
            username: '',
            qrcode: '',
            email: '',
            profile: '',
            modules: [],
            bearerRefresh:'',
            bearerkey: '',
            isauth: true
          });
          this.auth= {authenticated: false,
            isAdmin: false,
            bearerKey: '',
            bearerRefresh: ''}
          this.user= {name: null, email: null, avatar: ''}
          this.modules= []
        } else {
          // se consulta el primer registro
          const response = await db['user'].toCollection().first()
          console.log('Reading data from database')
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
      } catch {
        this.updating = false
      }
      this.updating = false
    },
    async login(email: String, password: String) {
      try {
        const api = {post: async (data)=>({})}
        this.userData = await api.post({ email, password }) // TODO

        this.user = {name: 'Sebastian', email,
                  avatar: getGravatar(email) }
        this.auth = {authenticated: true,
          isAdmin: true,
          bearerKey: '',
          bearerRefresh: ''}

        await db['user'].where('id')
          .equals(1)
          .modify({username: 'Sebastian',
          qrcode: '',
          email: email,
          profile: '',
          modules: [],
          bearerRefresh:'',
          bearerkey: '',
          isauth: true})
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
  avatar: String,
  profile: String | null,
}

interface Auth {
  authenticated: Boolean,
  isAdmin: Boolean,
  bearerKey: String,
  bearerRefresh: String,
}

