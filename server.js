var PORT = 3000 || process.env.PORT;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tweets = require('./routes/tweets');
var relationships = require('./routes/relationships');

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
var static_folder = app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Database
var DB = "mongodb://localhost/twitter";
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DB, function(err) {
  if (err) {
    return err;
  } else {
    console.log('Successfully connected to ' + DB);
  }
});

app.use('/', index);
app.use('/api', tweets);
app.use('/api', relationships);

app.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
})
