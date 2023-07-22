require('dotenv').config()
const { Sequelize } = require('sequelize');

module.exports =  new Sequelize(process.env.confDB, process.env.confUser, process.env.confPassword, {
    host: process.env.confHost,
    dialect: 'mariadb'
  });