const express = require("express");
const app = express();
const router = express.Router();
const mongo = require("mongodb").MongoClient;

router.get('/', (req, res) =>{ 
    res.json({
        SessionStatus: true
    })

    //code for sessions | if and when fixed issue.
    // if(!req.session.login){
    //     res.json({ 
    //         SessionStatus: false
    //     });
    // }else if(req.session.login){
    //     res.json({ 
    //         SessionStatus: true
    //     });
    // }
});


module.exports = router