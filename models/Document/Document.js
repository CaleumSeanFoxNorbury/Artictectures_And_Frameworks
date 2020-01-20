const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    date:{
        type: Date,
        required: true
    },
    catagory:{
        type: String
    },
    pageCount:{
        type: Number,
        required: true
    },
    uploadedDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    documentCover:{
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'Author'
    }
})