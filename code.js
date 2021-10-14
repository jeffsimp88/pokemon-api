let pokemonArray = [];
let pokemonList = document.querySelector(".pokemonList");

function capitalize(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function createPokemon(pokemon) {
  // console.log(pokemon);
  let pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");
  pokemonDiv.classList.add(pokemon.name);

  let title = document.createElement("h4");
  let breakTag = document.createElement("br");
  let pokeball = document.createElement("img");
  pokeball.src = "./images/pokeball.png";
  pokeball.classList.add("pokeball", "closed");
  pokeball.addEventListener("click", function () {
    displayInfo(pokemon);
  });
  title.append(pokeball);
  let sprite = document.createElement("img");
  let type = document.createElement("p");

  sprite.setAttribute("src", pokemon.sprites.front_default);
  if (pokemon.nickname) {
    title.append(
      pokeball,
      ` ${capitalize(pokemon.name)}`,
      breakTag,
      `"${pokemon.nickname}"`
    );
  } else {
    title.append(pokeball, ` ${capitalize(pokemon.name)}`, breakTag, `-`);
  }

  type.innerHTML = `${
    pokemon.types.length > 1
      ? `<span class="typeText" style="background-color: ${
          pokemon.types[0].type.color
        }">${capitalize(
          pokemon.types[0].type.name
        )}</span>/<span class="typeText" style="background-color: ${
          pokemon.types[1].type.color
        }">${capitalize(pokemon.types[1].type.name)}</span>`
      : `<span class="typeText" style="background-color: ${
          pokemon.types[0].type.color
        }">${capitalize(pokemon.types[0].type.name)}</span>`
  }`;
  type.innerHTML += `<br> No. ${pokemon.id}`;

  pokemonDiv.append(title, sprite, type);
  pokemonList.append(pokemonDiv);
}

function fetchPokemon(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then(function (pokemon) {
      pokemonArray.push(pokemon);
      addTypeColor(pokemonArray);
      renderPokemon(pokemonArray);
    })
    .catch((error) => alert(`The Pokemon, ${pokemonName}, does not exist.`));
}

let myFavPokemon = [
  { name: "scizor" },
  { name: "hitmontop" },
  { name: "haunter" },
  { name: "lucario" },
  { name: "flygon" },
  { name: "quilava" },
];

myFavPokemon.map((pokemon) => fetchPokemon(pokemon.name));

function renderPokemon(array) {
  pokemonList.innerHTML = "";
  array.map((pokemon) => createPokemon(pokemon));
}

function releasePokemon(pokemon) {
  pokemonArray.splice(pokemonArray.indexOf(pokemon), 1);
  renderPokemon(pokemonArray);
  closeDetails();
}
function giveNickname(pokemon) {
  let newNickname = prompt("What would you like to name them?");
  if (newNickname === null) {
    pokemon.nickname = null;
  } else if (pokemon.nickname) {
    pokemon.nickname = newNickname;
  } else {
    pokemon["nickname"] = newNickname;
  }
  renderPokemon(pokemonArray);
  displayInfo(pokemon);
}
function addPokemon(event) {
  event.preventDefault();
  let inputBox = document.getElementById("text");
  textContent = inputBox.value.toLowerCase();
  fetchPokemon(textContent);
  myFavPokemon.push({ name: textContent });
  inputBox.value = "";
}

let submitButton = document.querySelector(".submit");

submitButton.addEventListener("click", addPokemon);

renderPokemon(pokemonArray);

function displayInfo(pokemon) {
  let displayBox = document.querySelector(".pokemonDetails");

  let editDetails = document.createElement("details");
  editDetails.innerHTML = `<summary> Edit </summary>`;
  let releaseButton = document.createElement("button");
  releaseButton.classList.add("pokemonButton");
  releaseButton.classList.add("releaseButton");
  releaseButton.innerText = `Release`;
  releaseButton.addEventListener("click", function () {
    releasePokemon(pokemon);
  });

  let nicknameButton = document.createElement("button");
  nicknameButton.classList.add("pokemonButton");
  nicknameButton.classList.add("nicknameButton");
  nicknameButton.innerHTML = "Nickname";
  nicknameButton.addEventListener("click", () => giveNickname(pokemon));
  /* <div class="pokeball open"></div><p class="closeDetails"><div class="pokeball open"></div>Close</p> */
  editDetails.append(releaseButton, nicknameButton);
  displayBox.innerHTML = `
  <div class="closeDetails"><div class="pokeball open"></div>Close</div>
  
  <h2>Name: ${capitalize(pokemon.name)}
  <br> Nickname: ${pokemon.nickname ? `"${pokemon.nickname}"` : "-"}
  </h2>
        <p>No. ${pokemon.order} <br></p>

        <p>Type: ${
          pokemon.types.length > 1
            ? `<span class="typeText" style="background-color: ${
                pokemon.types[0].type.color
              }">${capitalize(
                pokemon.types[0].type.name
              )}</span>/<span class="typeText" style="background-color: ${
                pokemon.types[1].type.color
              }">${capitalize(pokemon.types[1].type.name)}</span>`
            : `<span class="typeText" style="background-color: ${
                pokemon.types[0].type.color
              }">${capitalize(pokemon.types[0].type.name)}</span>`
        }</p>
        <div class="stats">
        <h3>Stats</h3>
        <ul>
            <li>HP: ${pokemon.stats[0].base_stat}</li>
            <li>Attack: ${pokemon.stats[1].base_stat}</li>
            <li>Defense: ${pokemon.stats[2].base_stat}</li>
            <li>Special Attack: ${pokemon.stats[3].base_stat}</li>
            <li>Special Defense: ${pokemon.stats[4].base_stat}</li>
            <li>Speed: ${pokemon.stats[5].base_stat}</li>
        </ul>
        <p>Height: ${pokemon.height}"  <br> Weight: ${pokemon.weight}Kg</p>
        </div>
  `;
  let close = document.querySelector(".closeDetails");
  close.addEventListener("click", closeDetails);
  displayBox.append(editDetails);
}

function addTypeColor(array) {
  return array.map((pokemon) =>
    pokemon.types.map(
      (type) => (type.type["color"] = typeColor[type.type.name])
    )
  );
}

function closeDetails() {
  let displayBox = document.querySelector(".pokemonDetails");
  displayBox.innerHTML =
    '<h2>Select a P<span><img class="pokeball closed" style="width: 1rem;" src="./images/pokeball.png" alt="pokeball"></span>kéball to see more!</h2>';
}
