<template>
    <v-container fluid full-height class="d-flex justify-center">
        <v-card>
            <v-card-title class="bg-light-blue">Mi QR </v-card-title>
            <v-card-text>
                <br/>
                <v-img>
                    <qrcode-vue :value="value" :size="getmaxwidth() > 300? 300:getmaxwidth() " level="H" />
                </v-img>
            </v-card-text>        
        </v-card>
    </v-container>
</template>
<script>
    import QrcodeVue from 'qrcode.vue'
    export default {
    data() {
      return {
        value: 'https://gestionhseq.com',
        size: this.screenwidth > 350 ? 350 : this.screenwidth,
        window: {
            width: 0,
            height: 0
        }
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