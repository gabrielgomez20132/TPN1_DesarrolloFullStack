const mongoose = require('mongoose');


const url = 'mongodb+srv://Grupo-07:grupo07@cursadanodejs.ls9ii.mongodb.net/Node-js';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectarse a MongoDB:', error);
  });


  // Definición de un esquema
const superheroeSchema = new mongoose.Schema({
    nombreSuperheroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    creado: { type: String },
    createdAt: { type: Date, default: Date.now }
  },{ collection: 'Grupo-07' }); 
  
  const Superheroe = mongoose.model('Superheroe', superheroeSchema);

  async function insertSuperHero(){

        const hero = new Superheroe({
            nombreSuperheroe: 'Batman',
            nombreReal: 'Bruce Wayne',
            edad: 35,
            planetaOrigen: 'Tierra',
            debilidad: 'Ninguna (física)',
            poderes: ['habilidades de combate', 'inteligencia superior', 'tecnología avanzada'],
            aliados: ['Robin', 'Batgirl'],
            enemigos: ['Joker', 'Penguin'],
            creado: 'Gabriel Insert',
        });

        await hero.save()
          .then(() => {
            console.log('Superhéroe guardado con éxito');
            //mongoose.connection.close(); // Cierra la conexión
          })
          .catch((error) => {
            console.error('Error al guardar el superhéroe:', error);
          });
  }


  async function updateSuperHero(nombreSuperheroe){
      try {

        const result = await Superheroe.updateOne(
            { nombreSuperheroe: nombreSuperheroe },
            { $set : {edad: 25} }
        );

        console.log('Superhéroe actualizado exitosamente.', result);
        
    
        
      } catch (error) {
        console.error('Error al actualizar el superhéroe:', error);
      }
    
  }

  async function deleteSuperHero(nombreSuperheroe){

    try {

      const result = await Superheroe.deleteOne({
        nombreSuperheroe : nombreSuperheroe
      });

      console.log('Superheroe eliminado: ', result);
      
    } catch (error) {

      console.error('Error al eliminar el superhéroe:', error);
    }
    
  }

  async function findSuperHero(){
    try {
      const heroes = await Superheroe.find({ planetaOrigen : 'Tierra'}) ; 
      console.log('Super heroes encontrados', heroes);
      
    } catch (error) {
      console.error('Error al buscar el superhéroe:', error);
    }
  }

  //insertSuperHero();
  //updateSuperHero('Batman');
  //deleteSuperHero('Batman');
  findSuperHero();