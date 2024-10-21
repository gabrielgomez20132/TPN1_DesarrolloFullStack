import express from 'express'

const app = express();
const port = 3000;

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    console.log(`ID del usuario recibido:  ${userId}` );

    res.send(`Perfil del usuario con ID: ${userId}`);
});
//http://localhost:3000/user/1


app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});