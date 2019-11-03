var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hoogabooga'
});
connection.connect();




var database = {
	getInsertQuery: function (obj, tableName) {
        var Type = require('type-of-is');
        var col = '';
        var val = '';
        for (var key in obj) {
            col = col + key + ',';
            if (Type.string(obj[key]) === 'String') {
                val = val + '\'' + obj[key] + '\',';
            } else {
                val = val + obj[key] + ',';
            }
        }
        col = col.substr(0, col.length - 1);
        val = val.substr(0, val.length - 1);
        var insertQuery = 'INSERT into ' + tableName + ' (' + col + ') values (' + val + ')';
        //console.log(insertQuery);
        return (insertQuery);
    },
	getUpdateQuery: function (obj, tableName) {
        var Type = require('type-of-is');
        var col = '';
        var val = '';
        for (var key in obj) {
            col = col + key + ',';
            if (Type.string(obj[key]) === 'String') {
                val = val + '\'' + obj[key] + '\',';
            } else {
                val = val + obj[key] + ',';
            }
        }
        col = col.substr(0, col.length - 1);
        val = val.substr(0, val.length - 1);
        var updateQuery = 'UPDATE ' + tableName + ' SET (' + col + ') = (' + val + ') where userID = \'' + obj.phone + '\'';

        return (updateQuery);
    },
    testQuery:function(){
    	var data={
    		username: "harshbh",
    		name: "Harsh Bhardwaj",
    		address:"A101, Skyline Ambrosia Bangalore",
    		phone: "9654913209",
    		emailID:"harsbh@hotmail.com",
    		password:"qwerty123",
    		sex:"M"
    	};
    	var table = "user";
    	var quer = database.getInsertQuery(data,table);
    	connection.query(quer,function(req,rows,res){
    		
    		if(res==""){
    			console.log("err123");
    		}
    		else
    			console.log("Success");

    	});
    },
    getUpdateQueryForOrders: function (obj, tableName) {
        var Type = require('type-of-is');
        var col = '';
        var val = '';
        for (var key in obj) {
            col = col + key + ',';
            if (Type.string(obj[key]) === 'String') {
                val = val + '\'' + obj[key] + '\',';
            } else {
                val = val + obj[key] + ',';
            }
        }
        col = col.substr(0, col.length - 1);
        val = val.substr(0, val.length - 1);
        var updateQuery = 'UPDATE ' + tableName + ' SET (' + col + ') = (' + val + ') where orderID = \'' + obj.order_id + '\'';

        return (updateQuery);
    },
    runQuery:function(query){
    	connection.query(query,function(req,rows,res){

    	});
    },
    signup: function(data,result){
    	console.log(data.query);
    	q1 = "SELECT * from user WHERE emailID = " + '"' + data.query.emailID + '"';
    	connection.query(q1,function(req,rows,res){
    		if(rows.length != 0){
    			result.send({stat:"duplicate"});
    			console.log("duplicate");
    		}
    		else{
    			console.log("I am here");
    			q2  = database.getInsertQuery(data.query,"user");
    			console.log(q2);
    			connection.query(q2,function(err,res){
    				if(!err && res){
    					console.log("query success");
    					result.send({stat:"ok"});
    				}
    				else{
    					console.log(err);
    					console.log("query fail");
    				}
    			});
    		}
    	});
    	
 
		// console.log(data.query);
  //   	quer = database.getInsertQuery(data.query,"user");
  //   	console.log(quer);
  //   	connection.query(quer,function(err,res){
  //   		if(err){
  //   			console.log("Harsh");
  //   			result.send({status:"fail"});
  //   		}
  //   		else {
  //   			console.log("Moksh");
  //   			result.send({status:"success"});
  //   		}
  //   	})
    }

};
module.exports = database;