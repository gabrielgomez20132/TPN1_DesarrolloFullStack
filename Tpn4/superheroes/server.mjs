import express from "express";

const app = express();
app.use(express.json());
const PORT = 3005;

app.get("/superheroes", obtenerTodosLosSuperheroes);
app.get("/superheroes/id/:id", obtenerSuperheroePorIdController);
app.post("/superheroes", agregarNuevoSuperheroe);
app.put("/superheroes/:id", actualizarSuperheroePorId);
app.delete("/superheroes/:id", eliminarSuperheroePorId);
app.get("/superheroes/atributo/:atributo/:valor", buscarSuperheroesPorAtributoController);
app.get("/superheroes/filtros/avanzados", obtenerSuperheroesMayoresDe30YConFiltrosController);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});