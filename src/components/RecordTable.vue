<template>
  <div id="table">
    <table>
      <thead>
        <tr>
          <th>Libellé</th>
          <th>Description</th>
          <th>Realisé</th>
          <th>Année budget</th>
          <th>Lien</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.recordid">
          <td>{{ record.fields.libelle }}</td>
          <td>{{ record.fields.description }}</td>
          <td>{{ record.fields.realise }}</td>
          <td>{{ record.fields.annee_budget }}</td>
          <td> <a v-bind:href=record.fields.lien_page_projet> {{ record.fields.lien_page_projet }} </a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'MyTable',
    props: {
      records: Array,
  },
  }
</script>

<style scoped>
  tr:nth-child(2n), th {
    background: #EEE;
  }
  /* tr:nth-child(2n) {
    background: red;
  } */
</style>