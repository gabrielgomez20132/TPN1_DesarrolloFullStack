import mongoose from "mongoose";

const superheroeSchema = new mongoose.Schema({

    name: {
        common: String,
        official: String,
        nativeName: Object,
    },
    independent: Boolean,
    status: String,
    unMember: Boolean,
    currencies: Object,
    capital: [String],
    region: String,
    subregion: String,
    languages: Object,
    latlng: [Number],
    landlocked: Boolean,
    borders: {
      type: [String],  // Define el campo como un array de strings
      required: true 
    },
    area: Number,
    flag: String,
    maps: Object,
    population: Number,
    gini: Object,
    fifa: String,
    timezones: {
      type: [String],  // Define el campo como un array de strings
      required: true 
    },
    continents: [String],
    flags: Object,
    startOfWeek: String,
    capitalInfo: Object,
    creador: {
      type: String, 
      },
}, { collection: 'Grupo-07' });

  

  export default mongoose.model('SuperHero', superheroeSchema);