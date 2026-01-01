# 🍩 Simpsons Characters - Projeto Front-End

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Sobre o Projeto

Aplicação web front-end desenvolvida como projeto acadêmico que consome dados em tempo real da **API Simpsons** para exibir informações sobre os personagens icônicos da série de TV.

O projeto foi desenvolvido utilizando apenas **HTML, CSS e JavaScript puro** (Vanilla JS), sem frameworks ou bibliotecas externas.

## 🎯 Objetivos

- Consumir dados de uma API REST pública
- Manipular o DOM dinamicamente com JavaScript
- Criar cards de personagens de forma automática
- Implementar funcionalidade de busca/filtro
- Desenvolver interface responsiva e atraente

## 🚀 Funcionalidades

✅ **Consumo de API em tempo real** - Dados atualizados da API Simpsons
✅ **Criação dinâmica de cards** - Elementos HTML gerados via JavaScript
✅ **Sistema de busca** - Filtro de personagens por nome, ocupação ou história
✅ **Design responsivo** - Adaptável a diferentes tamanhos de tela
✅ **Animações suaves** - Efeitos visuais ao carregar e interagir com cards
✅ **Tratamento de erros** - Mensagens claras e opção de tentar novamente

## 🛠️ Tecnologias Utilizadas

### Front-End
- **HTML5** - Estruturação semântica da página
- **CSS3** - Estilização e responsividade
  - Flexbox e Grid Layout
  - Animações e transições
  - Media queries
- **JavaScript (ES6+)** - Lógica e interatividade
  - Fetch API
  - DOM Manipulation
  - Async/Await
  - Event Listeners

### API
- **API Simpsons** - https://apisimpsons.fly.dev/api/personajes?limit=50

## 📁 Estrutura do Projeto

```
projetodesenho/
├── index.html          # Estrutura HTML da página
├── style.css           # Estilos CSS
├── script.js           # Lógica JavaScript
├── README.md           # Documentação do projeto
└── docs/
    └── parte-teorica.pdf   # Documentação teórica (a ser criado)
```

## 🔧 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/denisddv/projetodesenho.git
```

2. Navegue até a pasta do projeto:
```bash
cd projetodesenho
```

3. Abra o arquivo `index.html` em seu navegador
   - Ou use uma extensão como Live Server no VS Code

## 💡 Conceitos Técnicos Aplicados

### 1. Fetch API
Utilizada para fazer requisições HTTP à API dos Simpsons:
```javascript
const response = await fetch(API_URL);
const data = await response.json();
```

### 2. DOM Manipulation
Criação dinâmica de elementos HTML:
```javascript
const card = document.createElement('div');
card.className = 'character-card';
charactersContainer.appendChild(card);
```

### 3. Event Listeners
Captura de eventos do usuário:
```javascript
searchBtn.addEventListener('click', handleSearch);
```

### 4. Array Methods
Filtragem de dados:
```javascript
displayedCharacters = allCharacters.filter(character => 
    character.Nombre.toLowerCase().includes(searchTerm)
);
```

## 📊 Funcionalidades da API

A API Simpsons retorna dados estruturados com as seguintes informações:

- **Nombre** - Nome do personagem
- **Imagen** - URL da imagem
- **Ocupacion** - Ocupação do personagem
- **Historia** - História/descrição
- **VozOriginal** - Dublador original

## 🎨 Design e UX

- **Paleta de cores** inspirada nos Simpsons (amarelo, azul)
- **Layout em grid** responsivo
- **Cards interativos** com hover effects
- **Loading spinner** durante carregamento
- **Mensagens de erro** amigáveis

## 📱 Responsividade

O projeto é totalmente responsivo, adaptando-se a:
- 📱 Smartphones (< 480px)
- 📱 Tablets (480px - 768px)
- 💻 Desktops (> 768px)

## 🔍 Próximas Melhorias

- [ ] Paginação dos resultados
- [ ] Modal para detalhes completos do personagem
- [ ] Filtros avançados (por ocupação, primeira aparição, etc.)
- [ ] Favoritar personagens (localStorage)
- [ ] Dark mode
- [ ] Compartilhamento em redes sociais

## 👨‍💻 Autor

**Denis** - [@denisddv](https://github.com/denisddv)

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

## 📚 Referências

- [MDN - Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [MDN - createElement](https://developer.mozilla.org/pt-BR/docs/Web/API/Document/createElement)
- [MDN - appendChild](https://developer.mozilla.org/pt-BR/docs/Web/API/Node/appendChild)
- [API Simpsons Documentation](https://apisimpsons.fly.dev)

---

⭐ **Desenvolvido com dedicação para o projeto acadêmico de Desenvolvimento Front-End**