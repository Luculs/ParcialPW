async function buscarPokemon() {
    const pokemonInput = document.getElementById('pokemonInput').value.trim().toLowerCase();
    const pokedexContainer = document.getElementById('pokedex');
    if (!pokemonInput) {
        alert('Por favor, ingresa el nombre o ID de un Pokémon.');
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        
        const pokemon = await response.json();
        pokedexContainer.innerHTML = 
        `
        <div class="pokemonDerecha">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>

        <div class="pokemonIzquierda">
            <p>Número: ${pokemon.id}</p>
            <p>Altura: ${(pokemon.height / 10).toFixed(1)} m</p>
            <p>Peso: ${(pokemon.weight / 10).toFixed(1)} kg</p>
        </div>
        `;
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            alert('Error de red. Por favor, intenta nuevamente.');
        } else {
            alert(error.message);
        }
    }
}