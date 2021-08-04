const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

//Inscription de l'utilisateur
router.post("/signup", userCtrl.signup);

//Connexion de l'utilisateur
router.post('/login', userCtrl.login);

module.exports = router;