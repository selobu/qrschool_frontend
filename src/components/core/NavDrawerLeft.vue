<template>
    <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        theme="dark"
        v-model="drawer"
      >
    <v-list nav> 
        QRSchool
        <v-list-item v-for="item in items"
        :key="item.title"
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
    })
  }
</script>