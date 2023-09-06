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
        <v-avatar
          class="mb-4"
          color="grey-lighten-2"
          size="64"
        >
        <v-img
          :src="getGravatar(authstore.user.email)"
          :alt="authstore.user.email == 0 ? 'no autenticado' : authstore.user.email"
        ></v-img>
        </v-avatar>
        <p class="font-weight-bold">{{ authstore.user.email == '0' ? 'no autenticado': authstore.user.email}}</p>
      </v-sheet>
        <v-list nav v-if="authstore.auth.authenticated">
          <v-list-item v-for="item in useritems" @click="this.$router.push({ name: item.href})"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          color="primary"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-subheader>Configuración</v-list-subheader>
          <v-list-item>
            <v-switch label="Darkmode" inset v-model="darkmode"></v-switch>
          </v-list-item>
        </v-list>
      <template v-slot:append v-if="authstore.auth.authenticated" >
        <div class="pa-2">
          <v-btn block 
            @click="authstore.logout() ? this.$router.push({ name: 'index' }) : 'No se pudo salir'"
            :class="$vuetify.theme.name == 'dark' ? 'bg-grey' : 'bg-warning'">
            Salir
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>
<script> 
  import { authStore } from '../../stores/authStore'
  import {getGravatar} from '../../tools'
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
      darkmode: false,
      logoUrl: 'selobu@gmail.com',
      authstore: authStore(),
      configstore: configStore(),
      useritems:[
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
      darkmode(newvalue){
        this.configstore.switchDarkTheme(newvalue)
      }
    },
    methods:{
      getGravatar
    }
  }
</script>