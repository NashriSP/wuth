const Sequelize = require('sequelize');
const db = require('../config/database')


const User = db.define('user',
    {
        username: {
            type:Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        email:{
            type:Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail:true,
            },
        },
        password:{
            type:Sequelize.STRING,
            allowNull: false,
        },
    }
);

User.sync();
module.exports = User;