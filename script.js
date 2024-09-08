const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonHP = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

const fetchData = async () => {
  try {
    const res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {
   console.log("Error: ", err);
  }
};

const fetchSpecificData = async (pokemonID) => {
  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonID}`);
    const data = await res.json();
    displaySpecificPoke(data);
  } catch (err) {
   console.log("Error: ", err);
  }
};

const displaySpecificPoke = (obj) => {
  const typesByName = [];
  obj.types.forEach((type) =>{
    typesByName.push(type.type.name);
  });
  pokemonName.innerText = obj.name;
  pokemonID.innerText = obj.id;
  pokemonWeight.innerText = obj.weight;
  pokemonHeight.innerText = obj.height;
  pokemonTypes.innerText = typesByName;
  pokemonHP.innerText = obj.stats[0].base_stat;
  pokemonAttack.innerText = obj.stats[1].base_stat;
  pokemonDefense.innerText = obj.stats[2].base_stat;
  pokemonSpecialAttack.innerText = obj.stats[3].base_stat;
  pokemonSpecialDefense.innerText = obj.stats[4].base_stat;
  pokemonSpeed.innerText = obj.stats[5].base_stat;
};

const displayPokemon = (obj) => {
  const searchValue = searchInput.value.toLowerCase(); // Number(searchInput.value);
  let pokeIDs = [];
  let pokeNames = [];
  pokeIDs = obj.results.map(({id}) => id)
  pokeNames = obj.results.map(({name}) => name)
  if (pokeNames.includes(searchValue) || pokeIDs.includes(Number(searchValue))) {
    fetchSpecificData(searchValue);
  } else {
    pokemonName.innerText = '';
    pokemonID.innerText = '';
    pokemonWeight.innerText = '';
    pokemonHeight.innerText = '';
    pokemonTypes.innerText = '';
    pokemonHP.innerText = '';
    pokemonAttack.innerText = '';
    pokemonDefense.innerText = '';
    pokemonSpecialAttack.innerText = '';
    pokemonSpecialDefense.innerText = '';
    pokemonSpeed.innerText = '';
    alert("Pokémon not found");
  }
};

searchButton.addEventListener("click", () => fetchData());
