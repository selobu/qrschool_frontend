<template>
    <v-container fluid full-height class="d-flex justify-center">
      <LoginRegister 
        title="Ingresar"
        subtitle="Ingrese sus credenciales">
        <template v-slot:form>
          <v-text-field
              v-model="correo"
              :rules="emailRules"
              label="Correo"
              required
              ></v-text-field>

              <v-text-field
              v-model="password"
              :counter="30"
              :rules="passwordRules"
              label="Contraseña"
              required
              ></v-text-field>
        </template>
        <template v-slot:actions>
          <v-btn variant="outlined" color="warning" href="/register"> Registrarse</v-btn>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" color="success" action="POST">
                  Ingresar
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