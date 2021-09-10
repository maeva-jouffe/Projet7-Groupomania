/*CONFIGURATION DES REQUETES AXIOS CONCERNANT LES USERS.
Actions : login, signup, affichage d'un user, suppression d'un user.
*/

import http from "../axios-config";

class AuthDataServices {
    login(data) {
        return http.post('/auth/login', data);
    }
    signup(data) {
        return http.post('/auth/signup', data);
    }
    getOneUser(id) {
        return http.get(`/auth/${id}`);
    }
    deleteUser(id) {
        return http.delete(`/auth/${id}`);
    }
}

export default new AuthDataServices();