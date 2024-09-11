import { defineStore } from 'pinia'
import {getGravatar} from '../tools'

interface State {
  auth: Auth,
  user: UserInfo,
  modules: String[],
  hasChanged: Boolean,
  updating: Boolean,
}

type MenuType = {
  title: String,
  value: String,
  href: String,
  icon: String
}

interface UserInfo {
  name: String | null,
  email: String | null,
  avatar: String,
  profile: String | null,
  photourl: String
}

interface Auth {
  authenticated: Boolean,
  isAdmin: Boolean,
  bearerKey: String,
  bearerRefresh: String,
  qr:String
}

export const authStore = defineStore('auth', {
  state: (): State => {
    return {
      auth: {authenticated: false,
          isAdmin: false,
          bearerKey: '',
          bearerRefresh: '',
          qr:''} ,
      user: {name: null, email: null, profile: null, avatar: '', photourl:''},
      modules: [] ,
      hasChanged: false,
      updating: false,
    }
  },
  actions:{
    logout():boolean{
      localStorage.setItem('user', JSON.stringify({username: '',
          qr: '',
          email: '',
          profile: '',
          modules: [],
          bearerRefresh:'',
          bearerkey: '',
          isauth: false,
          active: false,
        }))
      this.auth = {
          authenticated: false,
          isAdmin: false,
          bearerKey: '',
          bearerRefresh: '',
          qr:'',
          active: false,
        }
      this.user ={name:null, email:null, avatar:'', photourl:''}
      this.modules = []
      this.updating = false
      return true
    },
    async initRead(){
      if (this.updating) return
      try {
        this.updating = true
        const cuenta = localStorage.getItem('user');
        if ( cuenta === null ){
          // se registra un valor nuevo
          localStorage.setItem('user', JSON.stringify({
            username: '',
            qr: '',
            email: '',
            profile: '',
            modules: [],
            bearerRefresh:'',
            bearerkey: '',
            isauth: false}))
          this.auth= {authenticated: false,
            isAdmin: false,
            bearerKey: '',
            bearerRefresh: '',
            qr:''
          },
          this.user= {name: null, email: null, avatar: '', photourl:''}
          this.modules= []
        } else {
          // se consulta el primer registro
          const response = JSON.parse(cuenta)
          this.auth= {
            authenticated: response.isauth,
            isAdmin: false,
            bearerKey: response.bearerkey,
            bearerRefresh: response.bearerRefresh,
            qr: response.qr,
            active: response.active
          }
          this.user= {
            name: response.username,
            email: response.email,
            avatar: '',
            photourl:''}
          this.modules= this.updatemodules(response.modules)
        }
      } catch (error) {
        console.log(`authStore error onInit: ${error}`)
        this.updating = false
      }
      this.updating = false
    },
    updatemodules(modules){
      const available ={Ausentismo:{
        title: 'Asistencia',
        value: 'asistencia',
        href: 'registrarasistencia',
        icon: 'mdi-check'
      }, 
      // Qr: {
      //   title: 'Gestion Qr',
      //   value: 'gestionqr',
      //   href: 'listadoqr',
      //   icon: 'mdi-qrcode'
      // },
      // Matriculas: {
      //   title: 'Matricula',
      //   value: 'matricula',
      //   href: 'matricula',
      //   icon: 'mdi-format-list-bulleted'
      // },
      // User: {
      //   title: 'Usuarios',
      //   value: 'usuarios',
      //   href: 'usuarios',
      //   icon: 'mdi-account-multiple'
      // },
    }

      var response: MenuType[] = []
      for(let module of modules){
        if ( module in available) response.push(available[module])
      }
      return [
      {
        title: 'Dashboard',
        value: 'dashboard',
        href: 'dashboard',
        icon: 'mdi-elevation-rise'
        },
        ...response
      ]
    },
    async login(bearerkey: String, isauth: Boolean,
      email: String, bearerRefresh: String, username: String, qr:String,
      active: Boolean, modules, photourl: String) {

      this.user = {name: username, email,
                avatar: getGravatar(email),
                photourl: photourl
                 }
      this.modules = this.updatemodules(modules)
      this.auth = {authenticated: true,
        isAdmin: true,
        bearerkey,
        bearerRefresh,
        qr,
        active
      }
      localStorage.setItem('user', JSON.stringify({
        username,
        qr,
        email,
        profile: '',
        photourl,
        modules,
        bearerRefresh,
        bearerkey: {token:bearerkey, time: Date.now()},
        isauth,
        active,
      }))
      return true
    },
  }
})


