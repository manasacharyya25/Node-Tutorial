const express = require('express');
const notes_app = require('./routes/notes');

const app = express();
app.use("/notes", notes_app);

app.use((req, res, next) => {
    res.send(`
            <html>
                <h1>Hello World From Express!</h1>
            </html>
            `);
    next();
})

app.listen(3000)