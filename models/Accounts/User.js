";use strict";;
const mongoose = require("mongoose"),
{ Schema } = mongoose,
userSchema = new Schema(
{
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
dateCreated:{
type: Date,
required: true,
default: Date.now }
} );

module.exports = mongoose.model('User', userSchema)