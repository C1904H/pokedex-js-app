// pokemonList array in IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    // Return pokemon array
    function getAll() {
        return pokemonList;
    }

    // Add pokemon item to list
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Error!')
        }
    }

    // Add list item and button to DOM 
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
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

    // Load list of pokemon from API
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json(); //returns promise
        }).then(function (json) { //promise chaining
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // Load details of pokemon from API
    function loadDetails(item) {
        let url = item.detailsUrl;
        // Return JSON response 
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types.map (function (type) {
              return type.type.name;
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {

            // Clear all existing modal content
            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            // Add new modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            // Event listener to close modal with escape key
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                    hideModal();
                }
            });

            // Add event listener to close modal with outside click
            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            });

            // Add pokemon name as modal title
            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            // Add pokemon height and type to modal body
            let contentElement = document.createElement('p');
            contentElement.innerText = 'Height: ' + pokemon.height + '\n' + 'Types: ' + pokemon.types.join(', ');

            // Add pokemon image to modal
            let imgElement = document.createElement('img');
            imgElement.src = pokemon.imageUrl;
            imgElement.alt = pokemon.name;

            // append elements to modal
            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElement);
            modal.appendChild(imgElement);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');
        })

        function hideModal() {
            modalContainer.classList.remove('is-visible');
        }

    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

    })();

    // Print all pokemons in list
    pokemonRepository.loadList().then(function () {
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    })
