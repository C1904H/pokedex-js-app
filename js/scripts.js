// pokemonList array in IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let i = 0;
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Filter pokemons by name
    function filterPokemons(searchTerm) {
        let filteredPokemons = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        let pokemonContainer = document.querySelector(".row");
        pokemonContainer.innerHTML = "";
        filteredPokemons.forEach((pokemon) => addListItem(pokemon));
    }

    // Add pokemon item to list
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Error!')
        }
    }

    // Return pokemon array
    function getAll() {
        return pokemonList;
    }


    // Add list item and button to DOM 
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".row");
        let divElement = document.createElement("div");
        pokemonList.appendChild(divElement);
        divElement.classList.add("list-group-item", "col-sm-6", "col-md-4", "col-lg-3");
        divElement.id = pokemon.name;

        let button = document.createElement("button");
        button.innerText = pokemon.name + '\n';
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#exampleModal");
        divElement.appendChild(button);
        button.classList.add('btn', 'btn-info', 'btn-lg', 'btn-block', 'list-btn');

        // Add pokemon image to button
        let buttonImage = document.createElement('img');
        buttonImage.classList.add('button-img');
        buttonImage.alt = 'pokemon name';
        buttonImage.src = pokemon.imageUrlFront;
        buttonImage.style = "width:70px";
        button.appendChild(buttonImage);

        // Add event listener to button
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        loadDetails(pokemon).then(function () {
            buttonImage.src = pokemon.imageUrlFront;
        });
    }

    // Load list of pokemon from API
    async function loadList() {
        try {
            const response = await fetch(apiUrl);
            const json = await response.json();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add(pokemon);
                console.log(pokemon);
            });
        } catch (e) {
            console.error(e);
        }
    }

    // Load details of pokemon from API
    async function loadDetails(item) {
        let url = item.detailsUrl;
        // Return JSON response 
        try {
            const response = await fetch(url);
            const details = await response.json();
            item.imageUrlFront = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = details.types.map(function (type) {
                return type.type.name;
            });
            item.abilities = details.abilities.map(function (ability) {
                return ability.ability.name;
            });
        } catch (e) {
            console.error(e);
        }
    }
    // Show pokemon details
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
            showModal(item);
        });
    }

    // Show modal
    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        //clear existing content of the modal
        modalTitle.empty();
        modalBody.empty();

        // Create element for name in modal content
        let nameElement = $('<h1>' + item.name + '</h1>');
        // Create img in modal content
        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr('src', item.imageUrlFront);
        //Create element for height 
        let heightElement = $('<p>' + 'Height : ' + item.height + '\'' + '</p>');
        //create element for type 
        let typesElement = $('<p>' + 'Types : ' + item.types.join(', ') + '</p>');
        //create element for abilities
        let abilitiesElement = $('<p>' + 'Abilities : ' + item.abilities.join(', ') + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        filterPokemons: filterPokemons
    };
})();

// Print all pokemons in list
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });

    // Search pokemons by name
    document
        .querySelector("#search-form")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            let searchTerm = document.querySelector("#search-input").value;
            pokemonRepository.filterPokemons(searchTerm);
        });
});
