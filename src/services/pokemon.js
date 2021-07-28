export function getPokemon({ url }) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
  });
}

export function getPokemonUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
  });
}

export async function getAllPokemon(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
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
        resolve(data.pokemon);
      });
  });
}
export async function getPokemonName(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        console.log(res);
        if (res.status === 404) {
          resolve(res.status);
        }
        return res.json();
      })
      .then(data => {
        resolve(data);
      });
  });
}
