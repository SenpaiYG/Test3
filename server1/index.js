const path = require('path');
const {sequelize, DataTypes, Sequelize} = require('sequelize')

const server = new Sequelize ({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false, 
})

module.exports = {Sequelize, DataTypes, server}