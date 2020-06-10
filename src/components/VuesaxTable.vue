<!-- VuesaxTable.vue est le tableau où s'affiche tous les records de l'api de Rennes, ces données doivent être passées an parametre du component dans la varable "records" -->
<!-- VuesaxTable est un component repris de la librairie Vuesax -->

<template>
  <div>
    <vs-table
      stripe 
      :max-items="descriptionItems[0]"
      pagination
      :data="records"
      description
      :description-items="descriptionItems"
      description-title="Registries"
      description-connector="of"
      description-body="Pages"
      v-model="selected"
      @selected="handleSelected"
      @dblSelection="doubleSelection"> <!-- Différentes options disponible avec le component Vuesax récupéré sur internet, toutes les options sont dans  -->

      <template slot="header">
        <h3>
          Records
        </h3>
      </template>
      <template slot="thead">
        <vs-th sortKey="libelle">
          Libellé
        </vs-th>        
        <vs-th>
          Description
        </vs-th>
        <vs-th sortKey="realise">
          Réalisé
        </vs-th>
        <vs-th sortKey="annee_budget">
          Année Budget
        </vs-th>
        <vs-th>
          Lien
        </vs-th>
      </template>
      
      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <!-- :data="tr" represente la donnée envoyer lors d'une séléction -->
          <!-- v-for="(tr, indextr) in data" represente un parcours sur le tableau data -->
          <!-- Dans la boucle il est possible d'utiliser data[indextr].CHAMPS afin de récupérer le contenu de chaque ligne et l'afficher -->
          <vs-td :data="data[indextr].libelle">
            {{data[indextr].libelle}}
          </vs-td>

          <vs-td :data="data[indextr].recordid">
            {{data[indextr].description}}
          </vs-td>

          <vs-td :data="data[indextr].recordid">
            {{data[indextr].realise}}
          </vs-td>

          <vs-td :data="data[indextr].recordid">
            {{data[indextr].annee_budget}}
          </vs-td>

          <vs-td :data="data[indextr].recordid">
            <a v-bind:href="data[indextr].lien_page_projet" v-text="data[indextr].lien_page_projet" />
            <!-- v-bind permet d'ajouter un attribut à l'élément <a> -->
            <!-- v-text permet d'ajouter un innerText à l'élément <a> -->
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
    props: { // Définition des paramètres du component
      records: Array,
    },
  data:()=>({ // Définition des données du component, une mis à jour de ses données provoque un update automatique du DOM
    descriptionItems: [10,20,30], // Nombre d'item par page
    ascending: false, // Trie croissant
    sortColumn: '', // Nom de la colonne triée
    selected:[] // Ligne selectionnée
  }),
    methods: {  
      sortTable(col) { //Fontion de trie des lignes lors d'un appuis sur le nom d'une colonne
                       // Trie par ordre croissant ou decroissant en rappuiyant dessus
        if (this.sortColumn === col) {
          this.ascending = !this.ascending;
        } else {
          this.ascending = true;
          this.sortColumn = col;
        }

        var ascending = this.ascending;
        this.records.sort(function(a, b) { // La fonction de trie se fait ci en recréant la fonction sort() en 
        if (a.fields[col] > b.fields[col]) {
          return ascending ? 1 : -1;
        } else if (a.fields[col] < b.fields[col]) {
          return  ascending ? -1 : 1;
        }
        return 0;
      })
      }, // Fonction appelée lors d'un click simple sur une ligne du tableau, recupère le libelle de la ligne et l'ajoute à la carte interactive
      handleSelected(tr) {
        document.getElementById("iframe").setAttribute("src","https://data.rennesmetropole.fr/explore/embed/dataset/localisation-et-etat-des-projets-du-budget-participatif/map/?disjunctive.quartier&scrollWheelZoom=true&q=" + tr.libelle);
        location.hash = "#iframe"; // Scroll automatique vers la carte
      },
      doubleSelection() { // Fonction appelée lors d'un double click sur une ligne du tableau réinitialise la carte interactive
        document.getElementById("iframe").setAttribute("src","https://data.rennesmetropole.fr/explore/embed/dataset/localisation-et-etat-des-projets-du-budget-participatif/map/?disjunctive.quartier&scrollWheelZoom=true");
        location.hash = "#iframe"; // Scroll automatique vers la carte
      }
    },
}
</script>


<style scoped> /* Style utilisable sur le component, pratique car le component devient "portable" avec son CSS */
h3 {
  font-size: initial;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
}
</style>