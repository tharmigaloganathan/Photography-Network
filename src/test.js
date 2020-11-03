var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.
var sqlConfig = {
    user: 'root',
    password: 'Tharmiga21',
    server: 'localhost',
    database: 'prod'
}

// Start server and listen on http://localhost:8081/
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("app listening at http://%s:%s", host, port)
});

app.get('/events', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.query('select * from events', function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
})

app.get('/customers/:customerId/', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        var stringRequest = 'select * from Sales.Customer where customerId = ' + req.params.customerId;
        request.query(stringRequest, function(err, recordset) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
})

app.get('/customers/:customerId/orders', function (req, res) {
    sql.connect(sqlConfig, function() {
        var request = new sql.Request();
        request.input('CustomerId', req.params.customerId);
        request.execute('Sales.uspShowOrderDetails', function(err, recordsets, returnValue, affected) {
            if(err) console.log(err);
            res.end(JSON.stringify(recordsets)); // Result in JSON format
        });
    });
})
