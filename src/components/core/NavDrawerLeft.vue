<template>
    <v-navigation-drawer :class="$vuetify.theme.name == 'dark' ? 'black' : 'bg-grey-lighten-4'"
        v-model="drawer"
      >
      <v-sheet
      :color="$vuetify.theme.name == 'dark' ? 'black' : 'blue-lighten-1'"
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
        <p class="font-weight-bold">QRSchool
        </p>
      </v-sheet>
      <v-divider></v-divider>
      <v-list v-if="authstore.auth.active" class="text-left"> 
          <v-list-item v-for="item in items" @click="this.$router.push({ name: item.href })"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          color="primary"
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
  const logoUrl = new URL('../../assets/logo.svg', import.meta.url).href
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
      logoUrl,
      authstore: authStore(),
      items: [],
    }),
    beforeMount(){
      this.items = [
        {
          title: 'Dashboard',
          value: 'dashboard',
          href: 'dashboard',
          icon: 'mdi-elevation-rise'
          },
          ...this.readmodules()
      ]
    },
    methods:{
      readmodules(){
        return [{
          title: 'Asistencia',
          value: 'asistencia',
          href: 'registrarasistencia',
          icon: 'mdi-check'
        },
        {
          title: 'Gestion Qr',
          value: 'gestionqr',
          href: 'listadoqr',
          icon: 'mdi-qrcode'
        },
        {
          title: 'Matricula',
          value: 'matricula',
          href: 'matricula',
          icon: 'mdi-format-list-bulleted'
        },
        {
          title: 'Usuarios',
          value: 'usuarios',
          href: 'usuarios',
          icon: 'mdi-account-multiple'
        },
      ]
      }
    }
  }
</script>