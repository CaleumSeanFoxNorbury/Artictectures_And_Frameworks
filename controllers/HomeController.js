"use strict";

function index(){

    var title = "Home Page";

    app.get("/Home", (req, res) => {
        res.render(".././views/index/HomePage", {
            title
        });
    });
} 