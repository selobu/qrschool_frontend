<template>
    <v-app-bar
        color="info"
        density="default"
        location='top'
      >
        <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          
        </template>

        <v-app-bar-title>QRSchool</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon @click.stop="drawerRight = !drawerRight">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
    </v-app-bar>
    <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        v-model="drawer"
        theme="dark"
      >
        <v-list nav>
          QRSchool
          <v-list-item v-for="item in items"
          :key="icon"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        v-model="drawerRight"
        theme="dark"
        location="right"
      >
        <v-list nav>
          My data
          <v-list-item v-for="item in items"
          :key="icon"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"></v-list-item>
        </v-list>
    </v-navigation-drawer>


</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      drawerRight: false,
      group: null,
      items: [
        {
          title: 'Login',
          value: 'login',
          icon:  'mdi-login-variant'
        },
        {
          title: 'Logout',
          value: 'logout',
          icon:  'mdi-logout-variant'
        },
        {
          title: 'Home',
          value: 'home',
          icon:  'mdi-home'
        },
        {
          title: 'About',
          value: 'about',
          icon: 'mdi-information'
        },
        {
          title: 'Modulos',
          value: 'modulos',
          icon: 'mdi-view-dashboard'
        },
        {
          title: 'Dashboard',
          value: 'dashboard',
          icon: 'mdi-elevation-rise'
        },
        {
          title: 'Ausencia',
          value: 'ausencia',
          icon: 'mdi-account-minus'
        },
        {
          title: 'Soporte',
          value: 'soporte',
          icon: 'mdi-help-circle-outline'
        },
      ],
    }),

    watch: {
      group () {
        this.drawer = false,
        this.drawerRight = false
      },
    },
  }
</script>