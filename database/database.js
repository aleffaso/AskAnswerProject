const Sequelize = require ("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const connection = new Sequelize('askquestions', 'root', process.env.DATABASE_PASSWORD,{ //Database set up
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = connection;



