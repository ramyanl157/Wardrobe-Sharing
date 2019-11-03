var express = require('express');
var cors = require('cors');
var favicon = require('serve-favicon');
var app = express();

//db connection details
var monk = require('monk');
var db;
var database;

    db = monk('localhost:27017/wt');

var mon = {
	signup:function(req,res,next){
		var callback=function(err,result){
			if(!err){
				result.send({stat:"success"});
			}
		}
		var user = db.get('items');
		user.insert(req,callback);

	}
}   
module.exports=mon;
