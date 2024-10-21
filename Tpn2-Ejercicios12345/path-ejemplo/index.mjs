import path from 'path';

const filePath = './data/example.txt';

const dirName = path.dirname(filePath);
console.log('Directorio base:', dirName);

const baseName = path.basename(filePath, '.txt');
console.log('Nombre del archivo:', baseName);

const newPath = path.join('/user', 'docs', 'newfile.txt');
console.log('nueva Ruta:', newPath);

