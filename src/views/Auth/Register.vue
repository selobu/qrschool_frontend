<template>
    <v-container fluid full-height class="d-flex justify-center">
        <LoginRegister 
        title="Registrarme"
        subtitle="Registrarse como un usuario nuevo"
        maxwidth="700px"
        width="650px"
        :submit="submit"
        >
        <template v-slot:form>
          <v-row>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="nombres"
                label="Nombres"
                :rules="namerules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="apellidos"
                label="Apellidos"
                :rules="namerules"
                required
              ></v-text-field>
            </v-col> 
          </v-row>
          <v-row>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="numeroidentificacion"
                label="Número de identificación"
                prepend-inner-icon="mdi-card-account-details"
                type="number"
                :rules="idrules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
              v-model="fechaNacimiento"
              label="Fecha de nacimiento"
              placeholder="AAAA-M-D"
              prepend-inner-icon="mdi-calendar-account-outline"
              :rules="daterules"
            >
            </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" xs="4" md="2">
              <v-text-field
              v-model="rh"
              label="RH"
              hint="Factor RH como O+ AB+"
              :rules="rhrules"
              required
            ></v-text-field>
            </v-col>
            <v-col cols="12" xs="4" md="4">
              <v-text-field
              v-model="telefonoContacto"
              label="Número de contacto"
              prepend-inner-icon="mdi-cellphone-message"
              hint="Teléfono del acudiente"
              required
              ></v-text-field>
            </v-col>
            <v-col cols="12"  xs="4" md="6">
              <v-text-field
                v-model="correo"
                :rules="emailRules"
                label="Correo"
                hint="Direccion de correo electrónico"
                prepend-inner-icon="mdi-email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
         <v-row>
            <v-col xs="12" md="6">
              <v-text-field
                v-model="direccion"
                label="Direccion"
                hint="Dirección de residencia"
                prepend-inner-icon="mdi-map-marker"
                required
              ></v-text-field>
            </v-col>
            <v-col xs="12" md="6">
              <v-text-field
                v-model="telefono"
                label="Teléfono"
                hint="Tu número telefónico"
                prepend-inner-icon="mdi-cellphone"
                type="number"
                required
              ></v-text-field>
            </v-col>
         </v-row>
         <v-row>
            <v-col xs="12" md="12">
              <v-text-field
              v-model="password"
              :counter="30"
              :rules="passwordRules"
              label="Contraseña"
              hint="Incluya por lo menos una letra en Mayúscula, un número y un símbolo"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="marker ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              @click:append-inner="marker=!marker"
              :type="marker ? 'password' : 'text'"
              required
              ></v-text-field>
            </v-col>
         </v-row>
        </template>

        <template v-slot:actions>
          <v-btn block  height="48" color="indigo"
            :loading="!btnenable"
            class="text-none text-white"
            type="submit"
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
  import LoginRegister from '../../components/core/LoginRegister.vue'
  import {datevalidation} from '../../tools'
  import {post} from '../../tools/requests'

  export default {
    data: () => ({
      btnenable: true,
      valid: false,
      marker:true,
      numeroidentificacion:null,
      nombres:'',
      apellidos:'',
      fechaNacimiento:'',
      rh:null,
      telefonoContacto:'',
      correo:'',
      direccion:'',
      telefono:'',
      password:'',
      passwordRules: [
        v => !!v || 'Contraseña obligatoria',
        v => v.length >= 8 || 'La contraseña debe ser de 8 o mas caracteres',
        v => /[A-Z]/.test(v) || 'Debe contener un caracter en mayúscula',
        v => /[0-9]/.test(v) || 'Debe contener un número',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail obligatorio',
        v => /.+@.+/.test(v) || 'E-mail debe ser válido'
      ],
      namerules:[
        v => !!v || 'Requerido',
        v => v.length > 4 || 'Debe tener mas de 4 caracteres',
        v => v.length < 25 || 'Máximo 25 caracteres'
      ],
      idrules:[
        v => !!v || 'Requerido',
        v => v.length > 5 || 'Incluya más de 5 dígitos' 
      ],
      rhrules:[
        v => !!v || 'Requerido',
        v => ['O+','A+','B+','AB+','O-','A-','B-','AB-'].includes(v) || 'tipo de sange no existente'
      ],
      daterules:[
        v => !!v || 'Requerido',
        v => datevalidation(v, "YYYY-M-D", true).isValid() || 'Fecha incorrecta',

      ]
    }),
    components:{
      LoginRegister
    },
    methods:{
      async authuser(access_token, auth, email, fresh_access_token, username, qr){
        this.authstore.login(access_token, auth, email, fresh_access_token, username, qr).then(
         this.$router.push({name: 'mostrarmiqr'})
        )
      },
      async submit(event){
        this.btnenable = false
        
        try {
          const results = await event
          if (!results.valid) return
          var response = await post('usuario/', [{
            nombres: this.nombres,
            apellidos: this.apellidos,
            numeroidentificacion: this.numeroidentificacion,
            fechaNacimiento: this.fechaNacimiento,
            rh: this.rh,
            telefonoContacto: this.telefonoContacto,
            correo: this.correo,
            direccion: this.direccion,
            telefono: this.telefono,
            password: this.password
            }], false)
          console.log(response)
          if (response.status !== 200) return
          response = await post('login/', {email:this.correo, password:this.password}, false)
          if (response.status !== 200) return
          const {access_token, auth, email, fresh_access_token, username, qr} = response.data
          await this.authuser(access_token, auth, email, fresh_access_token, username, qr)
        } finally {
          this.btnenable = true
        }

      }
    }
  }
</script>