export function renderizarSuperHeroe(superheroe){
    return {
        Nombre: superheroe.nombreSuperHeroe, 
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