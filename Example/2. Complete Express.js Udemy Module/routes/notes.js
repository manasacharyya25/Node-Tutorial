const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const rootDir = require('../util/paths');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {
    res.sendFile(path.join(rootDir,"views", "notes.html"))
})

router.post("/add", (req, res, next) => {
    res.send("Added Note Successfully : "+ req.body.note);
})


module.exports = router