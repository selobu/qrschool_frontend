<template>
    <v-container fluid full-height class="d-flex justify-center">
        <LoginRegister 
        title="Registrarme"
        subtitle="Registrarse como un usuario nuevo"
        >
        <template v-slot:actions>
            <v-btn variant="outlined" color="warning" href="/login"> Ingresar</v-btn>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" color="success" action="POST">
                Registrarme
            </v-btn>
        </template>
        </LoginRegister>
    </v-container>
</template>
<script >
  import LoginRegister from '../components/core/LoginRegister.vue'
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
      ]
    }),
    components:{
      LoginRegister
    }
  }
</script>