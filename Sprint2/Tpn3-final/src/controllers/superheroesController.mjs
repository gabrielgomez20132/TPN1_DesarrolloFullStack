import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, 
    buscarSuperHeroesPorAtributo, obtenerSuperHeroesMayoresDe30 } from '../services/SuperHeroService.mjs';
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

export async function obtenerTodosLosSuperHeroesController(req, res){
    const superheroes = await obtenerTodosLosSuperHeroes();

     // Renderiza y formatea la lista de superhéroes
    const listaRenderizada = renderizarListaSuperheroes(superheroes);
    // Envía la respuesta como JSON
    res.json(listaRenderizada);
}

export async function buscarSuperheroesPorAtributoController(req, res){
    const {atributo, valor} = req.params;
    const superheroes = await buscarSuperHeroesPorAtributo(atributo, valor);

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