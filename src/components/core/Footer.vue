<template>
  <v-footer :class="$vuetify.theme.name == 'dark' ? 'black' : 'bg-blue-lighten-1'">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Gestionhseq</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      links: [
        'Equipo',
        'Servicios',
        'Blog',
        'Contacto',
      ],
    }),
  }
</script>