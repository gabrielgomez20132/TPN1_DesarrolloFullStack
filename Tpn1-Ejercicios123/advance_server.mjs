import http from 'http';
import url from 'url';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUr1	= url.parse(req.url, true);
    const pathName = parsedUr1.pathname;
    const method = req.method;

    if( pathName === '/' && method === 'GET' ){
        res.statusCode = 200;
        res.setHeader ('Content-Type', 'Text/plain');
        res.end('Pagina de inicio\n');

    }else if(pathName === '/about' && method === 'GET'){

        res.statusCode = 200;
        res.setHeader ('Content-Type', 'Text/plain');
        res.end('Acerca de nosotros\n');

    }else if(pathName === '/data' && method === 'POST'){
            
        let body = '';
        // Recolectamos los datos enviados en el cuerdo de la request
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.statusCode = 200;
            res.setHeader ('Content-Type', 'Text/plain');
            res.end('Datos recibidos: &{body}\n');
        
        
        });

    }else{
            res.statusCode = 404;
            res.end('Ruta no entrada\n');
        
    }


});

server.listen(port, hostname , () => {
    console.log(`Servidor Corriendo en http://${hostname}:${port}/`);

});

