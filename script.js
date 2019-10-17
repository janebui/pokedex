// Jane Bui, 2019
// API data from https://pokeapi.co/

const pokedex = document.querySelector('.pokedex');
const url = "https://pokeapi.co/api/v2/";
const category = "pokemon";
const pokemonArray = [];
const form = document.querySelector("form");
const input = document.querySelector("input");

// initialize pikachu as the starting pokemon
let pokemon = {
    name: 'pikachu',
    id: '',
    img: '',
    type: '',
    abilities: ''
}

let apiURL = `${url}${category}/${pokemon.name}`;

// fetch data from pokemon API and render to html
function populate(apiURL) {
    fetch(apiURL)
        .then(blob => blob.json())
        .then(data => format(data))

    const format = (data) => {
        let formattedStr = '';
        data.abilities.map((ability, i) => {
            let str = ability.ability.name.replace("-", " ");
            if (i != data.abilities.length - 1) {
                formattedStr += `${str}, `;
            } else {
                formattedStr += str;
            }
        })

        const html = `
    <div class="name">${data.name}</div>
    <img class="img" src=${data.sprites.front_default}>
    <div class="height"><span class="description">Height:</span> ${Math.round(data.height / 3)}'</div>
    <div class="height"><span class="description">Weight:</span> ${Math.round(data.weight / 4)}lbs</div>
    <div class="type"><span class="description">Type:</span> ${data.types[0].type.name}</div>
    <div class="abilities"><span class="description">Abilities:</span> ${formattedStr}</div>
`
        pokedex.innerHTML = html;
    }
}

// searches for another pokemon based on user search input, then repopulates
function search(e) {
    e.preventDefault();
    pokemon.name = input.value.toLowerCase().trim();
    
    apiURL = `${url}${category}/${pokemon.name}`;
    
    this.reset();
    populate(apiURL);
}

form.addEventListener('submit', search)

populate(apiURL);