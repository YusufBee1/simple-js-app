
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon){ 
    if (typeof pokemon === 'object' &&
       'name' in pokemon &&
       'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid');
    }
  }

  function getAll() { //get a list of all the pokemon
    return pokemonList;
  }

  function addListItem(pokemon) { //create a list of buttns with each pokemon name
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemonButton');

    button.classList.add('btn');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() { //fetch a list of pokemon from the api
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          height: item.height,
          types: item.types,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) { //fetch the DETAILS of the pokemon from the api
    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }



  //modal: 

  function showDetails(pokemon) { //show the modal
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }


  function showModal(item) {
    pokemonRepository.loadDetails(item).then(function () {

      let pokemonImage = document.querySelector('.pokemon-img');
      pokemonImage.src = item.imageUrl;

      let pokemonName = document.querySelector('.title');
      pokemonName.innerText = item.name;

      let pokemonHeight = document.querySelector('.height');
      pokemonHeight.innerText = 'Height: ' + (item.height / 10) + 'm';

      let itemTypes = "";
      item.types.forEach(function (types) {
        itemTypes += ["<li>" + "> " + types.type.name + "</li>"];
      });
      let pokemonTypes = document.querySelector('.types');
      pokemonTypes.innerHTML = itemTypes;
    });
  }

  //end of modal


// search for pokemon 
function searchPokemon() {
  let searchInput = document.getElementById('search-input');
  let searchText = searchInput.value.toLowerCase();
  let allPokemon = document.querySelectorAll('.list-group-item');

  allPokemon.forEach(function(pokemon) {
    let pokemonText = pokemon.querySelector('.pokemonButton').innerText.toLowerCase();
    if (pokemonText.includes(searchText)) {
      pokemon.style.display = 'block';
    } else {
      pokemon.style.display = 'none';
    }
  });
}

// Add event listener for search input
document.getElementById("search-input").addEventListener("input", function () {
  searchPokemon();
});


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
