const listaPokemon = document.querySelector("#listaPokemon");
const botonesTipoPoke = document.querySelectorAll(".btn-header");
const menuBtn = document.getElementById("btn-menu");
const close_menu = document.getElementById("close-menu-btn");
let modal = document.getElementById("myModal");


let URL = "https://pokeapi.co/api/v2/pokemon/";

let pokemonArray = [];


for (let i = 1; i <= 1010; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            const pokemon = data;
            pokemonArray.push(pokemon);
            mostrarPokemon(pokemon);
        });
       
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
       
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            
            <div>
                <button class="btn btn-header normal" id="pkid-${poke.id.toString()}">Info</button>
            </div>
        </div>
    `;
    listaPokemon.append(div);
  
}

function buscarPokemon(pokeId){

    let n = pokemonArray.length;
    console.log("length:"+n);
   

    for (let i = 0; i <= n ; i++) 
    {
        const pokemon = pokemonArray[i];
        
        if (pokemon.id === pokeId) 
        {
            return pokemon;   
        }
    }
    return null;
}

botonesTipoPoke.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    console.log(botonId);
    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}));

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText; 
     
    console.log(target.id); 
    
    let tokenizer = target.id.split("-");
    
    let pokeId = Number(tokenizer[1]);

    console.log(pokeId);

    if (tokenizer[0]==="pkid"){

        pokemon = buscarPokemon(pokeId );

        
        let tipos = pokemon.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join('');
        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.classList.add("poke-modal");
        div.innerHTML = `
            <p class="pokemon-id-back">#${pokemon.id}</p>
            <div class="pokemon-imagen">
                <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokemon.id}</p>
                    <h2 class="pokemon-nombre">${pokemon.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${pokemon.height/10}m</p>
                    <p class="stat">${pokemon.weight/10}kg</p>
                </div>
                
            </div>
        `;
        modal.appendChild(div);
        modal.style.display = "block";

    }
    if (target == modal) {
        let select = document.getElementsByClassName("poke-modal");
        select[0].remove();
        modal.style.display = "none";
    }

}, false);


menuBtn.addEventListener('click',function(e){
    e.preventDefault();
    document.getElementById("Poke-Sidenav").style.width = "250px";
})

close_menu.addEventListener('click',function(e){
    e.preventDefault();
    document.getElementById("Poke-Sidenav").style.width = "0px";
})
