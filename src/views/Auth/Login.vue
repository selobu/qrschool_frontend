<template>
    <v-container class="d-flex justify-center flex-column align-center">
      <v-sheet :max-width="720" border rounded class="bg-grey-lighten-2">
          <v-row>
            <v-col :cols="6" :sm="12" :md="6">
              <LoginRegister 
              width="290px"
              title="Ingresar"
              subtitle="Ingrese sus credenciales"
              :submit="submit"
              >
              <template v-slot:form>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Correo"
                    hint="Correo electrónico como gmail"
                    prepend-inner-icon="mdi-email"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Contraseña"
                    hint="Para acceder a este sitio"
                    prepend-inner-icon="mdi-lock"
                    required
                    :append-inner-icon="marker ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    :type="marker? 'password':'text'"
                    @click:append-inner="marker=!marker"
                    ></v-text-field>
              </template>

              <template v-slot:actions>
                <v-btn block  height="48" color="indigo"
                  class="text-none text-white"
                  type="submit"
                  rounded="0"
                  variant="flat"
                  :loading="!btnenable"
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
                    QRSchool<br/>
                    Ingresar credenciales
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
    </v-sheet>
  </v-container>
</template>
<script >
  import LoginRegister from '../../components/core/LoginRegister.vue'
  import { post } from '../../tools/requests'
  import { authStore } from '../../stores/authStore'
  export default {
    data: () => ({
      marker: true,
      btnenable: true,
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
      async authuser(access_token, auth, email, fresh_access_token, username, qr, active, modules){
        authStore().login(access_token, auth, email, fresh_access_token, username, qr, active, modules).then(
         this.$router.push({name: 'mostrarmiqr'})
        )
      },
      async submit (event) {
        this.btnenable = false
        try {
          const results = await event
          if (!results.valid) return
          const response = await post('login/', {email:this.email, password:this.password}, false)
          if (response?.status !== 200){
            return
          }
          const {access_token, auth, email, fresh_access_token, username, qr, active, modules} = response.data
          console.log(`Modulos ${modules}`)
          await this.authuser(access_token, auth, email, fresh_access_token, username, qr, active, modules)
        } finally {
          this.btnenable = true
        }
      }
    }
  }
</script>