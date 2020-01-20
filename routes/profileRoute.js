const express = require('express')
const app = express()
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongo = require("mongodb").MongoClient, dbURL = "mongodb://localhost:27017", database = "AssignmentDB";
app.use(express.urlencoded({ extended: false }))

router.get('/', (req, res) => {
    res.render("pages/account/accountIndex", { profileIndexRouter: 'profileRouter' })
})

//register user
router.get('/register', (req, res) => {
    res.render("pages/account/register")
})
router.post('/register', (req, res) => {
    try{
        //const hashedPassword = bcrypt.hash(req.body.password, 10)
        var datetime = new Date();
        // mongo.users.insert({
        //     username: req.body.name,
        //     email: req.body.email,
        //     password: hashedPassword,
        //     accountType: "USER"
        // });
        console.log("User created", " at ", datetime);
        res.render('pages/account/login');
    }catch{
        res.render('pages/account/register');
    }
})

//login user
router.get('/login', (req, res) => {
    res.render("pages/account/login")
})
router.post('/login', (req, res) => {
    //needs doing..  
})

module.exports = router