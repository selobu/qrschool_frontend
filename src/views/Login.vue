<template>
    <v-container fluid full-height class="d-flex justify-center">
        <v-card clas="bg-blue" 
        width="330"
        max-width="384"
        variant="outlined">
            <v-img
            src="src/assets/logincardHEADER.jpg"
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
              title="Login"
              subtitle="Ingrese sus credenciales"
            ></v-list-item>
            </v-img>
            <v-card-text>
                <v-form v-model="valid"
                lazy-validation>
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

                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" color="success">
                    Ingresar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script>

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
    })
  }
</script>