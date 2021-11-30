const baseURL = "https://pokeapi.co/api/v2";
const gameElement = document.querySelector(".whosThatPokemon");
let currentPokemon = [];
const getRandomId = (maxId) => Math.floor(Math.random() * maxId + 1);

function fetchPokemon() {
  let getId = getRandomId(386);
  fetch(`https://pokeapi.co/api/v2/pokemon/${getId}`)
    .then((response) => response.json())
    .then(function (pokemon) {
      createGuessElement(pokemon);
      addTypeColor(currentPokemon);
      closeDetails();
    });
}

function createGuessElement(pokemon) {
  currentPokemon = [];
  currentPokemon.push(pokemon);
  gameElement.innerHTML = "";
  let pokemonImgBox = document.createElement("div");
  pokemonImgBox.classList.add("pokemonImg");
  let pokeImg = document.createElement("img");
  pokeImg.classList.add("pokemon-sprite", "pokemon-sprite-silhouette");
  pokeImg.src = pokemon.sprites.front_default;

  let pokemonName = document.createElement("h3");
  pokemonName.append(
    `It's ${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}!`
  );
  pokemonName.classList.add("hidden");

  let pokeball = document.createElement("img");
  pokeball.src = "./images/pokeball.png";
  pokeball.classList.add("pokeball", "closed", "hidden");
  pokeball.addEventListener("click", function () {
    displayInfo(pokemon);
  });

  pokeImg.addEventListener("click", () => {
    pokeImg.classList.toggle("pokemon-sprite-silhouette");
    pokemonName.classList.toggle("hidden");
    pokeball.classList.toggle("hidden");
  });
  pokemonImgBox.append(pokeImg);
  gameElement.append(pokemonImgBox, pokemonName, pokeball);
}

fetchPokemon();

document
  .querySelector(".pokemonButton.getPokemon")
  .addEventListener("click", fetchPokemon);
