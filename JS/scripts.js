const pokemonRepository = (function () {
  const pokemonList = [];

  const addPokemon = function (pokemon) {
    pokemonList.push(pokemon);
  };

  const getAllPokemon = function () {
    return pokemonList;
  };

  const addListItem = function (pokemon) {
    // Create an li element
    let listItem = document.createElement('li');

    // Create a button element
    let button = document.createElement('button');
    // Set the button's innerText to be the Pokémon's name
    button.innerText = pokemon.name;
    // Add a class to the button
    button.classList.add('pokemon-button');

    // Append the button to the listItem as its child
    listItem.appendChild(button);

    // Append the listItem to the ulElement as its child
    ulElement.appendChild(listItem);
  };

  return {
    add: addPokemon,
    getAll: getAllPokemon,
    addListItem: addListItem,
  };
})();

pokemonRepository.add({
  name: 'Bulbasaur',
  height: 7,
  types: ['grass', 'poison'],
});

pokemonRepository.add({
  name: 'Charmander',
  height: 6,
  types: ['fire'],
});

pokemonRepository.add({
  name: 'Squirtle',
  height: 5,
  types: ['water'],
});

// Assuming there is a <ul> element in your index.html with the id 'pokemon-list'
const ulElement = document.querySelector('#pokemon-list');

// forEach loop to iterate over the pokemonList array
pokemonRepository.getAll().forEach(pokemon => {
  // Call the addListItem() function with the current Pokémon object
  pokemonRepository.addListItem(pokemon);
});