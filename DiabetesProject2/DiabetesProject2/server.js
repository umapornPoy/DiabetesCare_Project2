var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('diabetesmember', ['diabetesmember']);
var bodyParser = require('body-parser');

var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database'); // get db config file
var User = require('./app/models/user'); // get the mongoose model
var jwt = require('jwt-simple');


var path = require('path');
var http = require('http');

var port = process.env.PORT || 61576;

var cors = require('cors');
app.use(cors());

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:8080)
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


// connect to database
mongoose.connect(config.database);
 
// pass passport for configuration
require('./config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();
 
// create a new user account (POST http://localhost:8080/api/signup)
apiRoutes.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    var newUser = new User({
        username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});
 
// connect the api routes under /api/*
app.use('/api', apiRoutes);


apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});


// route to a restricted info (GET http://localhost:8080/api/memberinfo)
apiRoutes.get('/diabetesmember', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            username: decoded.username
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                res.json({ success: true, msg: 'Welcome in the member area ' + user.username + '!' });
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'No token provided.' });
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};




app.use(express.static(__dirname + '/DiabetesProject2'));
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


app.post('/diabetesmember:id', function (req, res) {

    var id = req.params.id;
    console.log(id);
    console.log(req.body.name);
    db.diabetesmember.findOne({
        query: { _id: mongojs.ObjectId(id) },
        username: req.body.username, password: req.body.password
    },function (err, doc) {
        res.json(doc);},
    function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }

        if (!user) {
            res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            return res.status(200).send();
        }
    });
});


app.listen(port, function() {
    console.log('Listening on port ' + port);
});
