const express = require('express');
const app = express();

const sql = require("mssql");

// config for your database
const config = {
    user: 'syafiq',
    password: 'Password010',
    server: 'syafiqserver.database.windows.net', 
    database: 'UnimyDB', 

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};


app.get('/get-student', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM Students', function (err, recordset) {
            
            if (err) {
                console.log(err)
                sql.close();
            }

            // send records as a response
            res.send(recordset);
            sql.close();
        });
    });
});

app.get('/post-student', function (req, res) {
    
        // connect to your database
        sql.connect(config, function (err) {
        
            if (err) console.log(err);
    
                //4.
            var transaction = new sql.Transaction();
            //5.
            transaction.begin().then(function () {
                //6.
                var request = new sql.Request(transaction);
                //7.
                request.query("Insert into Students (StudentID,StudenttName,StudentEmail) values (3,'Razak','razak@educloud.com')")
            .then(function () {
                    //8.
                    transaction.commit().then(function (recordSet) {
                        console.log(recordSet);
                        sql.close();
                    }).catch(function (err) {
                        //9.
                        console.log("Error in Transaction Commit " + err);
                        sql.close();
                    });
                }).catch(function (err) {
                    //10.
                    console.log("Error in Transaction Begin " + err);
                    sql.close();
                });
                
            }).catch(function (err) {
                //11.
                console.log(err);
                dbConn.close();
            });
        });
});

const server = app.listen(5000, function () {
    console.log('Server is running..');
});

//1.
function insertRow() {
    //2.
    var dbConn = new sql.Connection(config);
    //3.
    dbConn.connect().then(function () {
        
    }).catch(function (err) {
        //12.
        console.log(err);
    });
}

// const express = require('express');

// const app = express();
// const port = process.env.PORT || 5000;

// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));