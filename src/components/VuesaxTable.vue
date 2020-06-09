<template lang="html">
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
      @selected="handleSelected">

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
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
    props: {
      records: Array,
    },
  data:()=>({
    descriptionItems: [10,20,30],
    ascending: false,
    sortColumn: '',
    selected:[]
  }),
    methods: {  
      sortTable(col) {
        if (this.sortColumn === col) {
          this.ascending = !this.ascending;
        } else {
          this.ascending = true;
          this.sortColumn = col;
        }

        var ascending = this.ascending;
        this.records.sort(function(a, b) {
        if (a.fields[col] > b.fields[col]) {
          return ascending ? 1 : -1;
        } else if (a.fields[col] < b.fields[col]) {
          return  ascending ? -1 : 1;
        }
        return 0;
      })
      },
      handleSelected(tr) {
        console.log(tr).li
      }
      
    },
}
</script>


<style scoped>
h3 {
  font-size: initial;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
}
</style>