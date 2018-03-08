const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser");
const sql = require("mssql");
const multer = require('multer')
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;
const uuidv4 = require('uuid/v4');
const nodemailer = require("nodemailer");


const app = express();

const port = process.env.PORT || 8888;

const azureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=syafiq;AccountKey=7aB73YrNVmF67Pq4ypy4gq2GGqB7bAP8i4FkZ2Er1CV8Vb6ZVTcja3n3FFC2RJ+fQZ8cFAfscfOo6HHgQpjK/w==;EndpointSuffix=core.windows.net',
    accessKey: '7aB73YrNVmF67Pq4ypy4gq2GGqB7bAP8i4FkZ2Er1CV8Vb6ZVTcja3n3FFC2RJ+fQZ8cFAfscfOo6HHgQpjK/w==',
    accountName: 'syafiq',
    containerName: 'unimy-odl',
    containerAccessLevel: 'blob',
    urlExpirationTime: 60
});
 
const upload = multer({
    storage: azureStorage
});

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

var ICCopy = '';
var payslip = '';

app.get('/get-data', function (req, res) {

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

app.post('/post-data', function (req, res) {

        let queryStr ='';

        //get the applicant info
        //id = uuidv4();
        var generator = new IDGenerator();
        let id = generator.generate();
        console.log('Generated id: ',id);
        let name = req.body.name;
        let ic = req.body.ic;
        let nationality = req.body.nationality;
        let dob = req.body.dob;
        let gender = req.body.gender;
        let address = req.body.address;
        let postcode = req.body.postcode;
        let negeri = req.body.negeri;
        let phone = req.body.phone;
        let email = req.body.email;


        let tax = '';
        let epf = '';
        let occupation = '';
        let gross = '';
        let nett = '';
        let dependants = '';

        //attachment data
        ICCopy = req.body.iccopy;
        payslip = req.body.payslip;

        if (req.body.kinname != ''){

            let kinname = req.body.kinname;
            let relationship = req.body.relation;
            let kinnationality = req.body.kinnat;
            let kinic = req.body.kinic;
            let kinaddress = req.body.kinadd;
            let kinpostcode = req.body.kinpost;
            let kinnegeri = req.body.kinstate;
            let kinphone = req.body.kinphone;
            let kinemail = req.body.kinmail;

            tax = req.body.kintax;
            epf = req.body.kinepf;
            occupation = req.body.kinoccu;
            gross = req.body.kingross;
            nett = req.body.kinnett;
            dependants = req.body.kindepend;
            
            queryStr = `Insert into Applicants (ApplicantID,ApplicantName,ApplicantIC,
                ApplicantNationality,DateOfBirth,ApplicantGender,ApplicantAddress,
                ApplicantPostCode,ApplicantState,ApplicantPhoneNumber,ApplicantEmail,IC_url,Payslip_url) values (
                    ${id},'${name}',${ic},'${nationality}','${dob}','${gender}','${address}',
                    ${postcode},'${negeri}',${phone},'${email}','${ICCopy}','${payslip}') 
                Insert into Kins (ApplicantID,KinName,Relationship,KinNationality,KinIC,KinAddress,
                KinPostCode,KinState,KinPhoneNumber,KinEmail) values (${id},'${kinname}','${relationship}',
                '${kinnationality}',${kinic},'${kinaddress}',${kinpostcode},'${kinnegeri}',${kinphone},'${kinemail}')
                Insert into Workings (ApplicantID,TaxNo,EpfNo,Occupation,GrossSalary,NettSalary,NoOfDependant) values 
                (${id},${tax},${epf},'${occupation}',${gross},${nett},${dependants})`;

        }else{
            tax = req.body.tax;
            epf = req.body.epf;
            occupation = req.body.occupation;
            gross = req.body.gross;
            nett = req.body.nett;
            dependants = req.body.depend;

            queryStr = `Insert into Applicants (ApplicantID,ApplicantName,ApplicantIC,
                ApplicantNationality,DateOfBirth,ApplicantGender,ApplicantAddress,
                ApplicantPostCode,ApplicantState,ApplicantPhoneNumber,ApplicantEmail,IC_url,Payslip_url) values 
                (${id},'${name}',${ic},'${nationality}','${dob}','${gender}','${address}',${postcode},'${negeri}',${phone},'${email}','${ICCopy}','${payslip}') 
                Insert into Workings (ApplicantID,TaxNo,EpfNo,Occupation,GrossSalary,NettSalary,NoOfDependant) values 
                (${id},${tax},${epf},'${occupation}',${gross},${nett},${dependants})`;
        }

        // connect to your database
        sql.connect(config, function (err) {
        
            if (err) console.log(err);
    
            var transaction = new sql.Transaction();
           
            transaction.begin().then(function () {
                
                var request = new sql.Request(transaction);
                
                //outer query
                request.query(queryStr)
                    .then(function () {
                           
                        transaction.commit().then(function (recordSet) {
                            //sendEmail();
                            sql.close();
                        }).catch(function (err) {
                            
                            console.log("Error in Transaction Commit " + err);
                            sql.close();
                        });

                    }).catch(function (err) {
        
                        console.log("Error in Outer Transaction Begin " + err);
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

app.post('/upload_attachment', upload.array('pdfs',2), (req, res, next) => {
    console.log('Attachment FILE:',req.files);
    res.status(200).json(req.files);
});

function sendEmail(){
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'syain10@gmail.com', 
            pass: '' 
        }
      });
      
      var mailOptions = {
        from: 'syain10@gmail.com',
        to: 'syafiq.suhaimi@prestariang.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        attachments: [
            {
                filename: 'IC_COPY.pdf',
                path: ICCopy,
                contentType: 'application/pdf'
            },
            {   // binary buffer as an attachment
                filename: 'PAYSLIP_COPY.pdf',
                path: payslip,
                contentType: 'application/pdf'
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

function IDGenerator() {
    
        this.length = 8;
        this.timestamp = +new Date;
        
        var _getRandomInt = function( min, max ) {
           return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
        }
        
        this.generate = function() {
            var ts = this.timestamp.toString();
            var parts = ts.split( "" ).reverse();
            var id = "";
            
            for( var i = 0; i < this.length; ++i ) {
               var index = _getRandomInt( 0, parts.length - 1 );
               id += parts[index];	 
            }
            return id;
        }    
}

app.listen(port, () => console.log(`Listening on port ${port}`)); 