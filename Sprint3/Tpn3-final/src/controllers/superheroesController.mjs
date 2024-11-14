import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, 
    buscarSuperHeroesPorAtributo, obtenerSuperHeroesMayoresDe30, insertarSuperHeroes, actualizarSuperHeroes, deleteSuperHeroes , deleteByNameSuperHeroes } from '../services/SuperHeroService.mjs';
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

export async function insertarSuperHeroesController(req, res){
    
    try {
        const superhero = await insertarSuperHeroes(req, res);
        const renderizado = renderizarSuperHeroe(superhero); // Usamos renderizarSuperHeroe ya que es 1 solo SUPERHEROE
        res.status(201).send(renderizado); // Devuelve el objeto renderizado

    } catch (error) {
        console.error("Error en el controlador:", error.message);
        res.status(500).send({ error: "Error al insertar el superhéroe" });
    }
   
    
}

export async function editarSuperHeroesController(req, res){
    try {
        const superheroe = await actualizarSuperHeroes(req, res);

        // Verificamos si el superhéroe fue encontrado y actualizado
        if (!superheroe) {
            return res.status(404).send({ error: 'Superhéroe no encontrado' });
        }

        // Usamos renderizarSuperHeroe para un solo superhéroe
        const superheroeRenderizado = renderizarSuperHeroe(superheroe);

        // Retornamos la respuesta con el superhéroe actualizado
        res.status(200).send(superheroeRenderizado);

    } catch (error) {

        console.error("Error en el controlador:", error.message);
        res.status(500).send({ error: "Error al actualizar el superhéroe" });

    }
}

export async function eliminarSuperHeroesController(req, res){

    try {
        const superheroe = await deleteSuperHeroes(req, res);

        const superheroeRenderizado = renderizarSuperHeroe(superheroe);

        // Si la eliminación es exitosa, enviar respuesta
        res.status(200).send(superheroeRenderizado);
    } catch (error) {
        console.error("Error en el controlador:", error.message);
        res.status(500).send({ error: 'Error al eliminar el superhéroe' });
    }

}

export async function eliminarByNameSuperHeroesController(req, res){
    
    try {
        const {name} = req.params;
        const superheroe = await deleteByNameSuperHeroes(name);
        const superheroeRenderizado = renderizarSuperHeroe(superheroe)

        res.status(200).send(superheroeRenderizado);

    } catch (error) {
        console.error("Error en el controlador:", error.message);
        res.status(500).send({ error: 'Error al eliminar el superhéroe por su Nombre' });
    }
}