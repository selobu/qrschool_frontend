<template>
    <v-container fluid full-height class="d-flex justify-center">
        <LoginRegister 
        title="Registrarme"
        subtitle="Registrarse como un usuario nuevo"
        maxwidth="700px"
        width="650px"
        ><template v-slot:form>
          <v-row>
            <v-col xs="12" md="6">
              <v-text-field
                v-model="nombres"
                label="Nombres"
                required
              ></v-text-field>
            </v-col>
            <v-col xs="12" md="6">
              <v-text-field
                v-model="apellidos"
                label="Apellidos"
                required
              ></v-text-field>
          </v-col> 
        </v-row>
        <v-row>
            <v-col xs="12" md="6">
              <v-text-field
                v-model="numeroidentificacion"
                label="Número de identifiacion"
                required
              ></v-text-field>
            </v-col>
            <v-col xs="12" md="6">
              <v-text-field
              v-model="fechaNacimiento"
              label="Fecha de nacimiento"
              required
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col xs="4" md="2">
              <v-text-field
              v-model="rh"
              label="Factor RH"
              required
            ></v-text-field>
            </v-col>
            <v-col xs="4" md="4">
              <v-text-field
              v-model="telefonoContacto"
              label="Teléfono de contacto"
              required
              ></v-text-field>
            </v-col>
            <v-col xs="4" md="6">
              <v-text-field
                v-model="correo"
                :rules="emailRules"
                label="Correo"
                required
              ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col xs="12" md="6">
              <v-text-field
                v-model="direccion"
                label="Direccion"
                required
              ></v-text-field>
            </v-col>
            <v-col xs="12" md="6">
              <v-text-field
                v-model="telefono"
                label="Teléfono"
                required
              ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col xs="12" md="6">
              <v-text-field
              v-model="password"
              :counter="30"
              :rules="passwordRules"
              label="Contraseña"
              required
              ></v-text-field>
            </v-col>
            <v-col xs="12" md="6">
            </v-col>
        </v-row>
        </template>
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