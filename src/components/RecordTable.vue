<template>
  <div id="table">
    <table>
      <thead>
        <tr>
          <th v-on:click="sortTable('libelle')">Libellé<div class="arrow" v-if="this.sortColumn == 'libelle'" v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"></div></th>
          <th>Description</th>
          <th v-on:click="sortTable('realise')">Realisé<div class="arrow" v-if="this.sortColumn == 'realise'" v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"></div></th>
          <th v-on:click="sortTable('annee_budget')">Année budget<div class="arrow" v-if="this.sortColumn == 'annee_budget'" v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"></div></th>
          <th>Lien</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.recordid">
          <td>{{ record.fields.libelle }}</td>
          <td>{{ record.fields.description }}</td>
          <td>{{ record.fields.realise }}</td>
          <td>{{ record.fields.annee_budget }}</td>
          <td> <a v-bind:href=record.fields.lien_page_projet v-text=record.fields.lien_page_projet></a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'RecordTable',
    props: {
      records: Array,
    },
    data() {
      return {
        ascending: false,
        sortColumn: ''
      }
    },
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
        // console.log(this.records)
      }
      
    },
    computed: {
      // "records": function sortedRecords() {
      //   if (this.records.length == 0) {
      //     return [];
      //   }
      //   return Object.keys(this.records[0])
    }  
}

</script>

<style scoped>
/*  
  table {
    font-size: 1em;
  }
  tr:nth-child(2n), th {
    background: #EEE;
  } 
  /*
   tr:nth-child(2n) {
    background: red;
  } */
  
.arrow_down {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAEjAAABIwFyQXfeAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAACFQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3XBkVwAAAAp0Uk5TABESQouusr/O36Qd0wkAAABOSURBVBhXY2CgFJiVw0Eyw6xVcLCSIQrBWcqggeA0MTB1wdgrFBgQUk1A42BSIAm4FEgCJgWRgEpBJCBSMAmwFEwCJIWQYGAQcUSwKQEATSdASYl7AaAAAAAASUVORK5CYII=')

}
.arrow_up {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABIwAAASMBckF33gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACDSURBVEiJ7dW9EUBQEEXhc+UCSlKRPiQqUYoWFKGAlRAYfw+7ibEzN3znC5/MjMjLQus/4ApIKiQ184pkwcwuB5RAD9i8HiiT3j6I30KexpORN/Ek5G38EvGInyJe8UPEM76LeMc3SER8hQB0AfFlHcAQCAwCKqAGcnxvBFr9X+b3gQlM9MSXShPKDQAAAABJRU5ErkJggg==')

}
.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
} 
</style>