import { leerSuperheroes, agregarSuperheroes } from "./utils.mjs";

const original = './superheroes.txt';
const nuevo ='./agregarSuperheroes.txt';

agregarSuperheroes(original, nuevo);

const superheroes = leerSuperheroes('./superheroes.txt');
console.log('Superhéroes ordenados:');
console.log(superheroes);