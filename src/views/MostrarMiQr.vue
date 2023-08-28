<template>
    <v-container fluid full-height class="d-flex justify-center">
        hello world
        <br/>
        hello again
        <br/>
        <qrcode-vue :value="value" :size="size" level="H" />
    </v-container>
</template>
<script>
    import QrcodeVue from 'qrcode.vue'
    export default {
    data() {
      return {
        value: 'https://gestionhseq.com',
        size: 300,
      }
    },
    components: {
      QrcodeVue,
    },
  }
</script>