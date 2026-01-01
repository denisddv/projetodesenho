document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const characterInput = document.getElementById('characterInput');
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');

    searchButton.addEventListener('click', searchCharacter);
    characterInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCharacter();
        }
    });

    async function searchCharacter() {
        const characterName = characterInput.value.trim();
        
        if (!characterName) {
            alert('Por favor, digite o nome de um personagem');
            return;
        }

        // Limpar resultados anteriores
        resultsDiv.innerHTML = '';
        loadingDiv.style.display = 'block';

        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(characterName)}`);
            
            if (!response.ok) {
                throw new Error('Personagem não encontrado');
            }

            const data = await response.json();
            displayResults(data.results);
        } catch (error) {
            resultsDiv.innerHTML = `<p class="error">Erro: ${error.message}</p>`;
        } finally {
            loadingDiv.style.display = 'none';
        }
    }

    function displayResults(characters) {
        if (characters.length === 0) {
            resultsDiv.innerHTML = '<p>Nenhum personagem encontrado.</p>';
            return;
        }

        characters.forEach(character => {
            const card = createCharacterCard(character);
            resultsDiv.appendChild(card);
        });
    }

    function createCharacterCard(character) {
        const card = document.createElement('div');
        card.className = 'character-card';

        const img = document.createElement('img');
        img.src = character.Imagen || character.imagen || character.image || 'https://via.placeholder.com/300x300?text=Sem+Imagem';
        img.alt = character.name || 'Personagem';
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/300x300?text=Erro+ao+Carregar';
        };

        const name = document.createElement('h2');
        name.textContent = character.name || 'Nome não disponível';

        const status = document.createElement('p');
        status.innerHTML = `<strong>Status:</strong> ${character.status || 'Desconhecido'}`;

        const species = document.createElement('p');
        species.innerHTML = `<strong>Espécie:</strong> ${character.species || 'Desconhecida'}`;

        const gender = document.createElement('p');
        gender.innerHTML = `<strong>Gênero:</strong> ${character.gender || 'Desconhecido'}`;

        const origin = document.createElement('p');
        origin.innerHTML = `<strong>Origem:</strong> ${character.origin?.name || 'Desconhecida'}`;

        const location = document.createElement('p');
        location.innerHTML = `<strong>Localização:</strong> ${character.location?.name || 'Desconhecida'}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(status);
        card.appendChild(species);
        card.appendChild(gender);
        card.appendChild(origin);
        card.appendChild(location);

        return card;
    }
});