import express from 'express';

import { obtenerSuperHeroePorIdController,obtenerTodosLosSuperHeroesController ,obtenerSuperHeroesMayoresDe30Controller, buscarSuperheroesPorAtributoController ,
         insertarSuperHeroesController, editarSuperHeroesController , eliminarSuperHeroesController, eliminarByNameSuperHeroesController} from '../controllers/superHeroesController.mjs';

const router = express.Router();


router.get('/heroes', obtenerTodosLosSuperHeroesController);
router.get('/heroes/mayores30', obtenerSuperHeroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperHeroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//endpoint Sprint3
router.post('/heroes', insertarSuperHeroesController);
router.put('/heroes/edit/:id', editarSuperHeroesController);
router.delete('/heroes/delete/:id', eliminarSuperHeroesController);
router.delete('/heroes/deleteByName/:name', eliminarByNameSuperHeroesController);

export default router;