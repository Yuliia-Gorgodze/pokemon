export function getPokemon({ url }) {
    console.log(url);
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
            .then(data => {
                // console.log('getPokemon', data);
                resolve(data)
            })
    });
}
export function getPokemonUrl( url ) {
    console.log(url);
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
            .then(data => {
                // console.log('getPokemon', data);
                resolve(data)
            })
    });
}

export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => res.json())
            .then(data => {
                // console.log('getAllPokemon', data);
                resolve(data)
            })
    });
}