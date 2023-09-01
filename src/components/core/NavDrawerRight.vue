<template>
    <v-navigation-drawer
        v-model="drawer"
        theme="dark"
        location="right"
        temporary
        class="bg-grey-lighten-4"
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
          :src="authstore.user.avatar"
          :alt="authstore.user.email == 0 ? 'no autenticado' : authstore.user.email"
        ></v-img>
        </v-avatar>
        <p class="font-weight-bold">{{ authstore.user.email == '0' ? 'no autenticado': authstore.user.email}}</p>
      </v-sheet>
        <v-list nav v-if="authstore.auth.authenticated">
          <v-list-item v-for="item in useritems" @click="$router.push({ name: item.href})"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          color="primary"
          ></v-list-item>
        </v-list>
      <template v-slot:append v-if="authstore.auth.authenticated" >
        <div class="pa-2">
          <v-btn block 
            @click="authstore.logout() ? this.$router.push({ name: 'index' }) : 'No se pudo salir'"
            class="bg-warning">
            Salir
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>
<script> 
  import { authStore } from '../../stores/authStore'
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
      logoUrl: 'selobu@gmail.com',
      authstore: authStore(),
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
        this.drawer = false
      },
    }
  }
</script>