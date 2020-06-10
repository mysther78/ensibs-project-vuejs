<!-- Aide.vue est une page utilisable avec les routes, elle est basique mais fait le travail demandé -->
<template> <!-- Tous les éléments de la page sont dans le template -->
    <div class="main_aide">
        <h1>Aide</h1>
        <p>Pour une aide, lisez le README fournit dans le dépôt git.<br>
        <a href="https://github.com/mysther78/ensibs-project-vuejs">Vous pouvez cliquer sur cette ligne pour y acceder.</a></p>

        <h2>Fonctionnalitées</h2>
        <p>Dans le teableau de la page Home :</p>
        <ul>
            <li>Click simple, affiche le projet sur la carte ;</li>
            <li>Click double, affiche tous les projets existant sur la carte.</li>
        </ul>
    </div>
</template>


<style scoped> /* Style utilisable sur le component, pratique car le component devient "portable" avec son CSS */
.main_aide {
    margin: 1rem 20%;
}
</style>