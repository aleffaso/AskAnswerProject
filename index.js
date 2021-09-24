const express  = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const questionModule = require("./database/Question");
const Question = require("./database/Question");
const { response } = require("express");
const Answer = require("./database/Answer");

//Conectar ao database

connection.authenticate()
.then(()=>{
    console.log("Database connected")
})
.catch((error) => {
    console.log(error);
});

app.set('view engine', 'ejs'); //Rodar o EJS para trazer o HTML
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/", (req, res) => {
    questionModule.findAll({raw: true, order:[
        ['id', 'DESC'] //Ordem descrescente
    ]}).then(questionModule => {// Procurar todos os dados na tabela SELECT * FROM questions
        res.render("index",{
            questionModule: questionModule
        });
    });  
});

app.get("/ask", (req,res) => {
    res.render("ask");
});

app.post("/savequestion", (req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    questionModule.create({ //INSER INTO ..... + ..... SQL
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    });

});

app.get("/question/:id",(req,res) => {
    var id = req.params.id;
    questionModule.findOne({
        where: {id: id} //Busca o id da tabela e compara com o id da requisição
    }).then(questionModule => {

        if(questionModule){
            Answer.findAll({
                where: {questionId: questionModule.id},
                order: [['id', 'DESC' ]]
            }).then( answer => {
                res.render("question", {
                    questionModule: questionModule,
                    answer: answer
                });
            });
        }else{
            res.redirect("/");
        };
    });
});

app.post("/answer",(req,res)=>{
    var body = req.body.bodyAnswer;
    var questionId = req.body.questionId;

    Answer.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect("/question/"+questionId);
    });
});

app.listen(3000, () => {
    console.log("Server Running");
});