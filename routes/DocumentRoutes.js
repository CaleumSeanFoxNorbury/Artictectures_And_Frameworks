const express = require("express");
const router = express.Router()
const Document = require('../models/Document/Document')
const mongo = require("mongodb").MongoClient;

router.get('/', function(req, res){
    try{
        console.log("working");
        mongo.connect(process.env.dbURL, { useUnifiedTopology: true }, function(err, db) {
            if (err){
                console.log("Error: ", err);
                throw err;
            } 
            var dbo = db.db("AAFAssignmentdb");
            dbo.collection("uploads").find().toArray()
            .then(docs => {
              res.send(docs)
            });
        });
    }catch{
        res.send({
            "Error": "Documents Connection isnt conncted."
        });
    }
});

router.post('/upload', (req, res) => {
    let date = new Date();
    try{
        mongo.connect(process.env.dbURL, function(err, db) {
            if (err) throw err;
            document = new Document({ 
                title: req.body.documentTitle,
                type: req.body.documentType,
                public: req.body.public,
                sharedUsers: req.body.sharedUsers,
                uploadedDate: req.body.uploadDate,
                documentCover: req.body.documentCover,
                owner: req.session.user
            }); 
            var dbo = db.db("AAFAssignmentdb");
            dbo.collection("uploads").insertOne(document, function(err, res) {
                if (err) throw err;
                console.log("Document created", " at ", date, ".", " Document name: ", document.title);
            });
        }); 
    }catch{
        console.log("failed");
    }
});


module.exports = router