# Rapport projet web

### Victor DANOFFRE -- Allan CABILLIC-GUINEBAULT


L'objectif de ce projet était de créer une application web avec pour objectif d'afficher des données récupérées via une API, et cela, sous forme de tableau.

L'application devait également permettre le classement des données, et une valorisation de celles-ci.

Pour notre projet, le dataset était une liste de la localisation et de l'état des projets du Budget Participatif de la ville de Rennes.




![Capture d'écran de la page Home](misc/home.png "Capture d'écran de la page Home")

Notre application est responsive, on peut donc également l'utiliser sur téléphone ou tablette de façon optimale.

![Capture d'écran de la page Home (version téléphone)](misc/home_screen.png "Capture d'écran de la page Home (version téléphone)")

## Fonctionnalités

L'application permet de consulter les données sur la localisation et l'état des projets du Budget Participatif de la ville de Rennes.

Il est possible de trier les résultats par ordre alphabétique d'une colonne en cliquant sur celle-ci. 

L'application propose également une carte, qui permet de visualiser facilement dans quel quartier le projet a eu lieu. 

Il est possible d'accéder directement à un point spécifique sur la carte  en cliquant sur la ligne correspondante dans le tableau. Pour réinitialiser la carte avec tous les points, il suffit de double-cliquer sur n'importe quelle ligne.

L'application possède également une page Contact ainsi qu'une page aide. 
![Capture d'écran de la page de contact](misc/contact.png "Capture d'écran de la page de contact")
![Capture d'écran de la page d'aide](misc/aide.png "Capture d'écran de la page d'aide")



##  Arborescence des fichiers

La structure de fichier est une structure classique de projet VueJs. Elle est générée automatiquement grâce à l'utilitaire VueJs-CLI.

D'abord, on a un répertoire src qui contient l'ensemble des sources du projet.

Il contient le fichier `main.js`.
Ce fichier importe les librairies nécessaires au bon fonctionnement de l'application, et gère le système de routage qui permet de rediriger l'utilisateur sur les bonnes pages.
Il sert également à créer la vue principale de l'application qui contient toute la logique.

Le fichier `App.vue` est la base de l'application. Elle importe et intègre les différents élément de l'application (Header, Footer, tableau et map).

Les autres fichiers sont répartis en deux catégories, les pages et les Components.
Les pages sont les différentes pages de l'application, et les Components sont des éléments intégrables dans les différentes pages.

Dans pages, on a Home, Contact et Aide les trois pages de l'application.

Dans components on a le Header, le Footer ainsi que le tableau.

### main.js

Le fichier main.js permet donc d'abord d'importer toutes les dépendances, ainsi que tous les différents fichiers dans l'application

```javascript
import Vue from 'vue'

import App from './App.vue'
import Home from './pages/Home.vue'
import Contact from './pages/Contact.vue'
import Aide from './pages/Aide.vue'

import VueRouter from 'vue-router' // Utilise la librairie de Vue-router
Vue.use(VueRouter)

import Vuesax from 'vuesax' // Utilise la librairie de component Vuesax
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css'; //Material Icons
Vue.use(Vuesax)
```
Il est ensuite nécessaire de créer des routes. Celles-ci permettent de charger la bonne page en fonction de l'URI.

```javascript
const router = new VueRouter({ // Déclare toutes les routes du site
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/aide', name: 'aide', component: Aide },
  ]
})
```

Enfin il faut charger le composant `App` pour afficher l'application. 
On créé donc une nouvelle vue qui charge le router, et qui render le composant `App`.
```javascript
new Vue({ // Créer l'application à partir du component importé 'App', et ajoute le système de route
  router,
  render: h => h(App),
}).$mount('#app')
```

### App.vue

Le composant `App` est répartit en deux partie.
D'abord, il y a un template qui décrit la construction de `App`.


```html
<template> <!-- Décrit l'élément "App.vue" (template) -->
  <div id="app">
    <Navbar/> <!-- Ajoute l'élément "Navbav.vue" à la page -->
    <router-view class="view"></router-view> <!-- La route actuelle sera affichée dans la balise "router-view" -->
    <Footer /> <!-- Ajoute l'élément "Footer.vue" à la page -->
  </div>
</template>
```
On a donc d'abord la navbar ou header. Ensuite on a un affichage de la bonne page, en fonction du routage décrit précédemment.
Enfin, on a le footer.

Dans la deuxième partie, on importe les composant navbar et footer.

### Pages

- Home.vue
- Aide.vue
- Contact.vue

Notre application possède 3 pages. `Aide.vue` et `Contact.vue` sont basiques, et affiche simplement du texte, ainsi qu'un formulaire factice pour `Contact`.

La page `Home` en revanche est plus complexe. D'abord, elle contient le template de la page.

```html
<!-- Home.vue est la page principale sur site internet, il affiche le component VuesaxTable et la carte des projets -->
<template> <!-- Tous les éléments du home sont dans le template -->
    <div>
      <VuesaxTable v-bind:records="records"/> <!-- Envoie la variable "records" au component via v-bind:records="records" -->
      <p align="center"><iframe src="https://data.rennesmetropole.fr/explore/embed/dataset/localisation-et-etat-des-projets-du-budget-participatif/map/?disjunctive.quartier&scrollWheelZoom=true" width="800" height="400" frameborder="0" id="iframe"></iframe></p> <!-- Carte interactive de Rennes -->
    </div>
</template>
```

Il y a deux éléments dans ce template. Il y a le `Vuesaxtable`, qui inclut le composant qui définit le tableau.
Il envoie également la variable records via le `v-bind`, variable qui est récupérée plus bas dans le code.
Il y a ensuite une `iframe`, qui permet d'afficher la map fournie sur l'API.


Pour récupérer les données du tableau, il faut faire une requête HTTP sur l'API de la ville de Rennes.


```javascript
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
```
Dans la partie `methods` d'un component, on définit les méthodes utiles dans ce composant.
Ici, la méthode `getRecords` permet d'effectuer la requete sur l'API, grâce à la méthode `fetch`.
Les données récupérées sont ensuite mises dans un objet records, qui est transmis au composant `VuesaxTable` pour générer le tableau.

### Components

- VuesaxTable.vue
- Navbar.vue
- Footer.vue

Les composants sont donc chargés en fonction de la page sur lequel ils sont appelés.


Le composant `VuesaxTable` est le composant principal de l'application.
Il permet l'affichage des données récupérées par l'API sous forme de tableau, avec possibilité de tri sur les colonnes.

Le tableau se créer automatiquement, il est necessaire de donner en parametre du composant un `Array`, ici nommé `records` et d'indiquer le nom de cette varable dans les paramètre du tableau, dans le template avec `:data="records`. 
Dans ce même template, la ligne `<vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >` permet de boucler sur toutes les lignes de l'`array` et de créer autant de `td` que nécéssaire. Ici chaque ligne est composé de 5 `td`. 
Pour insérer une donnée dans le `td`, il est possible d'utiliser la variable suivante : `{{data[indextr].libelle}}` avec libelle le champ voulu.

```html
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
            <a v-bind:href="data[indextr].lien_page_projet">
              {{data[indextr].lien_page_projet}}
            </a>
          </vs-td>
        </vs-tr>
      </template>
```

Une fois le tableau créé, il faut des méthodes pour pouvoir interagir avec celui-ci.
D'abord il faut une méthode pour pouvoir trier les colonnes.

```javascript
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
    },
```
Pour trier les colonnes, il suffit de modifier l'ordre des colonnes dans le tableau en arrière-plan, et VueJs va automatiquement actualiser l'affichage.
On utilise la méthode native `sort` pour cela. Enfin pour savoir si on est dans le sens ascendant ou descendant, on doit utiliser une variable qui stock l'état actuel.
Cela est nécessaire pour pouvoir trier le tableau dans les deux sens.

Ensuite, il y a deux méthodes qui sont appelées quand on clique ou double-clique sur une ligne du tableau.



```javascript
   // Fonction appelée lors d'un click simple sur une ligne du tableau, recupère le libelle de la ligne et l'ajoute à la carte interactive
      handleSelected(tr) {
        document.getElementById("iframe").setAttribute("src","https://data.rennesmetropole.fr/explore/embed/dataset/localisation-et-etat-des-projets-du-budget-participatif/map/?disjunctive.quartier&scrollWheelZoom=true&q=" + tr.libelle);
        location.hash = "#iframe"; // Scroll automatique vers la carte
      },
      doubleSelection() { // Fonction appelée lors d'un double click sur une ligne du tableau réinitialise la carte interactive
        document.getElementById("iframe").setAttribute("src","https://data.rennesmetropole.fr/explore/embed/dataset/localisation-et-etat-des-projets-du-budget-participatif/map/?disjunctive.quartier&scrollWheelZoom=true");
        location.hash = "#iframe"; // Scroll automatique vers la carte
      }
```
La première affiche le point sur la carte correspondant à la ligne du tableau cliquée. Pour cela, on modifie l'url de la carte dans l'iframe, en rajoutant le libellé du projet.

La deuxième réinitialise réinitialise la carte à son état initial quand on double-clique sur n'importe quelle ligne du tableau.


Le composant `Footer` affiche simplement nos deux noms.

Le composant `Navbar` est légèrement plus complexe.
Dans le template de `Navbar`, on met des liens vers les routes, pour que quand on clique sur un bouton de la barre, l'application nous redirige vers la bonne page.


```html
<template>
  <div class="navbar">
    <vs-navbar type="shadow" v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title>
          Localisation et état des projets du Budget Participatif
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0">
        <a><router-link :to="{ name: 'home' }">Home</router-link></a> <!-- Route vers Home -->
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a><router-link :to="{ name: 'contact' }">Contact</router-link></a> <!-- Route vers Contact -->
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a><router-link :to="{ name: 'aide' }">Aide</router-link></a> <!-- Route vers Aide -->
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>
```
Ensuite, un script permet la coloration du bouton correspondant à la page active.

```javascript
<script>
export default {
  data:()=>({ // Définition des données du component, une mis à jour de ses données provoque un update automatique du DOM
    activeItem: 0
  }),
  mounted() { // Lors du montage (voir le cycle de vie https://fr.vuejs.org/v2/guide/instance.html#Diagramme-du-cycle-de-vie) de cette page, cette fonction est appelée
    this.setActiveMenu()
  },
  methods: { // Définit toutes les méthodes du component
    setActiveMenu() { // Recupère le nom de la route utilisée (le nom des route est défini dans main.js) afin de mettre la "coloration active" sur le bouton 0, 1 ou 2 du navbar
      this.activeItem = (this.$route.name === "home" ? 0 : 
                          this.$route.name === "contact" ? 1 : 
                          this.$route.name === "aide" ? 2 : 0) // Si la route n'est pas connu, le bouton home est en "coloration active"
    }
  }
}
</script>
```









