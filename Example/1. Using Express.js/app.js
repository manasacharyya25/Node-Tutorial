const express = require('express');
const fs = require('fs');

const app =  express();

app.use("/success", (req, res, next) => {
    let content = `
        <html>
            <head>
                <title>Success</title>
            </head>
            <body>
                <h1>Submitted Successfully</h1>

                <form action="/">
                    <button type="submit">Submit Another</submit>
                </form>
            </body>
        </html>
    `
    res.send(content);
})

app.use("/submit", (req, res, next) => {
    let data = []
    // Now to get the submitted message and 
    //1. Get chunk
    req.on("data", (chunk) => {
        data.push(chunk);
    })

    //2.BufferReader to read chunk and set it to array
    req.on("end", () => {
        let msg = Buffer.concat(data).toString();
        let finalMsg = Date.now().toLocaleString()+":"+msg.split("=")[1]+"\n";

        //Save to text file
        fs.appendFile("Messages.txt", finalMsg, () => {
            res.redirect("/success");
        })
    })
})


app.use("/", (req, res, next) => {
    let content = `
        <html>
            <head>
                <title>Startup Page</title>
            <head>
            <body>
                <h1>Welcome to ExpressJs App</h1>

                <p>Here you can input text and have it stored in a text file</p>
                
                <form action="/submit" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `
    res.send(content);
})


app.listen(3000);