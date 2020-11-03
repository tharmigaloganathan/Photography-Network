var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 5, //important
    host     : 'localhost',
    user     : 'root',
    password : 'Tharmiga21',
    database : 'prod',
    debug    :  false
});

function handle_database(_query,req,res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }
        console.log('connected as id ' + connection.threadId);
        connection.query(_query,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });
        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
    });
}

function handle_addlike(_query,req,res) {
    res.setHeader('Access-Control-Allow-Origin','*');
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }
        console.log('connected as id ' + connection.threadId);
        connection.query(_query,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });
        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
    });
}

app.get("/get-images",function(req,res){
        var query = "select * FROM pictures INNER JOIN events ON events.eventID = pictures.eventID INNER JOIN occasions ON events.occasionID = occasions.occasionID INNER JOIN photographers ON pictures.photographerID = photographers.photographerID";
        handle_database(query,req,res);
});

app.get("/get-cameras",function(req,res){
        var query = "select * FROM cameras";
        handle_database(query,req,res);
});

app.get("/get-lenses",function(req,res){
        var query = "select * FROM lenses";
        handle_database(query,req,res);
});

app.get("/customer-info", function(req,res) {
    var query = "SELECT * FROM customers INNER JOIN events ON events.customerID = customers.customerID INNER JOIN pictures ON pictures.eventID = events.eventID INNER JOIN occasions ON events.occasionID = occasions.occasionID WHERE pictures.photographerID = 'PH268'"
    handle_database(query,req,res);
});

app.get("/your-photos", function(req,res) {
    var query = "SELECT * FROM pictures INNER JOIN events ON events.eventID = pictures.eventID INNER JOIN occasions ON events.occasionID = occasions.occasionID INNER JOIN lenses ON lenses.lensID = pictures.lensID INNER JOIN cameras on cameras.cameraID = pictures.cameraID WHERE pictures.photographerID = 'PH268'"
    handle_database(query,req,res);
});

app.get("/add-image/:lensID/:cameraID/:eventID/:imageURL",function(req,res){
        var lens = req.params.lensID;
        var camera = req.params.cameraID;
        var events = req.params.eventID;
        var imageURL = req.params.imageURL;
        var query = "INSERT INTO pictures VALUES('PI6011',?,?,?,'PH268',1000,200,200,200,?)";
        console.log(query);
        res.setHeader('Access-Control-Allow-Origin','*');
        pool.getConnection(function(err,connection){
            if (err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            }
            console.log('connected as id ' + connection.threadId);
            connection.query(query,[lens,camera,events,imageURL],function(err,rows){
                connection.release();
                if(!err) {
                    res.json(rows);
                }
            });
            connection.on('error', function(err) {
                  res.json({"code" : 100, "status" : "Error in connection database"});
                  return;
            });
        });
});

app.get("/add-like/:pictureID",function(req,res){
        var pictureID = req.params.pictureID;
        var query = "UPDATE pictures SET numberOfLikes = (SELECT numberOfLikes WHERE pictureID =?) + 1 WHERE pictureID =?";
        console.log(query);
        res.setHeader('Access-Control-Allow-Origin','*');
        pool.getConnection(function(err,connection){
            if (err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            }
            console.log('connected as id ' + connection.threadId);
            connection.query("UPDATE pictures SET numberOfLikes = (SELECT numberOfLikes WHERE pictureID =?) + 1 WHERE pictureID =?",[req.params.pictureID,req.params.pictureID],function(err,rows){
                connection.release();
                if(!err) {
                    res.json(rows);
                }
            });
            connection.on('error', function(err) {
                  res.json({"code" : 100, "status" : "Error in connection database"});
                  return;
            });
        });
});

app.get("/stats-number/:camID",function(req,res){
        var camID = req.params.camID;
        var query = "SELECT COUNT(pictures.eventID) AS number, occasions.occasionName, cameras.cameraModel, cameras.cameraBrand FROM pictures INNER JOIN cameras on pictures.cameraID = cameras.cameraID INNER JOIN events on events.eventID = pictures.eventID INNER JOIN occasions on occasions.occasionID = events.occasionID WHERE pictures.cameraID = ? GROUP BY occasions.occasionID";
        console.log(query);
        res.setHeader('Access-Control-Allow-Origin','*');
        pool.getConnection(function(err,connection){
            if (err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            }
            console.log('connected as id ' + connection.threadId);
            connection.query(query,[req.params.camID],function(err,rows){
                connection.release();
                if(!err) {
                    res.json(rows);
                }
            });
            connection.on('error', function(err) {
                  res.json({"code" : 100, "status" : "Error in connection database"});
                  return;
            });
        });
});

app.get("/stats-likes/:camID",function(req,res){
        var camID = req.params.camID;
        var query = "SELECT SUM(pictures.numberOfLikes) AS NumberOfLikes, occasions.occasionName, cameras.cameraModel, cameras.cameraBrand FROM pictures INNER JOIN cameras on pictures.cameraID = cameras.cameraID INNER JOIN events on events.eventID = pictures.eventID INNER JOIN occasions on occasions.occasionID = events.occasionID WHERE pictures.cameraID = ? GROUP BY occasions.occasionID";
        res.setHeader('Access-Control-Allow-Origin','*');
        pool.getConnection(function(err,connection){
            if (err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            }
            console.log('connected as id ' + connection.threadId);
            connection.query(query,[req.params.camID],function(err,rows){
                connection.release();
                if(!err) {
                    res.json(rows);
                }
            });
            connection.on('error', function(err) {
                  res.json({"code" : 100, "status" : "Error in connection database"});
                  return;
            });
        });
});

app.listen(3000);
