
//importacion de services y views

import { obtenerSuperheroes, obtenerSuperheroePorId, agregarSuperheroe , actualizarSuperheroe, 
        eliminarSuperheroe, buscarSuperheroesPorAtributo, 
        obtenerSuperheroesMayoresDe30YconFiltros } from '../services/superheroesService.mjs'

import { renderizarSuperHeroe, renderizarListaSuperheroes } from '../views/responseView.mjs'


//All
export function obtenerTodosSuperheroes(req, res){
    const superheroes = obtenerSuperheroes();
    res.send(renderizarListaSuperheroes(superheroes));
}

//Id
export function obtenerSuperheroePorIdController(req, res){
    const { id } = req.params;
    const superheroe = obtenerSuperheroePorId(parseInt(id));

    if(superheroe){
        res.send(renderizarSuperHeroe(superheroes));
    }else{
        res.status(404).send({mensaje: 'Superheroe no encontrado'})
    }
}
