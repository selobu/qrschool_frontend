
import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'


export const configStore = defineStore('config', {
    state: () => {
      return {
        dark: false,
        theme: useTheme()
      }
    },
    actions:{
      switchDarkTheme() {
        try {
          this.theme.global.name = this.theme.global.current.dark ? 'light' : 'dark'
          return true
          //showTooltip(`Welcome back ${this.userData.name}!`)
        } catch (error) {
          //showTooltip(error)
          // let the form component display the error
          return error
        }
      }
    }
  })