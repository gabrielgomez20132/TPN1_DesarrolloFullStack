import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, buscarSuperheroesPorAtributo, obtenerSuperHeroesMayoresDe30 } from '../services/superHeroService.mjs';
import { renderizarSuperHeroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperHeroePorIdController(req, res){
    const { id } = req.params;
    const superheroe = await obtenerSuperHeroePorId(id);

    if(superheroe){
        res.send(renderizarSuperHeroe(superheroe));
    }
    else{
        res.status(404).send({mensaje: "Superheroe no encontrado"});
    }
}

export async function obtenerTodosLosSuperHeroesController(){
    const superheroes = await obtenerTodosLosSuperHeroes();
    res.send(renderizarSuperHeroe(superheroes));
}

export async function buscarSuperheroesPorAtributoController(req, res){
    const {atributo, valor} = req.params;
    const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

    if(superheroes.length > 0){
        res.send(renderizarListaSuperheroes(superheroes));
    }
    else{
        res.status(404).send({mensaje: "No se encontraron Superheroes con ese atributo"});
    }
}

export async function obtenerSuperHeroesMayoresDe30Controller(req, res){
    const superheroes = await obtenerSuperHeroesMayoresDe30();
    res.send(renderizarListaSuperheroes(superheroes));


}