const http = require('http');

const server = http.createServer((req, res) => {
    url = req.url;
    method = req.method;

    if(url==='/input') {
        html = `
            <html>
                <header>
                    <title>Input</title>
                </header>
                <body>
                    <form action="/submit" method="POST">       
                        <input type="text" name="input" />
                        <input type="submit" value="submit" />
                    </form>
                </body>
            </html>
        `
        // form with get method sends input as request parameters
        // form with post method sends input as form data
        res.write(html);
        return res.end();
    }

    if (url==='/submit') {
        const data = []

        req.on("data", (chunk) => {
            data.push(chunk)
        })

        req.on("end", () => {
            input = Buffer.concat(data).toString();
            console.log(input);
        })

        res.statusCode = '302';
        res.setHeader("Location", "/input");
        return res.end();
    }

    res.setHeader('Content-Type','text/html');
    res.write("<html><header><title>Server</title><header><body>Hello World !!!</body></html>");
    res.end();
})

server.listen(3000);