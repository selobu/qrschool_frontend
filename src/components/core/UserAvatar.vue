<template>
     <v-avatar
          class="mb-4"
          color="grey-lighten-2"
          :size="size"
        >
        <v-img
            :src="gravatar"
            :alt="email"
        ></v-img>
    </v-avatar>
</template>
<script>
import md5 from 'md5'
export default {
    data:()=>({}),
    props:{ email:{required: true, type: String},
            size: {required: false, default: 80, type: Number}},
    computed:{
      gravatar(){
        return `https://www.gravatar.com/avatar/${md5(this.email || '')}?s=${this.size}`
      }
    }
}
</script>