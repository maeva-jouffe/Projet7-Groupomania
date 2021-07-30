const { Sequelize, DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    // Les attributs du modèle sont définis ici
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Users'
});

return User;