const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;


    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Segunda Pagina!!!</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Enviar</button></form></body>');
        res.write('</html>');
        return res.end();
    }


    if(url === '/message' && method === 'POST') {

        const body = [];
        req.on('data',(chunck) => {
            console.log(chunck);
            body.push(chunck);
        });

        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
    }

    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Primeira Pagina</title></head>');
    res.write('<body><h1>Primeira pagina Node</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);