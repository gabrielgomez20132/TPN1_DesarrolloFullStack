import express from 'express';

import { obtenerSuperHeroePorIdController,obtenerTodosLosSuperHeroesController ,obtenerSuperHeroesMayoresDe30Controller, buscarSuperheroesPorAtributoController ,
         insertarSuperHeroesController, editarSuperHeroesController , eliminarSuperHeroesController, eliminarByNameSuperHeroesController, mostrarFormularioAgregar, agregarSuperHeroe,  mostrarFormularioEditar, actualizarSuperHeroe, eliminarSuperHeroesControllerMvc,
         obtenerCountriesController, insertarPaisController , obtenerTodosLosPaisesController} from '../controllers/superheroesController.mjs';

import { validarSuperheroe } from '../validators/superheroeValidator.mjs'; // Importar el validador

const router = express.Router();


/* router.get('/heroes', obtenerTodosLosSuperHeroesController);
router.get('/heroes/mayores30', obtenerSuperHeroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperHeroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController); */

//endpoint Sprint3 con validaciones
/* router.post('/heroes', validarSuperheroe ,insertarSuperHeroesController); */
router.put('/heroes/edit/:id', validarSuperheroe ,editarSuperHeroesController);
router.delete('/heroes/delete/:id', eliminarSuperHeroesController);
router.delete('/heroes/deleteByName/:name', eliminarByNameSuperHeroesController);

//rutas para el practico 3 con vista html

// Ruta para mostrar el formulario de agregar superhéroe
//router.get('/heroes/agregar', mostrarFormularioAgregar);
// Ruta para manejar la creación del superhéroe
//router.post('/heroes', agregarSuperHeroe);


// Ruta para mostrar el formulario de edición
router.get('/heroes/:id/editar', mostrarFormularioEditar);
// Ruta para actualizar el superhéroe
router.post('/heroes/:id/editar', actualizarSuperHeroe);
router.delete('/heroes/:id', eliminarSuperHeroesControllerMvc);


//Api
router.get('/paises', obtenerTodosLosPaisesController);

// Paises
router.get('/countries', obtenerCountriesController);  // Mostrar todos los PAISES
router.get('/countries/agregar', mostrarFormularioAgregar);
router.post('/countries', validarSuperheroe, insertarPaisController);  // Agregar un país
router.get('/countries/:id/editar', mostrarFormularioEditar);
router.post('/countries/:id/editar',validarSuperheroe , actualizarSuperHeroe);
router.delete('/countries/:id', eliminarSuperHeroesControllerMvc);





export default router;