//Capital letter cause it's a module

const Sequelize = require("sequelize");
const connection = require("./database");

const Question = connection.define('question',{ //Criar banco de dados com a tabela Question
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force:false}).then(() => {}); //força o banco de dados a criar a tabela Question caso não exista

module.exports = Question;