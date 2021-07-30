const express = require('express');
const Sequelize = require('sequelize');

const app = express();


const sequelize = new Sequelize('test', 'root', 'marseille13007', {
    host: 'localhost',
    dialect: 'mysql'
  });
  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;