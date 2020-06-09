<template>
  <div class="navbar">
    <vs-navbar type="shadow" v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title>
          Localisation et état des projets du Budget Participatif
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a><router-link :to="{ name: 'home' }">Home</router-link></a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a><router-link :to="{ name: 'contact' }">Contact</router-link></a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a><router-link :to="{ name: 'aide' }">Aide</router-link></a>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  data:()=>({
    activeItem: 0
  })
}
</script>

<style scoped>
.navbar {
  width: 99%;
}
</style>