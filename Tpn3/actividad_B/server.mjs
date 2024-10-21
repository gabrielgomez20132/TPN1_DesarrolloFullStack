import express from 'express'

const app = express();
const port = 3000;

//http://localhost:3000/profile?edad=33
app.get('/profile', (req, res) => {
    const edad = req.query.edad;
    console.log(`Edad recibida:  ${edad}` );

    res.send(`Edad del Perfil : ${edad}`);
});



app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});