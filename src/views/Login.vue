<template>
    <v-container fluid full-height class="d-flex justify-center">
      <LoginRegister 
        title="Ingresar"
        subtitle="Ingrese sus credenciales">
        <template v-slot:form>
          <v-text-field
              v-model="email"
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
          <v-btn block  height="48" color="indigo"
            class="text-none text-white"
            @click="authuser"
            rounded="0"
            variant="flat"
            >
            Continuar
          </v-btn>
        </template>
      </LoginRegister>
    </v-container>
</template>
<script >
  import LoginRegister from '../components/core/LoginRegister.vue'
  // pinnia working
  import { authStore } from '../stores/authStore'
  // import { storeToRefs } from 'pinia'
  // const authstore= authStore()
  // const { auth, user, modules } = storeToRefs(authstore)
  // --- pinnia
  export default {
    data: () => ({
      // auth, user, modules,
      authstore: authStore(),
      valid: false,
      firstname: '',
      lastname: '',
      password:'',
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
    },
    methods:{
      async authuser(){
        this.authstore.login(this.email, '****')
      }
    }
  }
</script>