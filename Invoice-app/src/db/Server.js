const express = require('express');
// const mysql = require('mysql');
const mysql = require('mysql2');

const app = express();

// Database Connection is here =============================
var dbConnection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "password",
     database: "invoiceapp",
     port: "3306"

});

// var dbConnection = mysql.createConnection({                
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "test_db",
//   port: "3306"

// });
//===========================================================

dbConnection.connect((err) => {
     if (err) {
          throw err
     } else {
          console.log("Database Connected")
     }
})

// app.get('/', function (req, res) {
//      let sql = "SELECT * FROM invoiceapp.invoices";
//      dbConnection.query(sql, function (err, results) {
//           if (err) throw err;
//           res.send(results);

//      })
// })

// Creating Table into the Database ====================================

// dbConnection.query('CREATE TABLE (id INT(255) UNSIGNED AUTO_INCREMENT PRIMARY KEY, billerStreetAddress VARCHAR(255) NOT NULL, billerCity VARCHAR(255) NOT NULL, billerZipCode VARCHAR(255) NOT NULL, billerCountry VARCHAR(255) NOT NULL, customerName VARCHAR(255)  NOT NULL, customerEmail VARCHAR(255) NOT NULL, customerStreetAddress VARCHAR(255) NOT NULL, customerCity VARCHAR(255) NOT NULL, customerZipCode VARCHAR(255) NOT  NULL, customerCountry VARCHAR(255) NOT NULL, invoiceDate VARCHAR(100) NOT NULL, invoiceDateUnix VARCHAR(100) NOT NULL, paymentTerms NOT NULL, paymentDueDateUnix VARCHAR(100) NOT NULL, paymentDueDate VARCHAR(100) NOT NULL, productDescription VARCHAR(255) NOT NULL, invoicePending VARCHAR(255) NOT NULL, invoiceDraft VARCHAR(255) NOT NULL, invoiceItemList VARCHAR(255) NOT NULL, invoiceTotal NUMBER NOT NULL, invoicePaid VARCHAR(255) NOT NULL)',
//      (err, rows) => {
//           if (err) {
//                throw err
//           } else {
//                console.log('Data is Sent BOTS!')
//                console.log(rows)
//           }
//      })

// dbConnection.query('CREATE TABLE tabletesting(id INT(250) UNSIGNED AUTO_INCREMENT PRIMARY KEY, thing VARCHAR(255) NOT NULL)',
// (err, rows) =>{
//      if(err){
//           throw err
//      } else {
//           console.log('Data is Sent BOTS!')
//           console.log(rows)
//      }
// })

//  ====================================================================


// Inserting to the DATABASE ==========================================

// dbConnection.query("INSERT INTO tabletesting(id, thing) VALUES (1, 'The tech in the database')", (err, rows) => {
//      if(err) {
//           throw err
//      } else {
//           console.log('Data is Inserted BOTS! ======')
//           console.log(rows)
//      }
// })

// ======================================================================

const port = process.env.PORT || 8081;
app.listen(port);

console.log('App is Listening on port ' + port)