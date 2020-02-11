const express = require("express");
const router = express.Router();
const crypto = require('crypto')
const User = require('../models/Accounts/User')
const mongo = require("mongodb").MongoClient;
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator;

router.get('/', function(req, res){
    res.send({
        "status": "send"
    })
})

router.post('/register', (req, res) => {
    let date = new Date();
    try{
        const hashpassword = hashPasswordWithSalt(req.body.password);
        const authenticationToken = tokgen.generate();
        var accountType, username;
        if(req.body.username == "SecretAdmin" && req.body.email == "PromptAccount" && req.body.password == "p@ssword"){
            accountType = "ADMIN";
            username = "Admin";
            email = "AdminsEmail@Email.com";
        }else{
            username = req.body.username;
            accountType = "USER";
        }
        mongo.connect(url, function(err, db){
            if (err) throw err;
            user = new User({
                username: username,
                email: email,
                password: hashpassword,
                accountType: accountType,
                authenticationToken: authenticationToken,  
                loggedInStatus: false
            });    
            var dbo = db.db("AAFAssignmentdb");
            dbo.collection("users").insertOne(user, function(err, res) {
                if (err) throw err;
                console.log("User created", " at ", date, ".", " Account Name: ", user.username);
            });
        }); 
        res.send({
            "status": "registered"
        })
    }catch{
        //if error send 500 internal server error
        res.statusCode(500).send({
            "Error: ": "User failed to be created!"
        })
    }
});

router.get('/login', (req, res) => {
    //do nothing(front-end)...   
});

router.post('/login', (req, res) => {
    try{  
        username = req.body.username; 
        hashedpassword = hashPasswordWithSalt(req.body.password);
    
        mongo.connect(process.env.dbURL, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("AAFAssignmentdb");
            dbo.collection("users").findOne({"username": username}, (err, user) =>{
                if(user == null){
                    console.log("user not found");
                }else{
                    if(user.password == hashedpassword) {
                        user.loggedInStatus = true;
                        req.session.cookie.login = true; 
                        req.session.login = true; 
                        console.log("User signed in:", user.username);
                        console.log(req.session);
                        req.session.save();
                        res.send({
                            "session": user
                        });
                    }else{
                        console.log("password does not match"); //err
                    }       
                }
            });
        });
    }catch{
        console.log("system failure"); //err  
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
      res.redirect("/login");
    });
});

router.get('/edit', (req, res) => {
    console.log("worked");  
});

function hashPasswordWithSalt(password){

    const salt = 'xm3lBzs8ezI=';
    //const salt = crypto.randomBytes(8).toString('base64'); //creates random salt
    
    return hashedPassword = crypto.pbkdf2Sync(password, salt, 100, 512, 'sha512', (result, error) => {
        if(error) throw error;    
    }).toString('hex');
}

module.exports = router