<template>
    <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
        :class="$vuetify.theme.name == 'dark' ? 'black' : 'bg-grey-lighten-4'"
      >
      <v-sheet
        :color="$vuetify.theme.name == 'dark' ? 'black' : 'blue-lighten-1'"
        class="pa-4"
      > 
        <p class="font-weight-bold">Configuration</p>
      </v-sheet>
    <v-divider></v-divider>
    <v-list nav class="text-left"> 
        <v-list-item>
          <v-switch label="Darkmode" inset v-model="darkmode"></v-switch>
        </v-list-item>
        <v-list-item v-for="item in items" @click="$router.push({ name: item.href })"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        color="primary"
        ></v-list-item>
    </v-list>
    </v-navigation-drawer>
</template>
<script>
  const logoUrl = new URL('../../assets/logo.svg', import.meta.url).href
  import { configStore } from '../../stores/configStore'
  export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    computed: {
        drawer: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    data: () => ({
      darkmode:false,
      logoUrl,
      configstore: configStore(),
      items: [
        {
          title: 'Inicio',
          value: 'home',
          href: 'index',
          icon:  'mdi-home'
        },
        {
          title: 'Ingresar',
          value: 'login',
          href: 'login',
          icon:  'mdi-login-variant'
        },
        {
          title: 'Modulos',
          value: 'modulosindex',
          href: 'modulosindex',
          icon: 'mdi-view-dashboard'
        },
        {
          title: 'Dashboard',
          value: 'dashboard',
          href: 'dashboard',
          icon: 'mdi-elevation-rise'
        },
        {
          title: 'Ausencia',
          value: 'ausencia',
          href: 'ausencia',
          icon: 'mdi-account-minus'
        },
      ],
    }),
    watch:{
      darkmode(newvalue){
        this.configstore.switchDarkTheme(newvalue)
      }
    }
  }
</script>