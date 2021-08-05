const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenMasque = process.env.TOKEN;
const connection = require("../mySqlConfig");
connection.connect();


//Doit comporter entre 2 et 25 caractères, n'accepte pas les chiffres et caractères spéciaux, accepte les espaces
const regexName = /^[A-Za-z\s]{2,25}$/;
//doit correspondre au format d'une adresse email
const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule et un chiffre
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;



//Inscription de l'utilisateur
exports.signup = (req, res, next) => {
  //Cryptage du mot de passe
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
        email: req.body.email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      };
      //Constante qui enregistrera le nouvel utilisateur dans la base de données
      const query = 'INSERT INTO Users (email, password, first_name, last_name) VALUES(?,?,?,?)';
      //Constante qui déclarera les valeurs tapées par le nouvel utilisateur
      const values = [user.email, user.password, user.first_name, user.last_name];
      //Envoi de la requête à la base de données
      connection.query(query, values, (err, data, fields) => {
        if (err) {
          return res.status(400).json({ err });
        } else {
          return res.status(201).json({ message: 'Utilisateur crée' });
        }
      });
    })
    .catch((error) => res.status(500).json({ message: "non" }));
};

//Connexion de l'utilisateur
exports.login = (req, res, next) => {
  const query = `SELECT * FROM Users WHERE email = ?`;
  const value = req.body.email;
  connection.query(query, value, function (err, data, fields) {
    if (data.length === 0) {
      return res.status(404).json({ err: "Pas de compte existant" });
    }
    bcrypt.compare(req.body.password, data[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: data[0].id,
          token: jwt.sign(
            { userId: data[0].id },
            tokenMasque,
            { expiresIn: "24h" }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  });
};

//Suppression du compte de l'utilisateur
exports.deleteAccount = (req, res, next) => {
  const query = `DELETE FROM Users WHERE id = ?`;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, tokenMasque);
  const userId = decodedToken.userId;
  const value = req.params.id;
  if (value && value !== userId) {
    return res.status(404).json({ message: "Vous n'avez pas l'autorisation de supprimer un compte qui ne vous appartient pas" });
  } 
  connection.query(query, value, function (err, data, fields) {
      if (err) { 
        return res.status(400).json({ err: "Désolé, votre demande de suppression de compte n'a pu aboutir." });
    } 
      res.json({ status: 200, data, message: "Votre compte a bien été supprimé !" });
    });
};

//Affichage des données d'un utilisateur
exports.getOneUser = (req, res, next) => {
  const query = `SELECT * FROM Users WHERE id = ?`;
  const value = req.params.id;
  connection.query(query, value, function (err, data, fields) {  
    if (err) {  
      return res.status(404).json({ message:'non' });
    }
    res.json({ status: 200, data, message: "Utilisateur affiché avec succès !" })
  });
};