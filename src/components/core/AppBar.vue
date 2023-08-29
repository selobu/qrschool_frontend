<template>
    <v-app-bar
        color="info"
        density="comfortable"
        location='top'
        fixed
      >
        <template v-slot:prepend>
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          
        </template>
        <v-app-bar-title>
          <v-btn rounded href="/"><v-icon>mdi-home</v-icon></v-btn>
          QRSchool</v-app-bar-title>
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
          :value="item.value"
          :href="this.$router.resolve({ name: item.href }).href"
          ></v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        v-model="drawerRight"
        theme="dark"
        location="right"
      >
        <v-list nav>
          <v-avatar>
            <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
          <div>Mi nombre</div>
          <br/>
          <v-divider></v-divider>
          <v-list-item v-for="item in useritems"
          :key="icon"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :href="this.$router.resolve({ name: item.href }).href"
          ></v-list-item>
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
          title: 'Home',
          value: 'home',
          href: 'index',
          icon:  'mdi-home'
        },
        {
          title: 'Login',
          value: 'login',
          href: 'login',
          icon:  'mdi-login-variant'
        },
        {
          title: 'Logout',
          value: 'logout',
          href: 'logout',
          icon:  'mdi-logout-variant'
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
      useritems:[
        {
          title: 'MiQR',
          value: 'qr',
          href: 'mostrarmiqr',
          icon: 'mdi-qrcode'
        },
        {
          title: 'Soporte',
          value: 'soporte',
          href: 'soporte',
          icon: 'mdi-help-circle-outline'
        },
        {
          title: 'About',
          value: 'about',
          href: 'about',
          icon: 'mdi-information'
        },
      ]
    }),

    watch: {
      group () {
        this.drawer = false,
        this.drawerRight = false
      },
    },
  }
</script>