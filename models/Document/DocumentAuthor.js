const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Author', authorSchema)