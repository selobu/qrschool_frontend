<template>
    <v-toolbar
        color="info"
        location='top'
        fixed
      >
        <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
          <v-btn rounded href="/"><v-icon>mdi-home</v-icon></v-btn>
          QRSchool {{ drawer }} 
        </v-app-bar-title>
        <template v-slot:append>
          <v-btn icon @click.stop="drawerRight = !drawerRight">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
    </v-toolbar>
    <NavDrawerLeft v-model="drawer"></NavDrawerLeft>
    <NavDrawerRight v-model="drawerRight"></NavDrawerRight>    
</template>
<script> 
  import NavDrawerLeft from './NavDrawerLeft.vue'
  import NavDrawerRight from './NavDrawerRight.vue'
  export default {
    data: () => ({
      drawer: false,
      drawerRight: false,
      group: null,
    }),
    components: {
      'navigation-drawer':()=> import('./NavDrawerLeft.vue'),
      NavDrawerLeft,
      NavDrawerRight
    },
    watch: {
      group () {
        this.drawer = false
        this.drawerRight = false
      },
    },
  }
</script>