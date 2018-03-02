const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser");
const sql = require("mssql");
const nodemailer = require("nodemailer");

const app = express();

const port = process.env.PORT || 8888;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
                console.log(err);
                sql.close();
            }

            // send records as a response
            res.send(recordset);
            sendEmail();
            sql.close();
        });
    });
});

app.post('/post-student', function (req, res) {
        
    if(req.body != null) {
        console.log('data',req.body);
        return;
    }
        
    //get the data from client
        let id = req.body.studentid;
        let name = req.body.studentname;
        let email = req.body.studentemail;
        // var user_name=req.body.user;
        // var password=req.body.password;
        // console.log("User name = "+user_name+", password is "+password);

        

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
                request.query(`Insert into Students (StudentID,StudentName,StudentEmail) values (${id},'${name}','${email}')`)
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
        res.end();
});

function sendEmail(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'syafiq.suhaimi@gmail.com',
          pass: 'Syafiq010'
        }
      });
      
      var mailOptions = {
        from: 'syafiq.suhaimi@gmail.com',
        to: 'syain@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        attachments: [
            {
                filename: 'text1.txt',
                content: 'hello world!'
            },
            {   // binary buffer as an attachment
                filename: 'text2.txt',
                content: new Buffer('hello world!','utf-8')
            }
        ]
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

app.listen(port, () => console.log(`Listening on port ${port}`)); 