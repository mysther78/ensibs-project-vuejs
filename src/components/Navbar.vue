<!-- Navbar.vue est la barre de navigation du site internet, c'est sur cette barre que l'on peut choisir la "route" de la page "App.vue" -->
<!-- Navbar est un component repris de la librairie Vuesax -->

<template>
  <div class="navbar">
    <vs-navbar type="shadow" v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title>
          Localisation et état des projets du Budget Participatif
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a><router-link :to="{ name: 'home' }">Home</router-link></a> <!-- Route vers Home -->
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a><router-link :to="{ name: 'contact' }">Contact</router-link></a> <!-- Route vers Contact -->
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a><router-link :to="{ name: 'aide' }">Aide</router-link></a> <!-- Route vers Aide -->
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  data:()=>({ // Définition des données du component, une mis à jour de ses données provoque un update automatique du DOM
    activeItem: 0
  }),
  mounted() { // Lors du montage (voir le cycle de vie https://fr.vuejs.org/v2/guide/instance.html#Diagramme-du-cycle-de-vie) de cette page, cette fonction est appelée
    this.setActiveMenu()
  },
  methods: { // Définit toutes les méthodes du component
    setActiveMenu() { // Recupère le nom de la route utilisée (le nom des route est défini dans main.js) afin de mettre la "coloration active" sur le bouton 0, 1 ou 2 du navbar
      this.activeItem = (this.$route.name === "home" ? 0 : 
                          this.$route.name === "contact" ? 1 : 
                          this.$route.name === "aide" ? 2 : 0) // Si la route n'est pas connu, le bouton home est en "coloration active"
    }
  }
}
</script>

<style scoped>  /* Style utilisable sur le component, pratique car le component devient "portable" avec son CSS */
.navbar {
  width: 99%;
}
</style>