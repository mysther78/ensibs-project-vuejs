<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <RecordTable v-bind:records="records"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import RecordTable from './components/RecordTable.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    RecordTable
  },
  data() {
    return {
      records: []
    }
  },
  mounted() {
    this.getRecords()
  },
  methods: {
    async getRecords() {
      try {
        const response = await fetch('https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=localisation-et-etat-des-projets-du-budget-participatif')
        const data = await response.json()
        this.records = data.records
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
