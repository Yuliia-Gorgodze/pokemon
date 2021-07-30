const initialURL = 'https://pokeapi.co/api/v2/pokemon';

export function getPokemonUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
  });
}

export async function getAllPokemon() {
  return new Promise((resolve, reject) => {
    fetch(initialURL)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
  });
}

export async function getPokemonType(type) {
  const url = `https://pokeapi.co/api/v2/type/${type}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const pokemonList = data.pokemon.map(el => el.pokemon);

        resolve(pokemonList);
      });
  });
}
export async function getPokemonName(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        if (res.status === 404) {
          resolve(res.status);
        }
        return res.json();
      })
      .then(data => {
        const pokemon = {
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
        };
        resolve([pokemon]);
      });
  });
}
