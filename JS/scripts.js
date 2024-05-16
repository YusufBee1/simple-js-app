const pokemonRepository = (function () {
  const pokemonList = [];

  const addPokemon = function (pokemon) {
    pokemonList.push(pokemon);
  };

  const getAllPokemon = function () {
    return pokemonList;
  };

  const showDetails = function (pokemon) {
    console.log(pokemon);
  };

  const addButtonClickListener = function (button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  };

  const addListItem = function (pokemon) {
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    ulElement.appendChild(listItem);

    addButtonClickListener(button, pokemon);
  };

  return {
    add: addPokemon,
    getAll: getAllPokemon,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.add({ name: 'Bulbasaur', height: 7, types: ['grass', 'poison'] });
pokemonRepository.add({ name: 'Charmander', height: 6, types: ['fire'] });
pokemonRepository.add({ name: 'Squirtle', height: 5, types: ['water'] });

const ulElement = document.querySelector('#pokemon-list');

pokemonRepository.getAll().forEach(pokemon => {
  pokemonRepository.addListItem(pokemon);
});