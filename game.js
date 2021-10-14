const baseURL = "https://pokeapi.co/api/v2";
const gameElement = document.querySelector(".whosThatPokemon");
const pokemonImgBox = document.querySelector(".pokemonImg");
const getRandomId = (maxId) => Math.floor(Math.random() * maxId + 1);

function fetchPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomId(386)}`)
    .then((response) => response.json())
    .then(function (pokemon) {
      let pokeImg = document.createElement("img");
      pokeImg.classList.add("pokemon-sprite", "pokemon-sprite-silhouette");
      pokeImg.src = pokemon.sprites.front_default;

      let pokemonName = document.createElement("h3");
      pokemonName.append(
        `It's ${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}!`
      );
      pokemonName.classList.add("hidden");

      pokeImg.addEventListener("click", () => {
        pokeImg.classList.toggle("pokemon-sprite-silhouette");
        pokemonName.classList.toggle("hidden");
      });
      pokemonImgBox.append(pokeImg);
      gameElement.append(pokemonName);
    });
}

fetchPokemon();
