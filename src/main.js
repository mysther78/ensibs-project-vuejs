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



const router = new VueRouter({ // Déclare toutes les routes du site
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/aide', name: 'aide', component: Aide },
  ]
})

Vue.config.productionTip = false

new Vue({ // Créer l'application à partir du component importé 'App', et ajoute le système de route
  router,
  render: h => h(App),
}).$mount('#app')
