<template>
    <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        v-model="drawer"
        theme="dark"
        location="right"
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
            :src="getGravatar(logoUrl)"
            alt="Mi nombre"
        ></v-img>
        </v-avatar>
        <p class="font-weight-bold">Mi nombre</p>
      </v-sheet>
        <v-list nav>
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
  import {getGravatar} from '../../tools'
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
    },
    methods:{
      getGravatar
    }
  }
</script>