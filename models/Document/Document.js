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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    }
})

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;