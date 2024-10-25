import express from 'express'
import {obtenerTodosSuperheroes, obtenerSuperheroePorIdController, agregarNuevoSuperheroe,
        actualizarSuperheroePorId, eliminarSuperheroesPorId, buscarSuperheroesPorAtributoController,
        obtenerSUperheroesMayorDe30YConFiltrosController} from './controllers/superheroesController.mjs'

const app = express();
app.use(express.json());

const port = 3005;


//routing
app.get('/superheroes', obtenerTodosSuperheroes);
app.get('/superheroes/id/:id', obtenerSuperheroePorIdController);
app.post('/superheroes', agregarNuevoSuperheroe);
app.put('/superheroes/:id', actualizarSuperheroePorId);
app.delete('/superheroes/:id', eliminarSuperheroesPorId);
app.get('/superheroes/atributo/:atributo/:valor', buscarSuperheroesPorAtributoController);
app.get('/superheroes/filtros', obtenerSUperheroesMayorDe30YConFiltrosController);


//puerto donde corre
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});