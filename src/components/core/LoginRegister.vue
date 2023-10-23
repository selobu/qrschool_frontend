<template>
    <v-card 
    :width="width"
    :max-width="maxwidth"
    elevation="4">
        <v-img
        :src="imgurl"
        alt="Login"
        :height="showavatar ? '120px': '72px'"
        cover
        >
        <v-avatar v-if="showavatar"
            color="grey"
            size="48"
        >
            <v-icon>mdi-account</v-icon>
        </v-avatar>
        <v-list-item
            class="text-white"
            :title="title"
            :subtitle="subtitle"
        ></v-list-item>
        </v-img>
        <v-form v-model="valid"
            validate-on="input lazy" 
            @submit.prevent="submit">
          <v-card-text>
              
              <slot name="form">
              </slot>
              
          </v-card-text>
          <v-card-actions>
              <slot name="actions">
              </slot>
          </v-card-actions>
        </v-form>
    </v-card>
</template>
<script>
  const imgUrl = new URL('../../assets/logincardHEADER.jpg', import.meta.url).href
  export default {
    data: () => ({
      valid: false,
      firstname: '',
      lastname: '',
      passwordRules: [
        v => !!v || 'Contraseña obligatoria',
        v => v.length >= 9 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail obligatorio',
        v => /.+@.+/.test(v) || 'E-mail debe ser válido'
      ],
      imgurl: imgUrl
    }),
    props:{
      title:{required:false, type:String, default:'Login'},
      subtitle: {required:false, type:String, default:''},
      maxwidth: {required:false, type:String, default: undefined},
      width: {required:false, type:String, default:  undefined},
      submit: {required:true},
      showavatar: { default:true, type:Boolean}
    }
  }
</script>