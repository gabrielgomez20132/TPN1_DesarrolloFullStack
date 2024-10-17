import fs from 'fs';

fs.readFile('./data/ejemplo.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err.message);
        return;
    }
    console.log('Contenido del archivo:', data);
    
    // Solo escribir y renombrar después de leer
    fs.writeFile('./data/newFile.txt', 'Contenido nuevo', (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err.message);
            return;
        }
        console.log('Archivo creado y escrito');

        // Renombrar después de que el archivo se haya creado
        fs.rename('./data/newFile.txt', './data/renamedfile.txt', (err) => {
            if (err) {
                console.error('Error al renombrar el archivo:', err.message);
                return;
            }
            console.log('Archivo renombrado');
        });
    });
});