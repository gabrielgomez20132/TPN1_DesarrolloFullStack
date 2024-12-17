import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, 
    buscarSuperHeroesPorAtributo, obtenerSuperHeroesMayoresDe30, insertarSuperHeroes, actualizarSuperHeroes, deleteSuperHeroes , deleteByNameSuperHeroes,
    obtenerTodosPaises, insertPaises } from '../services/SuperHeroService.mjs';
import { renderizarSuperHeroe, renderizarListaSuperheroes } from '../views/responseView.mjs';
import { validationResult } from 'express-validator';
import SuperHero from '../models/SuperHero.mjs';


export async function obtenerSuperHeroePorIdController(req, res){
    const { id } = req.params;
    const superheroe = await obtenerSuperHeroePorId(id);
    
    if(superheroe){
        res.send(renderizarSuperHeroe(superheroe));
    }
    else{
        res.status(404).send({mensaje: "Superheroe no encontradost"});
    }
}

export async function obtenerTodosLosSuperHeroesController(req, res){
    try {
        // Llamada a la función de servicio
        const superheroes = await obtenerTodosLosSuperHeroes();
       //console.log(superheroes);
        res.render('dashboard', { superheroes: superheroes });
    } catch (error) {
        console.error('Error al obtener los superhéroes:', error);
        res.status(500).send('Error al obtener los superhéroes');
    }
}

// Mostrar el formulario para agregar un superhéroe
export const mostrarFormularioAgregar = (req, res) => {

    const { message } = req.query;
  
    // Pasar el mensaje de éxito, errores de validación o datos del formulario
    res.render('addSuperhero', {
      message,  // El mensaje (si existe)
      errors: req.flash('errors'), // Errores de validación, si los hay
      formData: req.body // Datos del formulario, en caso de haber sido enviados previamente
    });

};

// Controlador para manejar la creación del superhéroe
export const agregarSuperHeroe = async (req, res) => {
    console.log(req.body)
    try {
        const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;

        // Crear un nuevo documento en la base de datos
        const nuevoHeroe = new SuperHero({
            nombreSuperHeroe,
            nombreReal,
            edad,
            planetaOrigen,
            debilidad,
            poderes: poderes ? poderes.split(',').map(p => p.trim()) : [], // Convierte la lista en un array
            aliados: aliados ? aliados.split(',').map(a => a.trim()) : [],
            enemigos: enemigos ? enemigos.split(',').map(e => e.trim()) : [],
        });

        // Guardar el nuevo superhéroe en la base de datos
        await nuevoHeroe.save(); 

        // Redirige al dashboard después de agregar
        res.redirect('/heroes');
    } catch (error) {
        console.error('Error al agregar el superhéroe:', error);
        res.status(500).send('Error interno del servidor');
    }
};



