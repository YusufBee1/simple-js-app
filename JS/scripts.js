const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  const loadingMessage = document.createElement('p');
  loadingMessage.innerText = 'Loading...';
  loadingMessage.classList.add('loading-message');

  const addPokemon = function (pokemon) {
    pokemonList.push(pokemon);
  };

  const getAllPokemon = function () {
    return pokemonList;
  };

  const showLoadingMessage = function () {
    document.body.appendChild(loadingMessage);
  };

  const hideLoadingMessage = function () {
    document.body.removeChild(loadingMessage);
  };

  const loadDetails = function (pokemon) {
    showLoadingMessage();
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map(function (typeItem) {
          return typeItem.type.name;
        });
      })
      .catch(function (error) {
        hideLoadingMessage();
        console.error(error);
      });
  };

  const showDetails = function (pokemon) {
    loadDetails(pokemon).then(function () {
      const pokemonInfo = `Name: ${pokemon.name}\nHeight: ${
        pokemon.height
      }\nWeight: ${pokemon.weight}\nTypes: ${pokemon.types.join(
        ', '
      )}\nImage URL: ${pokemon.imageUrl}`;
      alert(pokemonInfo);
    });
  };

  const addButtonClickListener = function (button, pokemon) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
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

  const loadList = function () {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (pokemon) {
          let pokemonData = {
            name: pokemon.name,
            detailsUrl: pokemon.url,
          };
          addPokemon(pokemonData);
        });
      })
      .catch(function (error) {
        hideLoadingMessage();
        console.error(error);
      });
  };

  return {
    add: addPokemon,
    getAll: getAllPokemon,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

const ulElement = document.querySelector('#pokemon-list');

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
  });
});