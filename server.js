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
        
        let kinname = '';
        let relationship = '';
        let kinnationality = '';
        let kinic = '';
        let kinaddress = '';
        let kinpostcode = '';
        let kinnegeri = '';
        let kinphone = '';
        let kinemail = '';

        //attachment data
        let ICCopy = req.body.iccopy;
        let payslip = req.body.payslip;

        if (req.body.kinname != ''){

             kinname = req.body.kinname;
             relationship = req.body.relation;
             kinnationality = req.body.kinnat;
             kinic = req.body.kinic;
             kinaddress = req.body.kinadd;
             kinpostcode = req.body.kinpost;
             kinnegeri = req.body.kinstate;
             kinphone = req.body.kinphone;
             kinemail = req.body.kinmail;

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

        let app_data = {
          "id" : id,
          "name" : name,
          "ic" : ic,
          "nationality" : nationality,
          "dob" : dob,
          "gender" : gender,
          "address" : address,
          "postcode" : postcode,
          "negeri" : negeri,
          "phone" : phone,
          "email" : email,
          "epf" : epf,
          "tax" : tax,
          "occupation" : occupation,
          "gross" : gross,
          "nett" : nett,
          "dependants" : dependants,
          "kinname" :kinname,
          "relationship" : relationship,
          "kinnationality" : kinnationality,
          "kinic" : kinic,
          "kinaddress" : kinaddress,
          "kinpostcode" : kinpostcode,
          "kinnegeri" : kinnegeri,
          "kinphone" : kinphone,
          "kinemail" : kinemail,
          "ICCopy" : ICCopy,
          "payslip" : payslip,
        };

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
                            sendEmail(app_data);
                            console.log("STORE DATABASE SUCCESS");
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

function sendEmail(app_data){
    let content ='';
    if(app_data.kinname != ''){
       content = `<h2>Applicant ID: ${app_data.id}</h2><h3>Personal Information</h3><p>Name: ${app_data.name}</p><p>IC No: ${app_data.ic}</p><p>Nationality: ${app_data.nationality}</p><p>Date of birth: ${app_data.dob}</p><p>Gender: ${app_data.gender}</p><p>Address: ${app_data.address}</p><p>Postcode: ${app_data.postcode}</p><p>State: ${app_data.negeri}</p><p>Phone No: ${app_data.phone}</p><p>Email: ${app_data.email}</p><p>Working status: Not Working</p><hr/><h3>Kin Information</h3><p>Name: ${app_data.kinname}</p><p>Relationship: ${app_data.relationship}</p><p>Nationality: ${app_data.kinnationality}</p><p>IC No: ${app_data.kinic}</p><p>Address: ${app_data.kinaddress}</p><p>Postcode: ${app_data.kinpostcode}</p><p>State: ${app_data.kinnegeri}</p><p>Phone No: ${app_data.kinphone}</p><p>Email: ${app_data.kinemail}</p><hr/><h3>Working Information</h3><p>Tax No: ${app_data.tax}</p><p>EPF No: ${app_data.epf}</p><p>Occupation: ${app_data.occupation}</p><p>Gross Salary: ${app_data.gross}</p><p>Nett Salary: ${app_data.nett}</p><p>No. of Dependants: ${app_data.dependants}<hr/>`;
    }else{
       content = `<h2>Applicant ID: ${app_data.id}</h2><h3>Personal Information</h3><p>Name: ${app_data.name}</p><p>IC No: ${app_data.ic}</p><p>Nationality: ${app_data.nationality}</p><p>Date of birth: ${app_data.dob}</p><p>Gender: ${app_data.gender}</p><p>Address: ${app_data.address}</p><p>Postcode: ${app_data.postcode}</p><p>State: ${app_data.negeri}</p><p>Phone No: ${app_data.phone}</p><p>Email: ${app_data.email}</p><p>Working status: Working</p><hr/><h3>Working Information</h3><p>Tax No: ${app_data.tax}</p><p>EPF No: ${app_data.epf}</p><p>Occupation: ${app_data.occupation}</p><p>Gross Salary: ${app_data.gross}</p><p>Nett Salary: ${app_data.nett}</p><p>No. of Dependants: ${app_data.dependants}<hr/>`;
    }
    var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'support@educloud.my', 
            pass: '3ducl0ud2018!' 
        },
        tls: {
            ciphers: 'SSLv3'
        }
      });
      
      var mailOptions = {
        from: 'support@educloud.my',
        to: 'syafiq.suhaimi@prestariang.com',
        subject: 'New Applicant Registration',
        html: content,
        attachments: [
            {
                filename: 'IC_COPY.pdf',
                path: app_data.ICCopy,
                contentType: 'application/pdf'
            },
            {   // binary buffer as an attachment
                filename: 'PAYSLIP_COPY.pdf',
                path: app_data.payslip,
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