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
        pokemon.imageUrl = details.sprites.other['official-artwork'].front_default;
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

  const showModal = function (pokemon) {
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';

    const title = document.querySelector('#pokemonModalLabel');
    title.innerText = pokemon.name;

    const height = document.createElement('p');
    height.innerText = `Height: ${pokemon.height}`;
    modalBody.appendChild(height);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-wrapper');
    modalBody.appendChild(imageContainer);

    const image = document.createElement('img');
    image.src = pokemon.imageUrl;
    imageContainer.appendChild(image);
  };

  const addButtonClickListener = function (button, pokemon) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      loadDetails(pokemon).then(() => {
        showModal(pokemon);
        const modalElement = document.getElementById('pokemonModal');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        // Add event listeners for the 'X' and 'Close' buttons
        modalElement.addEventListener('hidden.bs.modal', () => {
          modal.hide();
        });
      });
    });
  };

  const addListItem = function (pokemon) {
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'pokemon-button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
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

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});