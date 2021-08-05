const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require('../middleware/auth');

//Inscription de l'utilisateur
router.post("/signup", userCtrl.signup);

//Connexion de l'utilisateur
router.post('/login', userCtrl.login);

//Suppression du compte de l'utilisateur
router.delete('/:id', userCtrl.deleteAccount);

module.exports = router;