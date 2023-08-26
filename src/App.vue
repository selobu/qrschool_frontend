<template>
  <v-app>
    <NavBar />
    <v-main class="container fluid full-height">
      <router-view></router-view>
    </v-main>
  <FooterItem />
</v-app>
</template>
<script setup>
import NavBar from './components/core/AppBar.vue'
import FooterItem from './components/core/Footer.vue'
</script>
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
