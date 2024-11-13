import express from 'express';

import { obtenerSuperHeroePorIdController,obtenerTodosLosSuperHeroesController ,obtenerSuperHeroesMayoresDe30Controller, buscarSuperheroesPorAtributoController } from '../controllers/superHeroesController.mjs';

const router = express.Router();


router.get('/heroes', obtenerTodosLosSuperHeroesController);
router.get('/heroes/mayores30', obtenerSuperHeroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperHeroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);


export default router;