// Simpsons API Application
const API_URL = 'https://apisimpsons.fly.dev/api/personagens';

let allCharacters = [];
let filteredCharacters = [];

// Initialize the application
async function init() {
    setupEventListeners();
    await loadCharacters();
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }
}

// Load characters from API
async function loadCharacters() {
    showLoading();
    hideError();
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allCharacters = data;
        filteredCharacters = data;
        
        renderCharacters(filteredCharacters);
        updateStats();
        hideLoading();
    } catch (error) {
        console.error('Error loading characters:', error);
        showError('Failed to load characters. Please try again later.');
        hideLoading();
    }
}

// Render characters to the DOM
function renderCharacters(characters) {
    const charactersGrid = document.getElementById('charactersGrid');
    
    if (!charactersGrid) {
        console.error('Characters grid element not found');
        return;
    }
    
    if (characters.length === 0) {
        charactersGrid.innerHTML = '<p class="no-results">No characters found matching your search.</p>';
        return;
    }
    
    charactersGrid.innerHTML = characters.map(character => createCharacterCard(character)).join('');
    
    // Add click listeners to character cards
    const cards = charactersGrid.querySelectorAll('.character-card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => showCharacterDetails(characters[index]));
    });
}

// Create character card HTML
function createCharacterCard(character) {
    // Prioritize "Imagen" property with capital I
    const imageUrl = character.Imagen || character.imagen || 'https://via.placeholder.com/200x250?text=No+Image';
    const name = character.Nome || character.nome || 'Unknown';
    const occupation = character.Ocupacao || character.ocupacao || 'Unknown';
    
    return `
        <div class="character-card">
            <img src="${imageUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/200x250?text=No+Image'">
            <div class="character-info">
                <h3>${name}</h3>
                <p class="occupation">${occupation}</p>
            </div>
        </div>
    `;
}

// Show character details in modal
function showCharacterDetails(character) {
    const modal = document.getElementById('characterModal');
    const modalContent = document.getElementById('modalCharacterDetails');
    
    if (!modal || !modalContent) {
        console.error('Modal elements not found');
        return;
    }
    
    // Prioritize "Imagen" property with capital I
    const imageUrl = character.Imagen || character.imagen || 'https://via.placeholder.com/300x400?text=No+Image';
    const name = character.Nome || character.nome || 'Unknown';
    const occupation = character.Ocupacao || character.ocupacao || 'Unknown';
    const history = character.Historia || character.historia || 'No history available';
    
    modalContent.innerHTML = `
        <div class="modal-character">
            <img src="${imageUrl}" alt="${name}" onerror="this.src='https://via.placeholder.com/300x400?text=No+Image'">
            <div class="modal-character-info">
                <h2>${name}</h2>
                <p class="modal-occupation"><strong>Occupation:</strong> ${occupation}</p>
                <p class="modal-history"><strong>History:</strong> ${history}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Close modal listeners
    const closeBtn = modal.querySelector('.close');
    const closeButton = modal.querySelector('.close-button');
    
    const closeModal = () => {
        modal.style.display = 'none';
    };
    
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
    
    if (closeButton) {
        closeButton.onclick = closeModal;
    }
    
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
}

// Handle search functionality
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (!searchInput) {
        return;
    }
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredCharacters = allCharacters;
    } else {
        filteredCharacters = allCharacters.filter(character => {
            const name = (character.Nome || character.nome || '').toLowerCase();
            const occupation = (character.Ocupacao || character.ocupacao || '').toLowerCase();
            const history = (character.Historia || character.historia || '').toLowerCase();
            
            return name.includes(searchTerm) || 
                   occupation.includes(searchTerm) || 
                   history.includes(searchTerm);
        });
    }
    
    renderCharacters(filteredCharacters);
    updateStats();
}

// Update statistics
function updateStats() {
    const totalCount = document.getElementById('totalCount');
    const displayedCount = document.getElementById('displayedCount');
    
    if (totalCount) {
        totalCount.textContent = allCharacters.length;
    }
    
    if (displayedCount) {
        displayedCount.textContent = filteredCharacters.length;
    }
}

// Show loading indicator
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'flex';
    }
}

// Hide loading indicator
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    
    if (errorDiv && errorMessage) {
        errorMessage.textContent = message;
        errorDiv.style.display = 'block';
    }
}

// Hide error message
function hideError() {
    const errorDiv = document.getElementById('error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
