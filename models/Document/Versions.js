"use strict"
const mongoose = require("mongoose")
   
const versionSchema = new mongoose.Schema({
    versionId:{
        type: String,
        required: true
    },
    documentTitle:{
        type: String,
        required: true
    },
    savedBy: {
        type: String,
        default: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    document:{
        type: String,
        required: false
    },
})

const Version = mongoose.model('Version', versionSchema);

module.exports = Version;