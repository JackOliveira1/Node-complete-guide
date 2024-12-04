const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '1237', {dialect: 'mysql', host: 'localhost'});


module.exports = sequelize;