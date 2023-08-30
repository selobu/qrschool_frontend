<template>
    <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
      >
      <v-sheet
        color="blue-lighten-1"
        class="pa-4"
      > 
        <v-avatar
          class="mb-4"
          color="grey-lighten-2"
          size="64"
        >
        <v-img
            :src="logoUrl"
            alt="QRSchool"
        ></v-img>
        </v-avatar>
        <p class="font-weight-bold">Configuration</p>
      </v-sheet>

    <v-divider></v-divider>
    <v-list nav class="text-left"> 
        <v-list-item v-for="item in items" @click="$router.push({ name: item.href })"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        ></v-list-item>
    </v-list>
    <template v-slot:append>
        <div class="pa-2 bg-primary">
            <v-btn block @click="this.$router.push({ name: 'logout' })">
              Salir
            </v-btn>
          </div>
        </template>
    </v-navigation-drawer>
</template>
<script>
  const logoUrl = new URL('../../assets/logo.svg', import.meta.url).href
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
      logoUrl,
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
    })
  }
</script>