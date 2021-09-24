const Sequelize = require ("sequelize");

const connection = new Sequelize('askquestions', 'root', 'YourPassword',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

