// New variable with blank array
let pokemonList = [];

// Pokemon objects
let pokemons = [
  { name: 'Charmander', height: 0.6, types: ['fire','blaze'] },
  { name: 'Squirtle', height: 0.5, types: ['water','torrent'] },
  { name: 'Pikachu', height: 0.4, types: ['electric','static'] }
];

// loop for pokemonList (stating name and height)
for (let i=0; i < pokemons.length; i++) {
    document.write("<p>" + pokemons[i].name + ' (height: ' + pokemons[i].height + ')' + "</p>");  

// chain conditional for pokemon height 
  if (pokemons[i].height > 0.5){
    document.write(' - Wow, that\'s big!!');
  }else if (pokemons[i].height <= 0.5 && pokemons[i].height > 0.4){
    document.write(' - That\'s average');
  }else{
    document.write(' - That\'s small');
  }
}    
