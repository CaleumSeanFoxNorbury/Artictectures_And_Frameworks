"use strict";

const User = require("../../models/Accounts/User");

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    let userParams = {
     username: req.body.username,
      password: req.body.studentPass,
      accountType: req.body.accountType,
      dateCreated: req.body.dateCreated
    };
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },
    redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  }
}
