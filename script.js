// Seleção de elementos do DOM com verificação de existência
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const characterCards = document.getElementById('character-cards');
const modal = document.getElementById('character-modal');
const modalContent = document.getElementById('modal-character-info');
const closeModal = document.querySelector('.close');

// Variável para armazenar todos os personagens
let allCharacters = [];

// Função para buscar personagens da API
async function fetchCharacters() {
    try {
        const response = await fetch('https://apisimpsons.fly.dev/api/personajes?limit=50');
        const data = await response.json();
        allCharacters = data.docs || data;
        displayCharacters(allCharacters);
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        if (characterCards) {
            characterCards.innerHTML = '<p>Erro ao carregar personagens. Tente novamente mais tarde.</p>';
        }
    }
}

// Função para exibir personagens
function displayCharacters(characters) {
    if (!characterCards) return;
    
    characterCards.innerHTML = '';
    
    if (characters.length === 0) {
        characterCards.innerHTML = '<p>Nenhum personagem encontrado.</p>';
        return;
    }
    
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${character.imagen || 'placeholder.jpg'}" alt="${character.nombre || 'Personagem'}">
            <h3>${character.nombre || 'Nome desconhecido'}</h3>
        `;
        card.addEventListener('click', () => showCharacterDetails(character));
        characterCards.appendChild(card);
    });
}

// Função para mostrar detalhes do personagem no modal
function showCharacterDetails(character) {
    if (!modal || !modalContent) return;
    
    modalContent.innerHTML = `
        <img src="${character.imagen || 'placeholder.jpg'}" alt="${character.nombre || 'Personagem'}">
        <h2>${character.nombre || 'Nome desconhecido'}</h2>
        <p><strong>Ocupação:</strong> ${character.ocupacion || 'Desconhecida'}</p>
        <p><strong>Primeira aparição:</strong> ${character.primera_aparicion || 'Desconhecida'}</p>
        <p><strong>Dublador:</strong> ${character.doblador || 'Desconhecido'}</p>
    `;
    modal.style.display = 'block';
}

// Função para filtrar personagens
function filterCharacters() {
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCharacters = allCharacters.filter(character => 
        (character.nombre || '').toLowerCase().includes(searchTerm)
    );
    displayCharacters(filteredCharacters);
}

// Event Listeners com verificação de null
if (searchButton) {
    searchButton.addEventListener('click', filterCharacters);
}

if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterCharacters();
        }
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Carregar personagens ao iniciar
fetchCharacters();
