var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('diabetesmember', ['diabetesmember']);
var bodyParser = require('body-parser');

var path = require('path');
var http = require('http');

var port = process.env.PORT || 61576;

var core = require('cors');
app.use(cors());  

app.use(express.static(__dirname + '/DiabetesJS'));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get('/diabetesmember', function (req, res) {
  console.log('I received a GET request');

  db.diabetesmember.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});


app.post('/diabetesmember', function (req, res) {
  console.log(req.body);
  db.diabetesmember.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/diabetesmember/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.diabetesmember.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});



app.get('/diabetesmember/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.diabetesmember.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/diabetesmember/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.diabetesmember.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {username: req.body.username, password: req.body.password, confirm: req.body.confirm, firstname: req.body.firstname, lastname: req.body.lastname, 
      gender: req.body.gender, email: req.body.email, age: req.body.age, weight: req.body.weight, height: req.body.height, type: req.body.type, 
      complication: req.body.complication, disease: req.body.disease, dragallergy: req.body.dragallergy, emaildoctor: req.body.emaildoctor}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


app.listen(port, function() {
    console.log('Listening on port ' + port);
});
