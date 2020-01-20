"use strict";

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

const port = 3000;

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use(express.json()) //Json

const mongoose = require('mongoose')
mongoose.connect(process.env.dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true //may not need this  
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

//--Routes---
const usersController = require("./controllers/Accounts/UserController")

const indexRouter = require('./routes/index') 
const profileRouter = require('./routes/profileRoute')
const documentRouter = require('./routes/documentRoutes')
const publicDocumentsRoutes = require('./routes/publicDocumentRoutes')
//-----------

const mongo = require("mongodb").MongoClient,
dbURL = "mongodb://localhost:27017",
database = "AssignmentDB";

mongo.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
})

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use('/', indexRouter)
app.use('/user', profileRouter)
app.use('/skydocs/documents', documentRouter)
app.use('/skydocs/public/documents', publicDocumentsRoutes)

app.listen(process.env.PORT || 3000)    //another port | hmm?..

// function DemoApplication(){
//     SeedDefaultDocuments();
// }

// function SeedDefaultDocuments(){
//     // db.collection("DefaultSeedingDocuments").insertOne(
//     //     {
//     //         Title: "Default Document One",
//     //         DocumentCode: "4456778",
//     //         Author: {
//     //             Name: "Caleum Sean Fox Norbury",
//     //             email: "blank@blank.com",
//     //         },
//     //         DocuemntType: "Seeding document",
//     //         DocumentDate: "12/12/2019",
//     //         Catagory: "Depevement Document"
//     //     }
//     // );
// }

// function findAllRecordsInCollectionDeaultDocuments(){
//     // db.collection("DefaultSeedingDocuments")
//     // .find()
//     // .toArray((error, data) => {
//     // if (error) throw error;
//     // console.log(data);
//     // });
// }
