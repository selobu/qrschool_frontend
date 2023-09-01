<template>
    <v-container class="d-flex justify-center flex-column align-center">
      <v-sheet :max-width="720" border rounded class="bg-grey-lighten-2">
          <v-row>
            <v-col :cols="6" :sm="12" :md="6">
              <LoginRegister 
              :width="290"
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
            </v-col>
            <v-col :cols="6" class="d-none d-xs-none d-sm-none d-md-flex justify-center flex-column align-center">
              <v-card flat color="primary">
                <v-card-text>
                  <p>
                    Hello world lorep ipsum<br/>
                    Searching for alternatives
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
    </v-sheet>
    
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
        v => v.length >= 9 || 'Name must be grether than 9 characters'
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
        this.authstore.login(this.email, '****').then(
         this.$router.push({name: 'modulosindex'})
        )
      }
    }
  }
</script>