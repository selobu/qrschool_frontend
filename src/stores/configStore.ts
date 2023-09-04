
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'
import { db } from '../plugins/dexie';

export const configStore = defineStore('config', {
    state: () => {
      return {
        dark: false,
        theme: useTheme(),
        updating: false,
      }
    },
    actions:{
      async switchDarkTheme() {
        try {
          const currentTheme = await this.readFromIndexDb()
          this.theme.global.name =  currentTheme === 'dark' ? 'light' : 'dark'
          this.savetoIndexDb(this.theme.global.name)
          return true
          //showTooltip(`Welcome back ${this.userData.name}!`)
        } catch (error) {
          //showTooltip(error)
          // let the form component display the error
          return error
        }
      },
      async readFromIndexDb(){
        if (this.updating){
          return this.theme.global.name
        }
        try{
          this.updating = true
          const cuenta = await db['config'].count();
          if ( cuenta === 0){
            // se registra un valor nuevo
            const id = await db['config'].add({
              theme: 'light',
              languaje: 'en',
            });
            this.theme.global.name = 'light'
            this.languaje = 'en'
          } else {
            // se consulta el primer registro
            const data = await db['config'].toCollection().first()
            this.theme.global.name = data.theme
          }
        } catch {
          this.updating = false
        }
        this.updating = false
        return this.theme.global.name
      },
      async savetoIndexDb(theme:String){
        await db['config'].where('id')
          .equals(1)
          .modify({theme});
      }
    }
  })