// Initial blank array
let pokemonList = [];

// Add first pokemon
pokemonList.push({
  name: 'Bulbasaur',
  height: 7,
  types: ['grass', 'poison']
});

// Add second pokemon
pokemonList.push({
  name: 'Charmander',
  height: 6,
  types: ['fire']
});

// Add third pokemon
pokemonList.push({
  name: 'Squirtle',
  height: 5,
  types: ['water']
});

// Begin table structure
let output = "<table><tr><th>Name</th><th>Height</th><th>Additional Notes</th></tr>";

// For loop to iterate over the pokemonList array
for (let i = 0; i<pokemonList.length; i++) {
  
  output += "<tr>";

  // Name
  output += "<td>" + pokemonList[i].name + "</td>";
  
  // Height
  output += "<td>" + pokemonList[i].height + "</td>";

  // Additional Notes
  if (pokemonList[i].height > 6) {
    // If height is over 6, add "Wow, that's big!" to the output
    output += "<td>Wow, that's big!</td>";
  } else {
    output += "<td></td>";
  }

  output += "</tr>";
}

output += "</table>";

// Write the output in the document
document.write(output);