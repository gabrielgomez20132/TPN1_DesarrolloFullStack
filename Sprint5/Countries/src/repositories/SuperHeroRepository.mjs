import IRepository from "./IRepository.mjs";
import SuperHero from "../models/SuperHero.mjs";
import mongoose from 'mongoose';
import axios from "axios";

class SuperHeroRepository extends IRepository{

    async obtenerId(id){

        //const superHero = await SuperHero.findById(id);   //buscar por el objectId

        const superHero = await SuperHero.findOne({ id: Number(id) });   //buscar por el ID , agregar en el Modelo el atributo id y en el responseView(renderizado)
    
    
        if (!superHero) {
            console.log('Superhéroe no encontrado.');
        }
    
        return superHero;
    }

    async obtenerTodos(){
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor){
        const query = { [atributo]: new RegExp(valor, 'i') } ;
        
        return await SuperHero.find(query);
    }

    async obtenerMayoresDe30(){
        return await SuperHero.find(
            {
                edad: { $gt: 30 },
                planetaOrigen: 'Tierra',
                //poderes: { $size: { $gte: 2 } } ,
                $expr: { $gte: [{ $size: "$poderes" }, 2] } // Al menos 2 poderes
            }
        );
    }
    

    async insertSuperHero(req, res){

        try {
        
            //capturar los datos que vienen en el body del post
            const dataHero = req.body;
    
            //crear 1 instancia del modelo SuperHero
            const newHero = new SuperHero(dataHero);
            
            //Guardar en la BD
            const saveHero = await newHero.save();

            
            return saveHero;
            
        } catch (error) {

            console.error("Error al insertar el superhéroe:", error);

            throw new Error("Error al insertar el superhéroe");

        }
        

        
    }

    async editarSuperHeroe(req, res){

        const { id } = req.params; // El id recibido en la URL (será un string)
        const superheroeData = req.body; // Los nuevos datos que se quieren actualizar
    
        try {
            // Verificamos si el ID es válido antes de continuar
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('ID no válido');
            }
    
            // Convertimos el id a ObjectId correctamente usando 'new'
            const objectId = new mongoose.Types.ObjectId(id);
    
            // Actualizamos el superhéroe con el nuevo valor
            const superheroe = await SuperHero.findByIdAndUpdate(
                objectId, // Usamos el ObjectId
                superheroeData, // Los datos que queremos actualizar
                { new: true } // Para que devuelva el superhéroe actualizado
            );
    
            if (!superheroe) {
                throw new Error("Superhéroe no encontrado");
            }
    
            return superheroe;
        } catch (error) {
            console.error("Error al actualizar el superhéroe:", error.message);
            throw new Error("Error al actualizar el superhéroe");
        }

    }

    async eliminarSuperHeroe(req, res){

        const { id } = req.params;  // Obtener el ID de los parámetros de la URL

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'ID no válido' });
        }
    
        // Buscar el superhéroe por el ID
        const superheroe = await SuperHero.findById(id);
    
        if (!superheroe) {
            // Si el superhéroe no existe, retornar un error 404
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
    
        // Si el superhéroe existe, procedemos a eliminarlo
        const result = await SuperHero.deleteOne({ _id: id });
    
        if (result.deletedCount === 0) {
            return res.status(400).send({ error: 'Error al eliminar el superhéroe' });
        }

        return superheroe; //retorna el superheroe eliminado recientemente
    }

    async eliminarByNameSuperHeroe(name){

        //const query = await SuperHero.find(name);
        const result = await SuperHero.findOneAndDelete({ nombreSuperHeroe: name });

        if(!result){
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        return result;

    }
    //////////////////////////////////////////////////////////paises/////////////////////////////////////////////

    async obtenerTodosLosPaises(){
        try {
            // Realizamos la solicitud GET asincrónica
            //const respuesta = await axios.get('https://restcountries.com/v3.1/all');
            const paises = await SuperHero.find({ 
                creador: 'Gabriel',
                'languages.spa': 'Spanish'
                
            });
           
           // Filtrar los países que tienen el idioma español
            const paisesConIdiomaEspañol = paises.filter(pais => pais.languages && pais.languages.spa === 'Spanish');
            //console.log(paises)

            // Eliminar los campos no deseados (por ejemplo, 'translations', 'tld', etc.)
            const paisesFiltrados = paisesConIdiomaEspañol.map(pais => {
            const { translations, tld, cca2, ccn3, cca3, cioc, idd, altSpellings, car, coatOfArms, postalCode, demonyms, ...paisFiltrado } = pais._doc;
            return paisFiltrado;
            });

            // Retornar los países filtrados
            return paises;
        
          } catch (error) {
            // Manejo de errores
            console.error('Error al obtener los países:', error);
          }
    }

    async insertPais(paisData){
        
        try{
            

            
            /* if (paisData.timezones && paisData.timezones.length === 1 && typeof paisData.timezones[0] === 'string') {
                // Intentamos parsear el string para convertirlo en un array
                paisData.timezones = JSON.parse(paisData.timezones[0]);
            }
            if (paisData.borders && paisData.borders.length === 1 && typeof paisData.borders[0] === 'string') {
                // Intentamos parsear el string para convertirlo en un array
                paisData.borders = JSON.parse(paisData.borders[0]);
            } */
            

            if (!paisData.languages) {
                paisData.languages = {};  // Si no existe, inicializamos 'languages'
            }
    
           
        
           // paisData.languages = { "spa": "Spanish" };

            
            paisData.creador = "Gabriel";  
        
            // Crear una nueva instancia del modelo y guardarla
            const nuevoPais = new SuperHero(paisData);
            
            const paisGuardado = await nuevoPais.save();  
            /* console.log('new Pais SAVE',paisGuardado); */
            
            // Retornar el país guardado
            return paisGuardado;
          
         
        } catch (error) {
            console.error("Error al insertar el país:", error);
            throw new Error("Error al insertar el país"); // O manejarlo de manera específica
        }
      };
}

export default new SuperHeroRepository;