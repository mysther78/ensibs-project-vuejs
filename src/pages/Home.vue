<template>
    <div>
      <VuesaxTable v-bind:records="records"/>
      <p align="center"><iframe src="https://data.rennesmetropole.fr/explore/embed/dataset/localisation-et-etat-des-projets-du-budget-participatif/map/?disjunctive.quartier&scrollWheelZoom=true" width="800" height="400" frameborder="0" id="iframe"></iframe></p>
    </div>
</template>

<script>
import VuesaxTable from '../components/VuesaxTable.vue'

import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css'; //Material Icons
Vue.use(Vuesax)

export default {
  components: {
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