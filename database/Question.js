//Capital letter cause it's a module

const Sequelize = require("sequelize");
const connection = require("./database");

const Question = connection.define('question',{ //Create database with "question" name
    title:{
        type: Sequelize.STRING,
        allowNull: false //Need to fill the field
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force:false}).then(() => {}); //In case of database "question" does not exist, it forces to create

module.exports = Question;