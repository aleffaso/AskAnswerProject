const Sequelize = require ("sequelize");

const connection = new Sequelize('askquestions', 'root', 'YourPassword',{ //Database set up
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

