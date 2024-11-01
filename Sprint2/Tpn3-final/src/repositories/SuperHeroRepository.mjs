import IRepository from "./IRepository.mjs";
import SuperHero from "../models/SuperHero.mjs";

class SuperHeroRepository extends IRepository{

    async obtenerId(id){

        //return await SuperHero.findById(id);   buscar por el objectId

        const superHero = await SuperHero.findOne({ id: Number(id) });
    
    
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
                //poderes: { $size: { $gte: 2 } }
                //$expr: { $gte: [{ $size: "$poderes" }, 2] } // Al menos 2 poderes
            }
        );
    }
}

export default new SuperHeroRepository;