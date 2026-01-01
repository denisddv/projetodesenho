// Configuração da API
const API_URL = 'https://apisimpsons.fly.dev/api/personajes?limit=50';

// Variáveis globais
let allCharacters = [];
let displayedCharacters = [];

// Elementos do DOM
const charactersContainer = document.getElementById('characters');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const retryBtn = document.getElementById('retryBtn');
const totalCharactersElement = document.getElementById('totalCharacters');

/**
 * Função principal que inicializa a aplicação
 */
function init() {
    console.log('Iniciando aplicação...');
    loadCharacters();
    setupEventListeners();
}

/**
 * Configura os event listeners
 */
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    retryBtn.addEventListener('click', () => {
        hideError();
        loadCharacters();
    });
}

/**
 * Carrega os personagens da API usando Fetch
 */
async function loadCharacters() {
    showLoading();
    hideError();

    try {
        console.log('Fazendo requisição para API...');
        
        // Usando Fetch API para consumir dados
        const response = await fetch(API_URL);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Converte a resposta para JSON
        const data = await response.json();
        
        console.log('Dados recebidos:', data);
        console.log('Tipo de dados:', typeof data);
        console.log('É array?', Array.isArray(data));
        
        // A API retorna um array diretamente, não um objeto com docs
        if (Array.isArray(data)) {
            allCharacters = data;
        } else if (data.docs && Array.isArray(data.docs)) {
            allCharacters = data.docs;
        } else {
            allCharacters = [];
        }
        
        console.log('Total de personagens:', allCharacters.length);
        displayedCharacters = allCharacters;
        
        // Renderiza os personagens
        renderCharacters(displayedCharacters);
        updateStats();
        
        hideLoading();
        
    } catch (error) {
        console.error('Erro ao carregar personagens:', error);
        hideLoading();
        showError();
    }
}

/**
 * Renderiza os cards de personagens dinamicamente
 * Esta função cria elementos HTML usando JavaScript
 */
function renderCharacters(characters) {
    // Limpa o container
    charactersContainer.innerHTML = '';
    
    if (!characters || characters.length === 0) {
        charactersContainer.innerHTML = '<p class="no-results">Nenhum personagem encontrado.</p>';
        return;
    }
    
    console.log('Renderizando', characters.length, 'personagens');
    
    // Itera sobre cada personagem e cria um card
    characters.forEach((character, index) => {
        const card = createCharacterCard(character, index);
        charactersContainer.appendChild(card);
    });
}

/**
 * Cria um card de personagem usando DOM manipulation
 * Demonstra o uso de createElement e appendChild
 */
function createCharacterCard(character, index) {
    console.log('Criando card para:', character);
    
    // Cria o elemento principal do card
    const card = document.createElement('div');
    card.className = 'character-card';
    card.style.animationDelay = `${index * 0.05}s`;
    
    // Cria e adiciona a imagem
    const img = document.createElement('img');
    img.className = 'character-image';
    // Tenta diferentes possíveis nomes de propriedade da imagem
    img.src = character.imagen || character.Imagen || character.image || 'https://via.placeholder.com/300x300?text=Sem+Imagem';
    img.alt = character.Nombre || character.nombre || character.name || 'Personagem';
    img.loading = 'lazy';
    
    // Adiciona tratamento de erro para imagem
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/300x300?text=Simpsons';
    };
    
    card.appendChild(img);
    
    // Cria o container de informações
    const infoDiv = document.createElement('div');
    infoDiv.className = 'character-info';
    
    // Cria e adiciona o nome
    const name = document.createElement('h3');
    name.className = 'character-name';
    name.textContent = character.Nombre || character.nombre || character.name || 'Nome desconhecido';
    infoDiv.appendChild(name);
    
    // Cria e adiciona a ocupação (se existir)
    const occupation = character.Ocupacion || character.ocupacion || character.occupation;
    if (occupation) {
        const occupationP = document.createElement('p');
        occupationP.className = 'character-occupation';
        occupationP.textContent = `Ocupação: ${occupation}`;
        infoDiv.appendChild(occupationP);
    }
    
    // Cria e adiciona a descrição (se existir)
    const historia = character.Historia || character.historia || character.history || character.description;
    if (historia) {
        const description = document.createElement('p');
        description.className = 'character-description';
        // Limita a descrição a 100 caracteres
        const shortHistory = historia.length > 100 
            ? historia.substring(0, 100) + '...' 
            : historia;
        description.textContent = shortHistory;
        infoDiv.appendChild(description);
    }
    
    // Adiciona o container de informações ao card
    card.appendChild(infoDiv);
    
    // Adiciona evento de click para mostrar mais detalhes
    card.addEventListener('click', () => {
        showCharacterDetails(character);
    });
    
    return card;
}

/**
 * Mostra detalhes do personagem em um alert (pode ser melhorado com um modal)
 */
function showCharacterDetails(character) {
    const nome = character.Nombre || character.nombre || character.name || 'Nome desconhecido';
    const ocupacao = character.Ocupacion || character.ocupacion || character.occupation || 'Não informada';
    const historia = character.Historia || character.historia || character.history || 'Não disponível';
    const voz = character.VozOriginal || character.vozOriginal || character.voice || 'Não informada';
    
    const details = `
🎭 ${nome}

👔 Ocupação: ${ocupacao}

📖 História: ${historia}

🎤 Voz original: ${voz}
    `.trim();
    
    alert(details);
}

/**
 * Função de busca/filtro de personagens
 */
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayedCharacters = allCharacters;
    } else {
        displayedCharacters = allCharacters.filter(character => {
            const name = (character.Nombre || character.nombre || '').toLowerCase();
            const occupation = (character.Ocupacion || character.ocupacion || '').toLowerCase();
            const history = (character.Historia || character.historia || '').toLowerCase();
            
            return name.includes(searchTerm) || 
                   occupation.includes(searchTerm) || 
                   history.includes(searchTerm);
        });
    }
    
    renderCharacters(displayedCharacters);
    updateStats();
}

/**
 * Atualiza as estatísticas
 */
function updateStats() {
    totalCharactersElement.textContent = displayedCharacters.length;
}

/**
 * Funções de controle de UI
 */
function showLoading() {
    loadingElement.style.display = 'block';
    charactersContainer.style.display = 'none';
}

function hideLoading() {
    loadingElement.style.display = 'none';
    charactersContainer.style.display = 'grid';
}

function showError() {
    errorElement.style.display = 'block';
}

function hideError() {
    errorElement.style.display = 'none';
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);

// Log para debug
console.log('Script carregado com sucesso!');