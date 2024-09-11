<template>
    <v-toolbar
        :color="$vuetify.theme.name == 'dark' ? 'black' : 'info'"
        location='top'
        density="comfortable"
        fixed
      >
        <template v-slot:prepend>
            <v-app-bar-nav-icon alt="menu" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title class="text-left">
          <v-btn  @click="$router.push({ name: 'index'})" class="px-0"> QRSchool</v-btn>
        </v-app-bar-title>
        <template v-if="authstore.auth.authenticated" v-slot:append >
          <v-btn icon @click="$router.push({name:'mostrarmiqr'})">
            <v-icon icon="mdi-qrcode" ></v-icon>
          </v-btn>
          <switch-dark-theme id="theme-switch" ></switch-dark-theme>
          <v-btn icon @click.stop="drawerRight = !drawerRight">
            <v-avatar
              color="grey-lighten-2"
              size="32"
            >
            <v-img v-if="authstore.user.photourl !== ''"
              :src="photobasepath + authstore.user.photourl"
              alt="QRSchool">
            </v-img>
            <v-img v-else
                :src="getGravatar(authstore.user.email)"
                alt="QRSchool"
            ></v-img>
            <MenuRight></MenuRight>
            </v-avatar>
          </v-btn>
        </template>
        <template v-else v-slot:append>
          <switch-dark-theme id="theme-switch"></switch-dark-theme>
          <v-btn  rounded variant="outlined" class="px-2" @click="this.$router.push({name: 'register'})">Registro</v-btn>
          <v-btn  rounded variant="outlined" class="px-2" @click="this.$router.push({name: 'login'})">Ingreso</v-btn>
        </template>
    </v-toolbar>
    <NavDrawerLeft v-model="drawer"></NavDrawerLeft>
</template>
<script> 
  import NavDrawerLeft from './NavDrawerLeft.vue'
  import MenuRight from './NavDrawerRight.vue'
  import { authStore } from '../../stores/authStore'
  import {getGravatar, staticUrl} from '../../tools'
  import switchDarkTheme from '../../components/core/buttons/darkmodebtn.vue'

  export default {
    data: () => ({
      drawer: false,
      drawerRight: false,
      drawerConfig: false,
      group: null,
      authstore: authStore(),
      photobasepath: staticUrl+'/photos/'
    }),
    components: {
      'navigation-drawer':()=> import('./NavDrawerLeft.vue'),
      NavDrawerLeft,
      MenuRight,
      switchDarkTheme
    },
    watch: {
      group () {
        this.drawer = false
        this.drawerRight = false
        this.drawerConfig = false
      },
    },
    methods:{
      getGravatar,
    }
  }
</script>