export const mostrarFormularioEditar = async (req, res) => {
    try {
        const { id } = req.params;
        const pais = await SuperHero.findById(id);

        if (!pais) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }

        // Renderiza el formulario y pasa los datos del superhéroe
        res.render('editSuperhero', { pais });
    } catch (error) {
        console.error('Error al buscar el superhéroe:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const actualizarSuperHeroe = async (req, res) => {
    try {
        // Procesamos el cuerpo para asegurarnos de que los campos tengan el formato correcto
        let { 
            'name.official': nameOfficial,  // Extraemos el nombre oficial
            capital, 
            borders, 
            area, 
            population, 
            timezones, 
            languages 
            } = req.body;

        // Convertir el 'name.official' en un objeto adecuado
        const name = { official: nameOfficial };

        // Verificar y convertir 'borders' a un array
        if (borders && borders.length === 1 && typeof borders[0] === 'string') {
            // Limpiar el valor antes de parsearlo
            const cleanedBorders = borders[0].replace(/^\[|\]$/g, '').split(',').map(b => b.trim().replace(/"/g, ''));
            // Convertir la cadena en un arreglo
            borders = cleanedBorders;
        }

        // Verificar y convertir 'timezones' a un array
        if (timezones && timezones.length === 1 && typeof timezones[0] === 'string') {
            // Limpiar la cadena antes de convertirla en un array
            const cleanedTimezones = timezones[0].replace(/^\[|\]$/g, '').split(',').map(t => t.trim().replace(/"/g, ''));

            // Ahora 'timezones' es un array de cadenas
            timezones = cleanedTimezones;
        }

        // Si no existe, inicializamos 'languages'
        if (!languages) {
            languages = {};  
        }


        // Asegurarse de que el 'languages' esté en el formato adecuado para Mongoose Map
        const languagesMap = new Map();

        // Verificar si 'languages' contiene los idiomas correctos
        if (languages.includes('spa')) {
            languagesMap.set('spa', 'Spanish');
        }
        if (languages.includes('eng')) {
            languagesMap.set('eng', 'English');
        }


        // Buscamos el país por su ID y lo actualizamos
        const paisActualizado = await SuperHero.findByIdAndUpdate(
            req.params.id, // Usamos el id de los parámetros
            {
                name,
                capital,
                borders,
                area,
                population,
                timezones,
                languages: languagesMap,
            },
            { new: true } // Devuelve el documento actualizado
        );

        // Si el país no se encuentra, respondemos con un error
        if (!paisActualizado) {
            return res.status(404).send({ mensaje: "País no encontrado" });
        }

        //res.json(paisActualizado);
        // Redirige al dashboard o a otra página después de actualizar
        res.status(201).redirect('/countries');

    } catch (error) {
        console.error("Error al actualizar el país:", error);
        res.status(500).send('Error interno del servidor');
    }
};


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
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    
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
    
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

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



// Nuevo método de eliminación por ID
export async function eliminarSuperHeroePorId(id) {
    try {
        // Aquí se podría usar cualquier otra lógica de eliminación, como validaciones o relaciones
        const superheroe = await SuperHeroe.findById(id);  // Buscar el superhéroe por ID
        if (!superheroe) {
            throw new Error('Superhéroe no encontrado');
        }

        // Eliminar el superhéroe
        await superheroe.remove();  // Usamos el método de eliminación
        return superheroe;  // Retornamos el superhéroe eliminado para usarlo en el controlador si es necesario
    } catch (error) {
        throw new Error('Error al eliminar el superhéroe: ' + error.message);
    }
}
//eliminar mvc
export async function eliminarSuperHeroesControllerMvc(req, res) {

    const { id } = req.params;  // Accede al ID desde la URL
    //console.log(`Eliminando superhéroe con ID: ${id}`);

    try {
        // busca y elimina con el modelo SuperHero
        const superheroe = await SuperHero.findByIdAndDelete(id);
        
        if (!superheroe) {
            // Si no se encuentra el superhéroe, lanzamos un error
            throw new Error('Superhéroe no encontrado');
        }


        // Redirigir al dashboard después de eliminar
        res.redirect('/countries');  // Redirige al dashboard después de la eliminación

    } catch (error) {
        console.error("Error al eliminar el Pais:", error.message);
        // Si hay un error, enviar un mensaje de error adecuado
        res.status(500).send({ error: 'Error al eliminar el Pais' });
    }


    
}


//sprint 5 obtener todo los Countriels
export async function obtenerCountriesController(req, res){
    try {
        // Llamada a la función de servicio
        const paises = await obtenerTodosPaises();
        const message = req.flash('message');

        // Renderizar la vista dashboard con los paises y el mensaje
        res.render('dashboard', { paises: paises, message: message });
    } catch (error) {
        console.error('Error al obtener los paises:', error);
        res.status(500).send('Error al obtener los paises');
    }
}


export const insertarPaisController = async (req, res) => {

    if (typeof req.body.borders === 'string') {
        req.body.borders = req.body.borders.split(',').map(b => b.trim().toUpperCase()); // Convierte la cadena en un arreglo
    }

   // Transformar las zonas horarias a un arreglo si vienen como cadena
   if (typeof req.body.timezones === 'string') {
        req.body.timezones = req.body.timezones.split(',').map(tz => tz.trim());
    }
    

    const idiomasValidos = {
        spa: "Spanish",
        eng: "English",
    };
    
    // Transformar el array en un Map
    if (req.body.languages && Array.isArray(req.body.languages)) {
        // Convertir el array en un Map
        req.body.languages = req.body.languages.reduce((map, lang) => {
            if (idiomasValidos[lang]) {
                map.set(lang, idiomasValidos[lang]);
            }
            return map;
        }, new Map());
    }
   

    const errores = validationResult(req);
    
    if (!errores.isEmpty()) {
        // Si hay errores, renderiza de nuevo el formulario y pasa los errores y los datos ingresados
        return res.status(400).render('addSuperhero', {
            errors: errores.array(),
            formData: req.body  // Para que el formulario retorne los valores ingresados
        });
    }

    try {
      // Extraemos los datos del cuerpo de la solicitud
      const paisData = req.body;
  
      // Llamamos al servicio para insertar el país
      const paisCreado = await insertPaises(paisData);

      // Establecer el mensaje de éxito
        req.flash('message', 'País agregado exitosamente');
  
      // Respondemos con el país creado
      //res.status(201).json({ message: 'País agregado exitosamente', pais: paisCreado });
      res.status(201).redirect('/countries');

    } catch (error) {

      console.error('Error al insertar el país:', error);
      res.status(500).send('Error al insertar el país');

    }
  };
  