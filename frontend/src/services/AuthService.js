// Nous créons un nouveau fichier AuthService.js pour faire des requêtes à notre serveur(Rest API).Pour cela, nous avons besoin d'une fonction login(credentials)pour la connexion et la fonction signUp(credentials)pour s'inscrire.Ici, vous avez besoin de notre package axios, que nous avons déjà installé à l' étape 3 .

// La troisième fonction getSecretContent()renvoie le contenu secret, qui ne s'affiche que si vous êtes connecté.
import axios from 'axios';

const url = 'http://localhost:3000/api/auth/';
export default {
    login(credentials) {
        return axios
            .post(url + 'login/', credentials)
            .then(response => console.log(response.data))
        ;
    },
    signUp(credentials) {
        return axios
            .post(url + 'signup/', credentials)
            .then(response => response.data);
    },
    getSecretContent() {
        return axios.get(url + 'secret-route/').then(response => response.data);
    }
};

