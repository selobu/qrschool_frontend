<template>
  <v-container fluid full-height class="d-flex justify-center">
      <v-card>
          <v-card-title 
            :class="$vuetify.theme.name == 'dark' ? 'bg-grey-darken-3': 'bg-light-blue'">
            {{  authstore.user.name }}
          </v-card-title>
          <v-card-text :class="$vuetify.theme.name == 'dark' ? 'bg-white': 'white'">
              <br/>
              <v-img>
                  <qrcode-vue :value="value" :size="getmaxwidth() > 300? 300:getmaxwidth() " level="H" 
                    alt="QR Code"/>
              </v-img>
          </v-card-text>        
      </v-card>
  </v-container>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
import { authStore } from '../../stores/authStore'
export default {
  data() {
    const authstore = authStore()
    console.log(authstore.auth.qr)
    return {
      value: authstore.auth.qr,
      size: this.screenwidth > 350 ? 350 : this.screenwidth,
      window: {
          width: 0,
          height: 0
      },
      authstore
    }
  },
  components: {
    QrcodeVue,
  },
  created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
  },
  destroyed() {
      window.removeEventListener('resize', this.handleResize);
  },
  methods: {
      handleResize() {
          this.window.width = window.innerWidth;
          this.window.height = window.innerHeight;
      },
      getmaxwidth(){
          const computed = this.window.width-10 < this.window.height-120 ? this.window.width-10:this.window.height-120;
          return computed
      }
  }
}
</script>