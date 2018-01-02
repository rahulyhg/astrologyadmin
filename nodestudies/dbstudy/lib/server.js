var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(3000, function(){
    console.log('API running on port 3000');
});

var db = mongoose.connect('mongodb://localhost/dbstudies', {useMongoClient: true});

var Sign = require('./model/signs');
var Planet = require('./model/planets');
var House = require('./model/houses');
var Person = require('./model/person');

app.post('/signs', function(req, res){
    var sign = new Sign();
    sign.signName = req.body.signName;
    sign.signDescription = req.body.signDescription;
    sign.save(function(err, savedPlanet){
        if(err){
            res.status(500).send("Could not save data");
        } else {
            res.send(savedPlanet);
        }
    });
});

app.get('/signs', function(req, res){
    //res.send('Signs page');

    Sign.find({}, function(err, signs){
        if(err){
            res.status(500).send("Could not fetch data");
        } else {
            res.send(signs);
        }
    });
});

app.post('/user/sign', function(req, res){

    Sign.find({}).populate({path:'signs'});

    Sign.findOne({signName: req.body.signName}, function(err, tt){
        if(err){
            res.status(500).send({error:'Could not find data'});
        } else {
            //res.send("Hello"); 
            res.send(tt.signDescription);
            
        }
    });
});



var babies = [
    {
        "id": "1",
        "name": "Pituka" 
    },

    {
        "id": "2",
        "name": "Branca" 
    },

    {
        "id": "3",
        "name": "Shikaka" 
    },

    {
        "id": "4",
        "name": "Kasparov" 
    }

];

app.get('/', function (req, res){
    res.send(babies);
});

app.get('/about', function(req, res){
    res.send('About page');
});

app.post('/', function(req, res){
    var baby = req.body;
    if(baby.name == ""){
        res.status(500).send({error: "Please type a valid name"});
    } else {
        babies.push(baby);
        res.status(200).send(babies);
    }
});

app.put('/:babyId', function(req, res){

    var babyId = req.params.babyId;
    var newName = req.body.name;

    if(!newName || newName ===""){
        res.status(500).send("You must type a valid name");
    } else {
        for (var i = 0; i<babies.length; i++){
            var bb = babies[i];
            if (bb.id === req.params.babyId){
                babies[i].name = newName;
                break;
            }
        }

        res.send(babies);
    }
});

