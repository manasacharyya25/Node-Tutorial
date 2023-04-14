# Steps to create a Node.js Server with Express.js 

1. npm init: Provide Package Details. Creates a json package
2. `npm install nodemon -g` : Globally Install Nodemon
3. Modify npm scripts in package json to use nodemon
4. Create app.js with following content 
    `

        const http = require('http');

        const server = http.createServer((req, res) => {
            res.write(`
                        <html>
                            <h1>Hello World !</h1>
                        </html>
                        `);
            res.end();
        })

        server.listen(3000); 
    
5. Run using npm start. Should start the application with auto-restart enabled by Nodemon 

6. Install Express.js dependency and add it to production dependencies list using flag `--save ` 

    ` npm install express --save `

7. Modify app.js to use Express module 
    `
        
        const express = require('express');
        const app = express();

        app.use((req, res, next) => {
        res.send(`
            <html>
                <h1>Hello World From Express!</h1>
            </html>
            `);
        res.next();
        })

        app.listen(3000)

### 8.  Routing 

1.  For routing we can introduce a directory called as routes and add js files for each route. 

2. Inside a route file, we **create, define and export** a route.

`

    const express = require('express')

    const router = express.Router();

    router.get("/", (req, res, next) => {
        res.send(`<h1>Listing all notes</h1>`);
    })

    module.exports = router

3. In app.js we import this route and add it to middleware in desired order

`

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

### 9.  Handling Different HTTP Methods

1. We can use `get()`, `post()`, `del()`, `put()` methods provided by express to limit HTTP methods on a particular endpoint

`

    const express = require('express')
    const router = express.Router();

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
        res.send("Added Note Successfully");
    })


    module.exports = router

### 10. Parse Incoming Request Body using `body-parser`

1. Install body-parser package and add it to top of the middleware chain 
`npm install body-parser --save`

`

    const bodyParser = require("body-parser");

    app.use(bodyParser.urlencoded({extednded: false}));



### 11. Serving HTML Files

1. HTML Files can be located in a `views` folder and can be accessed in the app as 

` 

    const path = require('path');

    res.sendFile(path.join(rootDir,"views", "notes.html"))



### 12. Serving Files Statically

1. This basically means to allow files in the file system to be accessed in our app. For eg stylesheets or js files in the html files, without any security authentication

2. Introduce a public folder that contains files to be available statically

3. In app.js specify static folder as 

    ` app.use(express.static("public")); `



