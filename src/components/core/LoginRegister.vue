<template>
    <v-card 
    :width="width"
    :max-width="maxwidth"
    elevation="4">
        <v-img
        :src="imgurl"
        height="120px"
        cover
        >
        <v-avatar
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

        <v-card-text>
            <v-form v-model="valid"
            lazy-validation>
            <slot name="form">
            </slot>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <slot name="actions">
            </slot>
        </v-card-actions>
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
      maxwidth: {required:false, type:String, default:'384px'},
      width: {required:false, type:String, default:'330px'}
    }
  }
</script>