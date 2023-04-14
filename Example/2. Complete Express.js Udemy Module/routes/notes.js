const express = require('express')
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {
    res.send(`
    <html>
        <head>
            <title>Notes</title>
        </head>
        <body>
            <div>
                Listing all notes: 
                <ul>
                    <li>1st Jan 2023</li>
                    <li>2nd Jan 2023</li>
                    <li>3rd Jan 2023</li>
                    <li>4th Jan 2023</li>
                    <li>5th Jan 2023</li>
                    <li>6th Jan 2023</li>
                </ul>
            </div>

            <div>
                <form action="/notes/add" method="POST">
                    <input type="text" name="note" />
                    <button type="submit">Submit</button>
                </form>
            <div>
        </body>
    </html>
    `);
})

router.post("/add", (req, res, next) => {
    res.send("Added Note Successfully : "+ req.body.note);
})


module.exports = router