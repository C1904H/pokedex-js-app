// pokemonList array in IIFE
let pokemonRepository = (function () {

    let pokemonList = [
        {
            name: 'Charmander',
            height: 0.6,
            types: ['Fire', ' Blaze']
        },
        {
            name: 'Squirtle',
            height: 0.5,
            types: ['Water', ' Torrent']
        },
        {
            name: 'Pikachu',
            height: 0.4,
            types: ['Electric', ' Static']
        }
    ];

    // Return pokemon array
    function getAll() {
        return pokemonList;
    }

    // Add pokemon item to list
    function add(pokemon) {
        if (
            typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        } else {
            console.log('Error!')
        }
    }

// Add list item and button to DOM 
function addListItem(pokemon){
    let pokemonList = document.querySelector ('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    
    // Add event listener to button
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})();

// Addition of new pokemon item to list
pokemonRepository.add({
    name: 'Bulbasaur', height: 2.04, types: ['Grass', ' Poison']
});

// Print all pokemons in list
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });





