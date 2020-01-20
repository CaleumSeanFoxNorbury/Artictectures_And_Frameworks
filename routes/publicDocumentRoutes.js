const express = require('express')
const router = express.Router()
const Document = require('../models/Document/Document')

//All document route 
router.get('/', async (req, res) => {
    res.render("pages/documents/publicDocumentIndex")
})

module.exports = router