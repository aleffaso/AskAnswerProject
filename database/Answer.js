const Sequelize = require("sequelize");
const connection = require("./database");

const Answer = connection.define('answer',{
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
         type: Sequelize.INTEGER,
         allowNull: false     
    }
});

Answer.sync({force: false}); //In case of database "question" does not exist, it forces to create

module.exports= Answer;