const express  = require("express"); //Import framework 
const app = express(); //Use framework
const bodyParser = require("body-parser");
const connection = require("./database/database");
const questionModule = require("./database/Question");
const Question = require("./database/Question");
const { response } = require("express");
const Answer = require("./database/Answer");

//Connect to Database
connection.authenticate()
.then(()=>{
    console.log("Database connected")
})
.catch((error) => {
    console.log(error);
});

app.set('view engine', 'ejs'); //Run EJS to render HTML
app.use(express.static('public'));

//Body parser to use partials
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
    questionModule.findAll({raw: true, order:[
        ['id', 'DESC'] //Order inverted
    ]}).then(questionModule => {// As well as SELCT * FROM questions 
        res.render("index",{
            questionModule: questionModule //Show all question at the main page
        });
    });  
});

app.get("/ask", (req,res) => {
    res.render("ask");
});

app.post("/savequestion", (req,res) => { //Saving the questions asked
    var title = req.body.title; //Associated to ask.js name "title"
    var description = req.body.description; //Associated to ask.js name "description"
    questionModule.create({ //INSER INTO ..... + ..... SQL
        title: title, //Associated to database Question
        description: description
    }).then(() => {
        res.redirect("/"); //Redirect to index.ejs
    });

});

app.get("/question/:id",(req,res) => { // Search for questions by id
    var id = req.params.id;
    questionModule.findOne({
        where: {id: id} //Compare id from table and parameter
    }).then(questionModule => {

        if(questionModule){
            Answer.findAll({ //If find the questionModule id
                where: {questionId: questionModule.id},
                order: [['id', 'DESC' ]]
            }).then( answer => {
                res.render("question", { //Then render the question itself with its answers
                    questionModule: questionModule,
                    answer: answer
                });
            });
        }else{
            res.redirect("/"); //Redirect to index.ejs
        };
    });
});

app.post("/answer",(req,res)=>{ // To send an answer to the question
    var body = req.body.bodyAnswer; //Related to question.ejs "bodyAnswer"
    var questionId = req.body.questionId; //Related to question.ejs "questionId"

    Answer.create({ //variables from database Answer
        body: body, //Related to database Answer
        questionId: questionId
    }).then(() => {
        res.redirect("/question/"+questionId); //Render the answer according to the questions
    });
});

app.listen(3000, () => {
    console.log("Server Running"); //To make sure the app is running
});