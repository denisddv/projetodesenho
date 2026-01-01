// Configuração da API
const API_URL = 'https://apisimpsons.fly.dev/api/personajes?limit=50';
const cardsContainer = document.getElementById('cards-container');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const loadMoreBtn = document.getElementById('load-more');

let allCharacters = [];
let filteredCharacters = [];
let currentPage = 0;
const charactersPerPage = 12;

// Função para buscar personagens da API
async function fetchCharacters() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allCharacters = data;
        filteredCharacters = [...allCharacters];
        displayCharacters();
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        cardsContainer.innerHTML = '<p class="error">Erro ao carregar personagens. Tente novamente mais tarde.</p>';
    }
}

// Função para exibir personagens
function displayCharacters() {
    const start = currentPage * charactersPerPage;
    const end = start + charactersPerPage;
    const charactersToShow = filteredCharacters.slice(start, end);

    charactersToShow.forEach(character => {
        const card = createCard(character);
        cardsContainer.appendChild(card);
    });

    // Controlar visibilidade do botão "Carregar Mais"
    if (end >= filteredCharacters.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Função para criar um card de personagem
function createCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <img src="${character.imagem}" alt="${character.nome}">
        <h3>${character.nome}</h3>
        <p><strong>Ocupação:</strong> ${character.ocupacao || 'Não especificada'}</p>
        <p><strong>Primeira aparição:</strong> ${character.primeiraAparicao || 'Não especificada'}</p>
    `;
    
    return card;
}

// Função de busca
function searchCharacters() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredCharacters = allCharacters.filter(character => 
        character.nome.toLowerCase().includes(searchTerm)
    );
    resetDisplay();
}

// Função de filtro
function filterCharacters() {
    const filterValue = filterSelect.value;
    
    if (filterValue === 'all') {
        filteredCharacters = [...allCharacters];
    } else {
        filteredCharacters = allCharacters.filter(character => 
            character.ocupacao && character.ocupacao.toLowerCase().includes(filterValue.toLowerCase())
        );
    }
    
    resetDisplay();
}

// Resetar exibição
function resetDisplay() {
    cardsContainer.innerHTML = '';
    currentPage = 0;
    displayCharacters();
}

// Carregar mais personagens
function loadMore() {
    currentPage++;
    displayCharacters();
}

// Event Listeners
searchInput.addEventListener('input', searchCharacters);
filterSelect.addEventListener('change', filterCharacters);
loadMoreBtn.addEventListener('click', loadMore);

// Inicializar
fetchCharacters();
