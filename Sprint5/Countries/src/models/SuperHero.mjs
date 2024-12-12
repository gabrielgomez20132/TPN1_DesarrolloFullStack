import mongoose from "mongoose";

const superheroeSchema = new mongoose.Schema({

  name: {
    type: Map,
    of: String,
    required: true
  },
  tld: {
    type: [String], // Array de cadenas
    required: false
  },
  cca2: {
    type: String, // Código de país (ejemplo: "GS")
    required: true
  },
  ccn3: {
    type: String, // Código numérico (ejemplo: "239")
    required: true
  },
  cca3: {
    type: String, // Código de tres letras (ejemplo: "SGS")
    required: true
  },
  independent: {
    type: Boolean, // Booleano que indica si es independiente o no
    required: true
  },
  status: {
    type: String, // Ejemplo: "officially-assigned"
    required: true
  },
  unMember: {
    type: Boolean, // Indica si es miembro de la ONU
    required: true
  },
  currencies: {
    type: Map,
    of: Object, // Para manejar la estructura de monedas de cada país
    required: false
  },
  idd: {
    type: Object, // Este campo puede contener detalles de la llamada internacional
    required: false
  },
  capital: {
    type: [String], // Array de cadenas para la capital
    required: false
  },
  altSpellings: {
    type: [String], // Array de cadenas para los nombres alternativos
    required: false
  },
  region: {
    type: String, // Ejemplo: "Antarctic"
    required: true
  },
  languages: {
    type: Map,
    of: String, // Para almacenar los idiomas del país
    required: false
  },
  translations: {
    type: Map,
    of: Object, // Para manejar las traducciones de los nombres
    required: false
  },
  latlng: {
    type: [Number], // Array de números (latitud y longitud)
    required: false
  },
  landlocked: {
    type: Boolean, // Si el país es un país sin salida al mar
    required: true
  },
  area: {
    type: Number, // El área del país (en km²)
    required: true
  },
  demonyms: {
    type: Map,
    of: String, // Para manejar gentilicios (ej: "American" para EE. UU.)
    required: false
  },
  flag: {
    type: String, // El emoji de la bandera o el enlace a la bandera
    required: false
  },
  maps: {
    type: Object, // Puede contener información relacionada con mapas (enlaces, detalles)
    required: false
  },
  population: {
    type: Number, // Población del país
    required: true
  },
  car: {
    type: Object, // Para almacenar información sobre los automóviles (ej: tipo de volante)
    required: false
  },
  timezones: {
    type: [String], // Array de cadenas para las zonas horarias
    required: false
  },
  continents: {
    type: [String], // Array de cadenas para los continentes (si es aplicable)
    required: false
  },
  flags: {
    type: Object, // Información relacionada con las banderas
    required: false
  },
  coatOfArms: {
    type: Object, // Información sobre el escudo de armas
    required: false
  },
  startOfWeek: {
    type: String, // Día de inicio de la semana (ej: "monday")
    required: false
  },
  capitalInfo: {
    type: Object, // Información adicional sobre la capital
    required: false
  }

  },{ collection: 'Grupo-07' }); 
  

  export default mongoose.model('SuperHero', superheroeSchema);