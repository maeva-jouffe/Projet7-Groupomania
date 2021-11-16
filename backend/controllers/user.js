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
        last_name: req.body.last_name,
      };
      //Constante qui enregistrera le nouvel utilisateur dans la base de données
      const query = 'INSERT INTO Users (email, password, first_name, last_name) VALUES(?,?,?,?)';
      //Constante qui déclarera les valeurs tapées par le nouvel utilisateur
      const values = [user.email, user.password, user.first_name, user.last_name];
      //Envoi de la requête à la base de données
      connection.query(query, values, (err, data, fields) => {
        if (err) {
          return res.status(400).json({ err });
        }
        //Si tout s'est bien passé, on crée un nouveau token pour cet utilisateur
        const query = `SELECT * FROM Users WHERE email = ?`;
        const value = user.email;
        connection.query(query, value, function (err, data, fields) {
          if (err) {
            return res.status(400).json({ err });
          }
          res.status(200).json({
            userId: data[0].id,
            isAdmin: data[0].isAdmin,
            token: jwt.sign(
              { userId: data[0].id, isAdmin: data[0].isAdmin },
              tokenMasque,
              { expiresIn: "24h" }
            )
          });
          next();
        })
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Connexion de l'utilisateur
exports.login = (req, res, next) => {
  //On recherche dans la base de données l'utilisateur dont l'email est le même que celui de la requête
  const query = `SELECT * FROM Users WHERE email = ?`;
  const value = req.body.email;
  connection.query(query, value, function (err, data, fields) {
    if (data.length === 0) {
      return res.status(404).json({ err: "Pas de compte existant" });
    }
    //On compare le hash du mot de passe en base de données et le hash qui vient d'être crée
    bcrypt.compare(req.body.password, data[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        //Si tout s'est bien passé on génère un nouveau token
        res.status(200).json({
          userId: data[0].id,
          isAdmin: data[0].isAdmin,
          token: jwt.sign(
            { userId: data[0].id, isAdmin: data[0].isAdmin },
            tokenMasque,
            { expiresIn: "24h" }
          )
        });
        next();
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
exports.getOneUser = (req, res) => {
  const query = `SELECT * FROM Users WHERE id = ?`;
  const value = req.params.id;
  connection.query(query, value, function (err, data, fields) {
    if (err) {
      return res.status(404).json(err);
    }
    res.json({ status: 200, data, message: "Utilisateur affiché avec succès !" })
  });
};

//Modification des données d'un utilisateur
exports.modifyProfil = (req, res, next) => {
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    bio: req.body.bio,
    photo: req.file ? `${req.protocol}://${req.get(`host`)}/images/${req.file.filename}` : null,
    id: req.params.id
  };
  
  const query = `UPDATE Users SET first_name = ?, last_name = ?,  bio = ?, photo = ? WHERE id = ?`;
  const value = [user.first_name, user.last_name, user.bio, user.photo, user.id];
  connection.query(query, value, (err, data, fields) => {
    if (err) {
      return res.status(404).json(err);
    } else {
      console.log(user);
      res.json({ status: 200, data, message: "Informations modifiées avec succès !" })
    }
  })
};