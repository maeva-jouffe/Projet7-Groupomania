//CONFIGURATION D'AXIOS QUI FACILITE LES REQUETES AU BACKEND

import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3000/api",
});
instance.defaults.headers.common['Authorization'] = TOKEN;

module.exports = instance;