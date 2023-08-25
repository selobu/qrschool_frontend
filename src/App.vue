<template>
  <v-container>
    <v-layout>
    <v-app-bar
        color="info"
        density="default"
        location='top'
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>QRSchool</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
  </v-app-bar>
      <v-main>
        <v-container fluid>
          
        </v-container>
      </v-main>
    </v-layout>
  </v-container>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
