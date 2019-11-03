var mysql      = require('mysql');
var session = require('client-sessions');
var moment = require('moment');


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
        var query = "UPDATE " + tableName + ' SET '; 
        for (var key in obj) {
          query = query + ' ' + key +' = ' + "'" + obj[key] +"'" + ','
            // col = col + key + ',';
            // if (Type.string(obj[key]) === 'String') {
            //     val = val + '\'' + obj[key] + '\',';
            // } else {
            //     val = val + obj[key] + ',';
            // }
        }
        query = query.substr(0, query.length - 1);
        // val = val.substr(0, val.length - 1);
        var updateQuery = query + ' WHERE name = ' + "'" + obj['name'] + "';";

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
        var query = "UPDATE " + tableName + ' SET '; 
        for (var key in obj) {
          query = query + ' ' + key +' = ' + "'" + obj[key] +"'" + ','
            // col = col + key + ',';
            // if (Type.string(obj[key]) === 'String') {
            //     val = val + '\'' + obj[key] + '\',';
            // } else {
            //     val = val + obj[key] + ',';
            // }
        }
        query = query.substr(0, query.length - 1);
        // val = val.substr(0, val.length - 1);
        var updateQuery = query + ' WHERE itemID = ' + "'" + obj['itemID'] + "';";

        return (updateQuery);
    },
    runQuery:function(query){
    	connection.query(query,function(req,rows,res){

    	});
    },
  //   signup: function(data,result){
  //   	console.log(data.query);
  //   	q1 = "SELECT * from user WHERE emailID = " + '"' + data.query.emailID + '"';
  //   	connection.query(q1,function(req,rows,res){
  //   		if(rows.length != 0){
  //   			console.log("duplicate");
  //   			result.json({stat:"duplicate"});
    			
  //   		}
  //   		else{
  //   			console.log("I am here");
  //   			q2  = database.getInsertQuery(data.query,"user");
  //   			console.log(q2);
  //   			connection.query(q2,function(err,res){
  //   				if(!err && res){
  //   					var response = {stat:"success"};
  //   					result.end(response);
  //   					console.log("query success");
    					
  //   				}
  //   				else{
  //   					console.log(err);
  //   					console.log("query fail");
  //   				}
  //   			});
  //   		}
  //   	});
    	
 	// },
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
    
    signup:function(data,result){
    	console.log(data.query);
    	q1 = "SELECT * from user WHERE emailID = " + '"' + data.query.emailID + '"';
    	connection.query(q1,function(req,rows,res){
    		if(rows.length != 0){
    			console.log("duplicate");
    			result.json({stat:"duplicate"});
    			
    		}
    		else{
    			q2  = database.getInsertQuery(data.query,"user");
				console.log(q2);
				connection.query(q2,function(err,res){
					if(!err && res){
						console.log(res);
						// data.session.user = res[0].name;
						var response = {stat:"success", user:data.query.name};
						result.send(response);
						console.log(response);
						
					}
					else{
						console.log(err);
						console.log("query fail");
					}
				});
    		}
		
		});	
	},

	login: function(request,result){
		q1 = "SELECT * from user WHERE emailID = " + '"' + request.query.emailID + '"' + "AND password = " + '"'+request.query.password+'"';
		console.log(q1);
		connection.query(q1,function(err,res){
			if(!err && res.length != 0){
				console.log("setting cookie");
				console.log(res);
				request.session.user = res[0].name;
				// result.redirect("http://localhost:8080/index");
				result.send({stat:"success",
								user:res[0].name
							});
			}
			else{
				result.send({
					stat:"invalid"
				})
			}
		})
	},
	filter:function(request,result){
		q1 = "SELECT * from item WHERE ";
		// console.log(JSON.parse(request.query.color));
		if(request.query.sex != "")
			q1 = q1 + "sex = " + '"' + request.query.sex + '"' ;
		if(request.query.category != "")
			q1 = q1 + ' AND ' + "category = " + '"' + request.query.category + '"';
		if(request.query.color != "[]"){
			color = JSON.parse(request.query.color);
			q1 = q1 + " AND (";
			var i = 0;
			for(i;i<color.length-1;i++){
				q1 = q1 + "color = " + '"'+ color[i] +'"' + " OR "
			}
			q1 = q1 + " color = " + '"' + color[i] + '")';
		}
		if(request.query.size != "[]"){
			size = JSON.parse(request.query.size);
			q1 = q1 + " AND (";
			var i = 0;
			for(i;i<size.length-1;i++){
				q1 = q1 + "size = " + '"' + size[i] + '"' + " OR "
			}
			q1 = q1 + " size = " + '"' + size[i]+ '")';
		}
		if(request.query.brand != ""){
      q1= q1 +" AND brand = " + '"' + request.query.brand +'"';
		// 	brand = JSON.parse(request.query.brand);
		// 	q1 = q1 + " AND ";
		// 	var i = 0;
		// 	for(i;i<brand.length-1;i++){
		// 		q1 = q1 + "brand = " + brand[i] + " OR "
		// 	}
		// 	q1 = q1 + " brand = " + brand[i];
		}
    q1 +=" AND status = \"A\";";
		console.log(q1);
		connection.query(q1,function(err,res){
			// console.log(res);
			result.send(res);
			// result.end(JSON.stringify(res));
			// console.log(JSON.stringify(res));
			// console.log(JSON.parse(res));
		})
	},

  suggest:function(req,result){

    // q1 = "SELECT distinct brand from item";
    // connection.query(q1,function(err,res){
    //   console.log(res);
    //   result.send(res);
    // })
    var i = 0;
    var sug=[];
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('./brands.txt')
      });
    console.log("Hello");
    console.log(req.query.term);

      lineReader.on('line', function (line) {
          if(line.toLowerCase().indexOf('eof') == 0){
            result.send(sug);
          }
          if(line.toLowerCase().indexOf(req.query.term.toLowerCase()) > -1){
            sug.push(line);
            console.log('Line from file:', line);
          }
      });      
  },

  product: function(req,result){
    q1 = "SELECT * from item WHERE itemID = " + '"' + req.query.itemID + '"';
    connection.query(q1, function(err,res){
      //console.log(res);
      res[0].dateto = moment(res[0].dateto).format('DD-MM-YYYY');
      res[0].datefrom = moment(res[0].datefrom).format('DD-MM-YYYY');
      console.log(res);
      result.send(res);
      })
  },

  checkUnique: function(req,result){
    q1 = "SELECT * from user WHERE username = " + '"' + req.query.username + '"';
    connection.query(q1,function(req,rows,res){
        if(rows.length != 0){
          console.log("exists");
          result.json({status:"exists"});          
        }
        else{
          result.json({status:"fine"});
        }
      })

  },

  updateuser: function(req,result){
    console.log(req.query)
    q1 = database.getUpdateQuery(req.query,"user");
    console.log(q1);
    connection.query(q1,function(err,res){
      if(!err){
        result.json({status:"success"});
      }else{
        console.log("Errer");
        result.json({status:"fail"});
      }
    })
  },

  addItem: function(req,result){
    // var x = database.finduserid(req.query.userID);
    console.log(req.query.userID)
    q1 = "SELECT username from user WHERE name = " + '"' + req.query.userID + '"';
    connection.query(q1,function(err,res){
      console.log(res);
      req.query.userID = res[0].username;
      var q1 = database.getInsertQuery(req.query, "item");
      console.log(q1)
      connection.query(q1,function(err,res){
        if(!err){
          console.log("Item added");
          result.json({status:"success"});
        }
        else{
          console.log("item wasn't added")
          console.log(err);
          result.json({status:"error"});
        }
      })
    })
    
  },

  finduserid : function(namex){
    q1 = "SELECT username from user WHERE name = " + namex;
    connection.query(q1,function(err,res){
      console.log(res[0]);
    })

  },

  addorder:function(req,result){
    q1 = database.getInsertQuery(req.query,'orders');
    connection.query(q1,function(err,res){
      if(!err){
        result.json({status:"success"});
        console.log("order placed");
      }
    })
  },

  changeStatus:function(req,result){
    // console.log("hello");
    var Type = require('type-of-is');
    var x = req.query;
      for(key in req.query){
        console.log(key)
        console.log(Type.string(key))
        start1 = -1;
        start2 = -1;
        comma = key.split(",").length - 1;
        console.log(comma);
        for(var i = 0;i<comma + 1; i++){
          start1 = key.indexOf(":", start1 + 1);
          start2 = key.indexOf("}", start2 + 1);
          m = key.substring(start1, start2);
          console.log(m);
          var x = m.substring(2,m.length-1)
          console.log(x);
          var change = {
            status : "NA",
            itemID : x

          }
          var q1 = database.getUpdateQueryForOrders(change,'item');
          connection.query(q1,function(err,res){
            console.log("Changed");
            // result.json({status:'success'})
            });
          }
          result.json({status:"success"});  
    }
    // console.log(req.query.substr(req.query.indexOf("'"),req.query.indexOf("'",4)));
    
  },
  getOrderID: function(req,result){
    q1 = "SELECT * FROM orders WHERE userID = " + "'" +  req.query.userID +"'";
    console.log(q1);
    connection.query(q1,function(err,res){
      console.log(res)
      result.json({orderID : res[0].orderID})
    })
  }


};
module.exports = database;