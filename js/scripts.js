// Pokemon objects
let pokemonList = [
    { name: 'Charmander', height: 0.6, types: ['Fire', 'Blaze'] },
    { name: 'Squirtle', height: 0.5, types: ['Water', 'Torrent'] },
    { name: 'Pikachu', height: 0.4, types: ['Electric', 'Static'] }
];

// loop for pokemonList (stating name and height)
//for (let i=0; i < pokemons.length; i++) {
//document.write("<p>" + pokemons[i].name + ' (height: ' + pokemons[i].height + ')' + "</p>");  

// chain conditional for pokemon height 
//if (pokemons[i].height > 0.5) {
    //document.write(' - Wow, that\'s big!!');
//} else if (pokemons[i].height <= 0.5 && pokemons[i].height > 0.4) {
   //document.write(' - That\'s average');
//} else {
    //document.write(' - That\'s small');

//forEach() Loop for pokemon objects
pokemonList.forEach(function (pokemon) {

//Chain conditional for pokemon height
    if (pokemon.height > 0.5) {
        document.write("<p>" + pokemon.name + ' (height: ' + pokemon.height + ' - Wow, that\'s big!!) ' + ' ' + pokemon.types + "</p>");
    } else {
        document.write("<p>" + pokemon.name + ' (height: ' + pokemon.height + ')' + ' ' + pokemon.types + "</p>");
    }
});

   
