import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import Product from '@/views/Product.vue';
import NotFound from '@/views/NotFound.vue';

//Tableau de routes
const routes = [
    {
        name: 'Login',
        path: '/',
        component: Login,
        meta: {
            title: 'Accueil'
        }
    }, {
        name: 'Profile',
        path: '/auth/:id',
        component: Profile,
        props: true,
        meta: {
            title: 'Mon profil'
        }
    }, {
        name: 'Product',
        path: '/product/:name',
        component: Product,
        props: true,
        meta: {
            title: 'Produits'
        }
    },
    {
        name: 'Notfound',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            title: '404 Not Found'
        }
    },
];
// CREATEWEBHISTORY Lors de l'utilisation du mode historique, l'URL aura l'air "normale", par exemple https://example.com/user/id. Magnifique!

// Voici cependant un problème: étant donné que notre application est une application côté client d'une seule page, sans configuration de serveur appropriée, les utilisateurs recevront une erreur 404 s'ils accèdent https://example.com/user/iddirectement dans leur navigateur. Maintenant c'est moche.

// Ne vous inquiétez pas: pour résoudre le problème, il vous suffit d'ajouter une simple route de secours fourre-tout à votre serveur. Si l'URL ne correspond à aucun élément statique, elle doit être diffusée sur la même index.htmlpage que celle sur laquelle se trouve votre application.Magnifique, encore une fois!
//Création du router
const router = createRouter({
    history: createWebHistory(),
    routes,
})

//To = vue d'arrivée. La meta title pour pouvoir mettre la description de la page
router.afterEach((to) => {
    document.title = to.meta.title;
});

export default router;