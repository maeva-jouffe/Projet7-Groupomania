const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenMasque = process.env.TOKEN;
const connection = require("../mySqlConfig");
connection.connect();

//Inscription de l'utilisateur
exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
  
      const user = new User({
        email: req.body.email,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      });
      
      const query = 'INSERT INTO Users (email, password, first_name, last_name) VALUES(?,?,?,?)';
      const values = [user.email, user.password, user.first_name, user.last_name];
      connection.query(query, values, (err, data, fields) => {
        if (err) {
          return res.status(400).json({ err });
        } else {
          return res.status(201).json({ message: 'Utilisateur crée' });
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
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
            { userId: data[0].id},
            tokenMasque,
            { expiresIn: "24h" }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  });
};
