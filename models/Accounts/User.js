";use strict";
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
username: {
type: String,
required: true,
lowercase: true,
unique: true
},
email: {
    type: String,
    required: false,
    lowercase: true,
    unique: true
},
password: {
type: String,
required: true
},
accountType:{
type: String,
required: true
},
loggedInStatus:{
    type: Boolean,
    required: true
},
authenticationToken:{
    type: String,
    reauired: true
},
dateCreated:{
type: Date,
required: true,
default: Date.now 
} 
});

module.exports =  mongoose.model('User', UserSchema)