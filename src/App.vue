<!-- App.vue est le Squelette de la page web, C'est sur cette page que les affichages des pages défilleront grace au principe de route -->

<template> <!-- Décrit l'élément "App.vue" (template) -->
  <div id="app">
    <Navbar /> <!-- Ajoute l'élément "Navbav.vue" à la page -->
    <router-view class="view"></router-view> <!-- La route actuelle sera affichée dans la balise "router-view" -->
    <Footer /> <!-- Ajoute l'élément "Footer.vue" à la page -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>