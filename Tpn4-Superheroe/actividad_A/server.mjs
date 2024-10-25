import express from 'express';

const app = express();
const port = 3000;


//http://localhost:3000/user/123
app.get('/user/:id', (req, res) => {

const userId = req.params.id;
console.log(`ID del usuario recibido: ${userId}`);
res.send(`Perfil del usuario con ID: ${userId}`);
});

app.listen(port, () =>{
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 