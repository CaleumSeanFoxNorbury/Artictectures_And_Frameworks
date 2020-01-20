const express = require('express')
const router = express.Router()
const Document = require('../models/Document/Document')

//All document route 
router.get('/', async (req, res) => {
    res.render("pages/documents/documentIndex")
})

//New document route 
router.get('/new', async (req, res) => {
    res.render("pages/documents/createDocument")
})

//more like delete and so on 

module.exports = router