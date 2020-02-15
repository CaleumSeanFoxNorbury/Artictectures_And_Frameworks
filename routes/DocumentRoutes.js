const express = require("express");
const router = express.Router()
const Document = require('../models/Document/Document')
const mongo = require("mongodb").MongoClient;

router.get('/', function(req, res){
    try{
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

router.post('/single/:title', (req, res) => {
    let docTitle = req.body.title.title;
    try{
        mongo.connect(process.env.dbURL, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("AAFAssignmentdb");
            dbo.collection("uploads").findOne({ "title": docTitle })
            .then(doc => {
                res.send(doc);
            });
        });
    }catch{
        console.log("Error: ", "Failed finding a document!");
    }
});

router.post('/upload', (req, res) => {
    let date = new Date();
    try{
        mongo.connect(process.env.dbURL, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            document = new Document({ 
                title: req.body.documentTitle,
                type: req.body.documentType,
                public: req.body.public,
                sharedUsers: req.body.sharedUsers,
                uploadedDate: req.body.uploadDate,
                documentCover: req.body.documentCover,
                openedBy: '',
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

router.post('/open/update', (req, res) => { 
    var title = req.body.title.title;
    var user = req.body.user;
    
    try{
        mongo.connect(process.env.dbURL, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("AAFAssignmentdb");

            var query = {"title": title};
            var newValues = { $set: {isOpen: true, openedBy: user} };
            dbo.collection("uploads").updateOne(query, newValues, function(err, res){
                if(err) throw err;
                console.log("Document Updated:", title);
            });
        });
    }catch{
        console.log("Error: ", "Failed finding a document!");
    }
});

router.post('/close/update', (req, res) => { 
    var title = req.body.title;
    var openedBy = req.body.openedBy;
    try{
        mongo.connect(process.env.dbURL, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("AAFAssignmentdb");

            var query = {"title": title};
            var newValues = { $set: {isOpen: false, openedBy: ""} };
            dbo.collection("uploads").updateOne(query, newValues, function(err, res){
                if(err) throw err;                
                saveVersions(title, openedBy);                
                console.log("Document Updated:", title);
            });
        });
    }catch{
        console.log("Error: ", "Failed finding a document!");
    }
});

function saveVersions(t, openedBy){
    try{
        mongo.connect(process.env.dbURL, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;            
            var dbo = db.db("AAFAssignmentdb");
            dbo.collection("uploads").findOne({"title": t}, function(err, result) {
                if (err) throw err;      
                const Version = {
                    versionId: result._id,
                    documentTitle: result.title,
                    savedBy: openedBy,
                    document: "Todo"
                }
                dbo.collection("versions").insertOne(Version, function(err, res) {
                    if (err) throw err;
                    console.log("Version has been saved");
                });
            });
        }); 
    }catch{
        console.log("failed");
    }
}

module.exports = router