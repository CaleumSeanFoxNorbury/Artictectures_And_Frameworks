"use strict"
const mongoose = require("mongoose")
const User = require("./../../models/Accounts/User")
    
const documentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: false
    },
    sharedUsers:{
        type: Array,
        required: false
    },
    uploadedDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    documentCover:{
        type: String
    },
    file: {
        type: String
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
    openedBy: {
        type: String,
        required: false
    },
    // HOW THE ATTRIBUTE SETUP SHOULD BE IF SESSIONS WAS ENABLED
    // openedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false, 
    //     ref: 'User'
    // },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    }
})

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;