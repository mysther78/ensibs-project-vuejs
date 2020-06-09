<template>
  <div id="app">
    <Navbar />
    <VuesaxTable v-bind:records="records"/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <RecordTable v-bind:records="records"/>
    <footer>
      2020 - Victor Danoffre - Allan - ENSIBS - Programmation Web 
    </footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import RecordTable from './components/RecordTable.vue'
import Navbar from './components/Navbar.vue'
import VuesaxTable from './components/VuesaxTable.vue'

import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css'; //Material Icons
Vue.use(Vuesax)

export default {
  name: 'App',
  components: {
    // RecordTable,
    Navbar,
    VuesaxTable
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
        const response = await fetch('https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=localisation-et-etat-des-projets-du-budget-participatif&rows=900')
        const data = await response.json()
        data.records.forEach(record => {
          record.libelle = record.fields.libelle;
          record.annee_budget = record.fields.annee_budget;
          record.description = record.fields.description;
          record.realise = record.fields.realise;
          record.lien_page_projet = record.fields.lien_page_projet;
        });
        this.records = data.records
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
/* html {
  font: normal normal normal -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, sans-serif;
} */
</style>
