<!-- Contact.vue est une page utilisable avec les routes, elle est basique mais fait le travail demandé -->
<template> <!-- Tous les éléments de la page sont dans le template -->
    <form> <!-- Le formulaire est factice -->
        <h2>Formulaire de contact</h2>
        <vs-input icon="account_circle" label-placeholder="Nom"/>
        <vs-input icon="email" label-placeholder="Adresse mail"/>
        <br>
        <vs-textarea label="Message"/>
        <vs-button color="success" type="border">Envoyer</vs-button>
    </form>
</template>

<style>  /* Style utilisable sur le component, pratique car le component devient "portable" avec son CSS */
form {
    margin: 1rem 20%;
}
h4 {
    margin: initial;
}
h2 {
    margin: initial;
}
</style>