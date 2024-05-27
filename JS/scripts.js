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

  const closeModal = function () {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
      document.body.removeChild(modalContainer);
      document.removeEventListener('keydown', handleKeydown);
    }
  };

  const handleKeydown = function (event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const showModal = function (pokemon) {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);

    const closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', closeModal);
    modal.appendChild(closeButton);

    const title = document.createElement('h1');
    title.innerText = pokemon.name;
    modal.appendChild(title);

    const height = document.createElement('p');
    height.innerText = `Height: ${pokemon.height}`;
    modal.appendChild(height);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-wrapper');
    modal.appendChild(imageContainer);

    const image = document.createElement('img');
    image.src = pokemon.imageUrl;
    imageContainer.appendChild(image);

    document.body.appendChild(modalContainer);

    document.addEventListener('keydown', handleKeydown);
  };

  const showDetails = function (pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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