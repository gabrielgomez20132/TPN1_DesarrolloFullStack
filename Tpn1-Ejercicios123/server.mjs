import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader ('Content-Type', 'Text/plain');

    res.end('hola Mundo')

});

server.listen(port, hostname , () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);

});