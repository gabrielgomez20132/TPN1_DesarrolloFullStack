import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import { superHeroRoutes } from './routes/superHeroRoutes';


const app = express();
const PORT = process.env.PORT || 3000 ;

//midelware para paresear a json
app.use(express.json());


connectDB();

//config de rutas
app.use('/api', superHeroRoutes);

//errores rutas no encontradas
app.use((req, res) => {
  res.status(404).send({mensaje : 'ruta no encontrada'} );
});

//iniciar servidor
app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});