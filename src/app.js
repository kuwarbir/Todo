const express = require('express');
const path = require('path');
const logger = require('morgan');
const mainRoutes = require('./backend/routes/MainRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
app = express();

var cookieParser = require("cookie-parser");

// importing express-session object
var session = require("express-session");

// creating object of express
var app = express();

// using cookie parser on our application

// using express session object with secret key : "KonfinitySecretKey",
// resave and saveUninitialized options as false
// using default cookie value

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/client/views/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(logger('dev'));
 app.use(express.static(path.join(__dirname,'client')));
app.use(cookieParser());
var todolist=[
	"do this",
	"do that"
]
app.use(
	session({
	  secret: "KonfinitySecretKey",
	  resave: false,
	  saveUninitialized: false,
	  cookie: {}
	})
  );

app.use('/', mainRoutes);
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
	console.log('Application listening in port:' + app.get('port'));
})

module.exports = app;
