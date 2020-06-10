<!-- Home.vue est la page principale sur site internet, il affiche le component VuesaxTable et la carte des projets -->
<template> <!-- Tous les éléments du home sont dans le template -->
    <div>
      <VuesaxTable v-bind:records="records"/> <!-- Envoie la variable "records" au component via v-bind:records="records" -->
      <p align="center"><iframe src="https://data.rennesmetropole.fr/explore/embed/dataset/localisation-et-etat-des-projets-du-budget-participatif/map/?disjunctive.quartier&scrollWheelZoom=true" width="800" height="400" frameborder="0" id="iframe"></iframe></p> <!-- Carte interactive de Rennes -->
    </div>
</template>

<script>
import VuesaxTable from '../components/VuesaxTable.vue'

export default {
  components: {
    VuesaxTable
  },
  data() { // Définition des données du component, une mis à jour de ses données provoque un update automatique du DOM
    return {
      records: []
    }
  },
  mounted() {  // Lors du montage (voir le cycle de vie https://fr.vuejs.org/v2/guide/instance.html#Diagramme-du-cycle-de-vie) de cette page, cette fonction est appelée
    this.getRecords()
  },
  methods: { // Définit toutes les méthodes du component
    async getRecords() { // Fonction récupérant toutes les données de l'API, et les formatant afin de l'utiliser plus facilement des les components Vuesax pris sur internet
      try {
        const response = await fetch('https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=localisation-et-etat-des-projets-du-budget-participatif&rows=900')
        const data = await response.json()
        data.records.forEach(record => { // Recupère les données importantes et les place à la racine de l'objet JSON pour après l'utiliser dans le tableau VuesaxTable
          record.libelle = record.fields.libelle;
          record.annee_budget = record.fields.annee_budget;
          record.description = record.fields.description;
          record.realise = record.fields.realise;
          record.lien_page_projet = record.fields.lien_page_projet;
        });
        this.records = data.records // Met les données dans la varible du componant pour faire une mise à jour automatique du DOM
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>