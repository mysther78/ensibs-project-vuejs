<template>
    <form>
        <h2>Formulaire de contact</h2>
        <vs-input icon="account_circle" label-placeholder="Nom" v-model="value1"/>
        <vs-input icon="email" label-placeholder="Adresse mail" v-model="value2"/>
        <br>
        <vs-textarea label="Message" v-model="textarea" />
        <vs-button color="success" type="border">Envoyer</vs-button>
    </form>
</template>

<style>
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