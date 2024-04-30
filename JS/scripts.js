const pokemonRepository = (function () {
  const pokemonList = [];

  const addPokemon = function (pokemon) {
    pokemonList.push(pokemon);
  };

  const getAllPokemon = function () {
    return pokemonList;
  };

  return {
    add: addPokemon,
    getAll: getAllPokemon,
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

// Begin table structure
let output = '<table><tr><th>Name</th><th>Height</th><th>Additional Notes</th></tr>';

// forEach loop to iterate over the pokemonList array
pokemonRepository.getAll().forEach(pokemon => {
  output += '<tr>';

  // Name
  output += '<td>' + pokemon.name + '</td>';

  // Height
  output += '<td>' + pokemon.height + '</td>';

  // Additional Notes
  if (pokemon.height > 6) {
    // If height is over 6, add "Wow, that's big!" to the output
    output += "<td>Wow, that's big!</td>";
  } else {
    output += '<td></td>';
  }

  output += '</tr>';
});

output += '</table>';

// Write the output in the document
document.write(output);