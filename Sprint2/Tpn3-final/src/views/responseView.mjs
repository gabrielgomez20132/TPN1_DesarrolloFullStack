export function renderizarSuperHeroe(superheroe){
    console.log(superheroe);
    return {
        "Nombre Super Heroe": superheroe.nombreSuperHeroe, 
        "Nombre Real": superheroe.nombreReal,
        Edad: superheroe.edad,
        "Planeta Origen": superheroe.planetaOrigen,
        Debilidad: superheroe.debilidad,
        Poderes: superheroe.poderes,
        Aliados: superheroe.aliados,
        Enemigos: superheroe.enemigos
    };
}

export function renderizarListaSuperheroes(superheroes){
    return superheroes.map(superheroe => renderizarSuperHeroe(superheroe));
}