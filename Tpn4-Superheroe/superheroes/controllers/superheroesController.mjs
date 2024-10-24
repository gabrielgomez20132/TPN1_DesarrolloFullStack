
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
        res.send(renderizarSuperHeroe(superheroe));
    }else{
        res.status(404).send({mensaje: 'Superheroe no encontrado'});
    }
}

export function buscarSuperheroesPorAtributoController(req, res){
    const { atributo , valor } = req.params;
    const superheroes = buscarSuperheroesPorAtributo(atributo, valor);

    if(superheroes.length > 0){
        res.send(renderizarSuperHeroe(superheroes));
    }else{
        res.status(404).send({mensaje: 'No se encontraron Superheroes con ese atributo'});
    }
}


export function obtenerSUperheroesMayorDe30YConFiltrosController(req, res){
    const superheroes = obtenerSuperheroesMayoresDe30YconFiltros();
    res.send(renderizarListaSuperheroes(superheroes));
}


export function eliminarSuperheroesPorId(req, res){
    const {id} = req.params;
    const resultado = eliminarSuperheroe(parseInt(id));
    res.send(resultado ? 'Superhéroe eliminado' : 'Superhéroe no encontrado')
}

export function agregarNuevoSuperheroe(req, res){
    const datos = req.body;
    const nuevoSuperheroe = agregarSuperheroe(datos);
    res.send(nuevoSuperheroe);
}

export function actualizarSuperheroePorId(req, res){
    const {id} = req.params;
    const datos = req.body;
    const resultado = actualizarSuperheroe(parseInt(id), datos);
    res.send(resultado ? 'Superhéroe actualizado' : 'Superhéroe no encontrado');
}