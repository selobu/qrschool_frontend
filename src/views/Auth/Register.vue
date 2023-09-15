<template>
    <v-container fluid full-height class="d-flex justify-center">
        <LoginRegister 
        title="Registrarme"
        subtitle="Registrarse como un usuario nuevo"
        maxwidth="700px"
        width="650px"
        ><template v-slot:form>
          <v-row>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="nombres"
                label="Nombres"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
                v-model="apellidos"
                label="Apellidos"
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
                type="numeric"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="12" md="6">
              <v-text-field
              v-model="fechaNacimiento"
              label="Fecha de nacimiento"
              prepend-inner-icon="mdi-calendar-account-outline"
              required
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" xs="4" md="2">
              <v-text-field
              v-model="rh"
              label="RH"
              hint="Factor RH como O+ AB+"
              required
            ></v-text-field>
            </v-col>
            <v-col cols="12" xs="4" md="4">
              <v-text-field
              v-model="telefonoContacto"
              label="Teléfono de contacto"
              prepend-inner-icon="mdi-cellphone-message"
              hint="Acudiente"
              required
              ></v-text-field>
            </v-col>
            <v-col cols="12"  xs="4" md="6">
              <v-text-field
                v-model="correo"
                :rules="emailRules"
                label="Correo"
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
              prepend-inner-icon="mdi-lock-check"
              required
              ></v-text-field>
            </v-col>
        </v-row>
        </template>
        <template v-slot:actions>
          <v-btn block  height="48" color="indigo"
            class="text-none text-white"
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