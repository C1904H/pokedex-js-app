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

    return {
        getAll: getAll,
        add: add
    }
})();

// Addition of new pokemon item to list
pokemonRepository.add({
    name: 'Bulbasaur', height: 2.04, types: ['Grass', ' Poison']
});

// Print all pokemons in list
pokemonRepository.getAll().forEach(function (pokemon) {
    // chain conditional for pokemon height if >0.5
    if (pokemon.height > 0.5) {
        document.write("<p>" + pokemon.name + ' (height: ' + pokemon.height + ')' + ' - Wow, that\'s big!!' + ' ' + pokemon.types + "</p>");
    } else {
        document.write("<p>" + pokemon.name + ' (height: ' + pokemon.height + ')' + ' ' + pokemon.types + "</p>");
    }
});





