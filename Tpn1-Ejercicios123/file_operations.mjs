import fs from 'fs'


const data = 'Esto es un texto de ejemplo.\n'

fs.writeFile('ejemplo.txt', data , (err) => {
    if (err) throw err;
    console.log('El archivo ha sido guardado');
   
});


fs.readFile('ejemplo.txt', 'utf-8' , (err , content) => {
    if (err) throw err;
    console.log('Contenido del archivo');
    console.log(content);
});


