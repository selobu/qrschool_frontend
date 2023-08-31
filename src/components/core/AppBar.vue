<template>
    <v-toolbar
        color="info"
        location='top'
        fixed
      >
        <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title class="text-left">
          <v-btn  @click="$router.push({ name: 'index'})" class="px-0"> QRSchool</v-btn>
        </v-app-bar-title>
        <template v-if="auth" v-slot:append >
          <v-btn icon href="https://gestionhseq.com" target="_blank">
            <v-icon icon="mdi-help-circle-outline" ></v-icon>
          </v-btn>
          <v-btn icon @click.stop="configDrawer = !configDrawer">
            <v-icon icon="mdi-cog-outline" ></v-icon>
          </v-btn>
          <v-btn icon @click.stop="drawerRight = !drawerRight">
            <v-avatar
              color="grey-lighten-2"
              size="32"
            >
            <v-img
                :src="getGravatar('selobu@gmail.com',32)"
                alt="QRSchool"
            ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <template v-else v-slot:append>
          <v-btn  class="px-1" @click="this.$router.push({name: 'register'})">Registrarse</v-btn>
          <v-btn  class="px-1" @click="this.$router.push({name: 'login'})">Ingresar</v-btn>
          <v-btn icon @click.stop="drawerRight = !drawerRight">
            <v-avatar
              color="grey-lighten-2"
              size="32"
            >
            <v-img
                :src="getGravatar('selobu@gmail.com',32)"
                alt="QRSchool"
            ></v-img>
            </v-avatar>
          </v-btn>
        </template>
    </v-toolbar>
    <NavDrawerLeft v-model="drawer"></NavDrawerLeft>
    <NavDrawerRight v-model="drawerRight"></NavDrawerRight>
    <ConfigDrawer v-model="configDrawer"></ConfigDrawer>

</template>
<script> 
  import NavDrawerLeft from './NavDrawerLeft.vue'
  import NavDrawerRight from './NavDrawerRight.vue'
  import ConfigDrawer from './ConfigDrawer.vue'
  import {getGravatar} from '../../tools'
  export default {
    data: () => ({
      drawer: false,
      drawerRight: false,
      configDrawer: false,
      group: null,
      auth: false,
    }),
    components: {
      'navigation-drawer':()=> import('./NavDrawerLeft.vue'),
      NavDrawerLeft,
      NavDrawerRight,
      ConfigDrawer
    },
    watch: {
      group () {
        this.drawer = false
        this.drawerRight = false
        this.configDrawer = false
      },
    },
    methods:{
      getGravatar
    }
  }
</script>