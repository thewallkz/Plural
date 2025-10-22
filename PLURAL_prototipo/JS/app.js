document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // --- Dados Simulados ---
    // (A descrição e o gênero foram removidos pois não são usados na listagem)
    const books = [
        { id: 1, title: 'Dom Casmurro', author: 'Machado de Assis', cover: 'https://m.media-amazon.com/images/I/61x1ZHomWUL.jpg' },
        { id: 2, title: 'O Cortiço', author: 'Aluísio Azevedo', cover: 'https://m.media-amazon.com/images/I/61hI7QLrTkL._UF1000,1000_QL80_.jpg' },
        { id: 3, title: 'Grande Sertão: Veredas', author: 'João Guimarães Rosa', cover: 'https://m.media-amazon.com/images/I/81NtboFZziL.jpg' },
        { id: 4, title: 'Vidas Secas', author: 'Graciliano Ramos', cover: 'https://m.media-amazon.com/images/I/618-b9Im6dL._UF1000,1000_QL80_.jpg' },
        { id: 5, title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis', cover: 'https://m.media-amazon.com/images/I/91GAAzBixYL._UF894,1000_QL80_.jpg' },
        { id: 6, title: 'Capitães da Areia', author: 'Jorge Amado', cover: 'https://m.media-amazon.com/images/I/81t7altQZxL.jpg' },
        { id: 7, title: 'Macunaíma', author: 'Mário de Andrade', cover: 'https://m.media-amazon.com/images/I/91K-83R88FL._UF1000,1000_QL80_.jpg' },
        { id: 8, title: 'A Hora da Estrela', author: 'Clarice Lispector', cover: 'https://m.media-amazon.com/images/I/810Vj9zyi-L._UF1000,1000_QL80_.jpg' },
        { id: 9, title: 'O Quinze', author: 'Rachel de Queiroz', cover: 'https://m.media-amazon.com/images/I/61g43KcOIzL._UF1000,1000_QL80_.jpg' },
        { id: 10, title: 'Iracema', author: 'José de Alencar', cover: 'https://m.media-amazon.com/images/I/81dQ4061MaL.jpg' },
        { id: 11, title: 'Triste Fim de Policarpo Quaresma', author: 'Lima Barreto', cover: 'https://m.media-amazon.com/images/I/91dS9YlzIWS.jpg' },
        { id: 12, title: 'O Auto da Compadecida', author: 'Ariano Suassuna', cover: 'https://images.dlivros.org/Ariano-Suassuna/auto-compadecida-ariano-suassuna_large.webp' },
        { id: 13, title: 'São Bernardo', author: 'Graciliano Ramos', cover: 'https://m.media-amazon.com/images/I/81vFD4lJ6BL.jpg' },
        { id: 14, title: 'O Guarani', author: 'José de Alencar', cover: 'https://m.media-amazon.com/images/I/7125-MeD+KL.jpg' },
        { id: 15, title: 'Sagarana', author: 'João Guimarães Rosa', cover: 'https://m.media-amazon.com/images/I/81VvCG8xXWL._UF1000,1000_QL80_.jpg' },
        { id: 16, title: 'O Ateneu', author: 'Raul Pompeia', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGIn69nZ_UiFAD05FqJEmx42jRrXmDKXf3Hg&s' },
        { id: 17, title: 'A Moreninha', author: 'Joaquim Manuel de Macedo', cover: 'https://m.media-amazon.com/images/I/61rqadtSs3S._UF1000,1000_QL80_.jpg' },
        { id: 18, title: 'Morte e Vida Severina', author: 'João Cabral de Melo Neto', cover: 'https://m.media-amazon.com/images/I/71AYPfbv2BL._UF1000,1000_QL80_.jpg' },
        { id: 19, title: 'O Noviço', author: 'Martins Pena', cover: 'https://www.lpm.com.br/livros/imagens/novico__o_9788525406231_hd.jpg' }
    ];

    // --- Funções de Renderização ---

    /**
     * Preenche o cabeçalho padrão com nome e avatar do usuário.
     */
    function populateHeader() {
        const userNameEl = document.getElementById('userName');
        const userAvatarEl = document.getElementById('userAvatar');
        if (userNameEl && userAvatarEl) {
            userNameEl.textContent = loggedInUser.name;
            userAvatarEl.textContent = loggedInUser.name.charAt(0).toUpperCase();
        }
    }

    /**
     * Cria um elemento de card de livro a partir do template HTML.
     * @param {object} book - O objeto do livro.
     * @returns {HTMLElement} O elemento do card pronto.
     */
    function createBookCard(book) {
        const template = document.getElementById('book-card-template');
        // Clona o conteúdo do template
        const card = template.content.cloneNode(true).firstElementChild;
        
        // Preenche os dados
        card.querySelector('img').src = book.cover;
        card.querySelector('img').alt = book.title;
        card.querySelector('h3').textContent = book.title;
        card.querySelector('p').textContent = book.author;
        
        // Adiciona o evento de clique
        card.addEventListener('click', () => navigateTo('detalhes-obra', book.id));
        return card;
    }
    
    /**
     * Carrega o HTML de uma view (página) e insere no mainContent.
     * @param {string} viewName - O nome da view (ex: 'home', 'obras').
     */
    async function loadView(viewName) {
        // Define um mapa para as views padrão que não carregam de arquivos
        const defaultViews = {
            'notificacoes': `${populateHeader()} <section><h2>Página em Construção</h2></section>`,
            'perfil': `${populateHeader()} <section><h2>Página em Construção</h2></section>`
        };

        if (defaultViews[viewName]) {
             mainContent.innerHTML = defaultViews[viewName];
             populateHeader(); // Garante que o cabeçalho seja preenchido
             return;
        }

        try {
            // Tenta carregar os arquivos HTML da pasta /views/
            const response = await fetch(`views/${viewName}-view.html`);
            if (!response.ok) throw new Error(`Não foi possível carregar a view: ${viewName}`);
            
            mainContent.innerHTML = await response.text();
            populateHeader(); // Popula o cabeçalho após a view ser inserida
        
        } catch (error) {
            mainContent.innerHTML = `<h2>Erro ao carregar a página</h2><p>${error.message}</p>`;
            console.error(error);
        }
    }

    /**
     * Renderiza a view principal, carregando o HTML e executando a lógica JS específica.
     * @param {string} viewName - O nome da view.
     * @param {number|null} params - Parâmetros (ex: ID do livro).
     */
    async function renderView(viewName, params = null) {
        // Caso especial: 'detalhes-obra' carrega um arquivo HTML raiz
        if (viewName === 'detalhes-obra') {
            openBookDetails(params, loggedInUser);
            return;
        }

        // Carrega o HTML da view (ex: home-view.html)
        await loadView(viewName);

        // Executa a lógica JavaScript específica para cada view
        // APÓS o HTML ter sido carregado
        if (viewName === 'home') {
            const allInteractions = JSON.parse(localStorage.getItem('pluralBookInteractions')) || {};
            let userAnalysesCount = 0;
            for (const bookId in allInteractions) {
                userAnalysesCount += (allInteractions[bookId].analyses || []).filter(
                    a => a.userEmail === loggedInUser.email
                ).length;
            }
            document.getElementById('userAnalysesCount').textContent = userAnalysesCount;
            document.getElementById('totalBooksCount').textContent = books.length;
            
            const destaquesContainer = document.getElementById('destaquesContainer');
            books.slice(0, 3).forEach(book => {
                destaquesContainer.appendChild(createBookCard(book));
            });

        } else if (viewName === 'obras') {
            const booksContainer = document.getElementById('booksContainer');
            if (booksContainer) {
                books.forEach(book => booksContainer.appendChild(createBookCard(book)));
                setupObrasSearch();
            }

        } else if (viewName === 'analises') {
            renderMinhasAnalises();
        }
    }
    
    /**
     * Renderiza o conteúdo da página "Minhas Análises".
     */
    function renderMinhasAnalises() {
        const container = document.getElementById('userAnalysesContainer');
        if (!container) return; // Sai se o container não existir

        const allInteractions = JSON.parse(localStorage.getItem('pluralBookInteractions')) || {};
        const userAnalyses = [];

        for (const bookId in allInteractions) {
            const bookInfo = books.find(b => b.id == bookId);
            if (bookInfo) {
                const analysesForBook = (allInteractions[bookId].analyses || []).filter(
                    analysis => analysis.userEmail === loggedInUser.email
                );
                analysesForBook.forEach(analysis => userAnalyses.push({ ...analysis, bookTitle: bookInfo.title, bookId: bookInfo.id }));
            }
        }
        
        if (userAnalyses.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>Você ainda não escreveu nenhuma análise.</h3>
                    <p>Que tal escolher uma obra e compartilhar suas ideias?</p>
                    <button class="btn btn-primary" onclick="navigateTo('obras')">Ver catálogo de obras</button>
                </div>`;
        } else {
            const grid = document.createElement('div');
            grid.className = 'analyses-grid';
            
            userAnalyses.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordena por mais recente

            userAnalyses.forEach(analysis => {
                const ratingObj = (allInteractions[analysis.bookId]?.ratings || []).find(r => r.user === loggedInUser.email);
                const rating = ratingObj ? ratingObj.rating : 0;
                
                const card = document.createElement('div');
                card.className = 'analysis-card';
                card.innerHTML = `
                    <h4>${analysis.bookTitle}</h4>
                    <div class="star-rating-display">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
                    <p>${analysis.text.substring(0, 150)}...</p>
                `;
                // Adiciona clique para navegar para o detalhe da obra
                card.addEventListener('click', () => navigateTo('detalhes-obra', analysis.bookId));
                grid.appendChild(card);
            });
            container.innerHTML = ''; // Limpa o container
            container.appendChild(grid);
        }
    }

    // --- Navegação e Roteamento ---

    /**
     * Altera a hash da URL para disparar a mudança de rota.
     * @param {string} viewName - A view de destino.
     * @param {any} params - Parâmetros para a rota.
     */
    window.navigateTo = (viewName, params) => {
        window.location.hash = viewName + (params ? `/${params}` : '');
    };

    /**
     * Manipula a mudança de hash na URL, lendo a nova rota e renderizando a view.
     */
    const handleRouteChange = () => {
        const hash = window.location.hash.substring(1) || 'home';
        const [viewName, param] = hash.split('/');
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewName);
        });
        
        renderView(viewName, param ? Number(param) : null);
    };
    
    /**
     * Configura o listener de 'input' para a barra de pesquisa na página de Obras.
     */
    function setupObrasSearch() {
        const searchInput = document.getElementById('searchInput');
        const booksContainer = document.getElementById('booksContainer');
        if (!searchInput || !booksContainer) return;

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            );
            
            booksContainer.innerHTML = ''; // Limpa o container
            if (filteredBooks.length === 0) {
                booksContainer.innerHTML = '<p>Nenhuma obra encontrada.</p>';
            } else {
                filteredBooks.forEach(book => booksContainer.appendChild(createBookCard(book)));
            }
        });
    }
     
    /**
     * Carrega o HTML de 'detalhes-obra-view.html' e inicializa seu script.
     * @param {number} bookId - O ID do livro.
     * @param {object} loggedInUser - O objeto do usuário logado.
     */
    function openBookDetails(bookId, loggedInUser) {
        fetch('./detalhes-obra-view.html')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar detalhes-obra-view.html');
                return response.text();
            })
            .then(html => {
                mainContent.innerHTML = html;
                // Verifica se a função (do detalhes-obra.js) já está carregada
                if (typeof setupBookDetailsPage === 'function') {
                    setupBookDetailsPage(bookId, loggedInUser);
                } else {
                    console.error('A função setupBookDetailsPage não está definida. Verifique se detalhes-obra.js está sendo carregado.');
                }
            })
            .catch(err => {
                console.error(err);
                mainContent.innerHTML = '<h2>Erro ao carregar detalhes da obra.</h2>';
            });
    }

    // --- Inicialização ---

    // Listener de clique para o botão Logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });

    // Listener para mudanças na hash (navegação)
    window.addEventListener('hashchange', handleRouteChange);
    
    // Renderiza a view inicial com base na hash atual (ou 'home' se não houver)
    handleRouteChange();
});