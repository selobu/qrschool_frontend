<template>
    <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        v-model="drawer"
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
  }
</script>