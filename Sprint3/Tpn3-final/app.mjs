
import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import router from './src/routes/superHeroRoutes.mjs';


const app = express();
const PORT = process.env.PORT || 3000 ;

//midelware para paresear a json
app.use(express.json());


connectDB();

//config de rutas
app.use('/api', router);

//errores rutas no encontradas
app.use((req, res) => {
  res.status(404).send({mensaje : 'ruta no encontrada'} );
});

//iniciar servidor
app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}`);
});