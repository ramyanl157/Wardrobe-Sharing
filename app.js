var express = require('express');
var path = require('path');
var moment = require('moment');
var bodyParser = require('body-parser');
var cors= require('cors');

var app = express();
var session = require('client-sessions');
var http = require('http').Server(app);

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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
app.get("/login",routes.login);
app.get("/clothes",routes.filter);
app.get("/suggest",routes.suggest);
app.get("/product",routes.product);
app.get("/addItem",routes.addItem);
app.get("/checkusername",routes.checkUnique);
app.get("/finduserid",routes.finduserid);
app.get("/addorder",routes.addorder);
app.get("/changeStatus",routes.changeStatus);
app.get("/getOrderID",routes.getOrderID);



app.get("/updateuser",routes.updateuser);


    

 http.listen(app.get('port') , function(err) {

 	if(err){

 		console.error("Error in setting up server" + err);
 	} else {

 		console.log('HTTP server listening on port ' + app.get('port'));

 	}
 });
module.exports= app;