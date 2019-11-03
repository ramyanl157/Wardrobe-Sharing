var express = require('express');
var path = require('path');
var moment = require('moment');
var bodyParser = require('body-parser');
var cors= require('cors');

var app = express();
var http = require('http').Server(app);



app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
var routes = require('./routes.js');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hoogabooga'
});


connection.connect();

//app.get("/",routes.testQuery);
app.get("/signup",routes.signup);


//app.get("/",test.foo);


    

 http.listen(app.get('port') , function(err) {

 	if(err){

 		console.error("Error in setting up server" + err);
 	} else {

 		console.log('HTTP server listening on port ' + app.get('port'));

 	}
 });
module.exports= app;