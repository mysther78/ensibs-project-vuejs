<template>
  <div id="app">
    <Navbar />
    <router-view class="view"></router-view>
    <!-- <VuesaxTable v-bind:records="records"/> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <RecordTable v-bind:records="records"/> -->
    <Footer />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import RecordTable from './components/RecordTable.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

// import VuesaxTable from './components/VuesaxTable.vue'

// import Vue from 'vue'
// import Vuesax from 'vuesax'
// import 'vuesax/dist/vuesax.css' //Vuesax styles
// import 'material-icons/iconfont/material-icons.css'; //Material Icons
// Vue.use(Vuesax)


export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
</style>