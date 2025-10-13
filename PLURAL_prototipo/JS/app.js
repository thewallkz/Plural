document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // --- Dados Simulados e Armazenamento ---
    const books = [
        { id: 1, title: 'Dom Casmurro', author: 'Machado de Assis', cover: 'https://m.media-amazon.com/images/I/61x1ZHomWUL.jpg', description: 'Dom Casmurro é um romance escrito por Machado de Assis...', genre: 'Romance' },
        { id: 2, title: 'O Cortiço', author: 'Aluísio Azevedo', cover: 'https://m.media-amazon.com/images/I/61hI7QLrTkL._UF1000,1000_QL80_.jpg', description: 'Obra de Aluísio Azevedo que denuncia a exploração social...', genre: 'Naturalismo' },
        { id: 3, title: 'Grande Sertão: Veredas', author: 'João Guimarães Rosa', cover: 'https://m.media-amazon.com/images/I/81NtboFZziL.jpg', description: 'Narra a história do jagunço Riobaldo...', genre: 'Modernismo' },
        { id: 4, title: 'Vidas Secas', author: 'Graciliano Ramos', cover: 'https://m.media-amazon.com/images/I/618-b9Im6dL._UF1000,1000_QL80_.jpg', description: 'Retrata a vida de uma família de retirantes nordestinos...', genre: 'Modernismo' },
        { id: 5, title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis', cover: 'https://m.media-amazon.com/images/I/91GAAzBixYL._UF894,1000_QL80_.jpg', description: 'Um defunto autor decide narrar suas memórias e reflexões sobre a vida.', genre: 'Realismo' },
        { id: 6, title: 'Capitães da Areia', author: 'Jorge Amado', cover: 'https://m.media-amazon.com/images/I/81t7altQZxL.jpg', description: 'A vida de um grupo de meninos de rua em Salvador na década de 1930.', genre: 'Modernismo' },
        { id: 7, title: 'Macunaíma', author: 'Mário de Andrade', cover: 'https://m.media-amazon.com/images/I/91K-83R88FL._UF1000,1000_QL80_.jpg', description: 'A história do "herói sem nenhum caráter" e suas aventuras pelo Brasil.', genre: 'Modernismo' },
        { id: 8, title: 'A Hora da Estrela', author: 'Clarice Lispector', cover: 'https://m.media-amazon.com/images/I/810Vj9zyi-L._UF1000,1000_QL80_.jpg', description: 'A história da datilógrafa alagoana Macabéa, que vive uma vida anônima e miserável no Rio de Janeiro.', genre: 'Modernismo' },
        { id: 9, title: 'O Quinze', author: 'Rachel de Queiroz', cover: 'https://m.media-amazon.com/images/I/61g43KcOIzL._UF1000,1000_QL80_.jpg', description: 'Retrata a luta do povo nordestino contra a grande seca de 1915.', genre: 'Modernismo' },
        { id: 10, title: 'Iracema', author: 'José de Alencar', cover: 'https://m.media-amazon.com/images/I/81dQ4061MaL.jpg', description: 'O romance entre a "virgem dos lábios de mel" e o colonizador português Martim.', genre: 'Romantismo' },
        { id: 11, title: 'Triste Fim de Policarpo Quaresma', author: 'Lima Barreto', cover: 'https://m.media-amazon.com/images/I/91dS9YlzIWS.jpg', description: 'A história de um nacionalista fervoroso e suas frustrações com a pátria.', genre: 'Pré-Modernismo' },
        { id: 12, title: 'O Auto da Compadecida', author: 'Ariano Suassuna', cover: 'https://images.dlivros.org/Ariano-Suassuna/auto-compadecida-ariano-suassuna_large.webp', description: 'As aventuras de João Grilo e Chicó no sertão nordestino, enfrentando o diabo e a morte.', genre: 'Teatro' },
        { id: 13, title: 'São Bernardo', author: 'Graciliano Ramos', cover: 'https://m.media-amazon.com/images/I/81vFD4lJ6BL.jpg', description: 'A ascensão e queda de Paulo Honório, um homem rude que se torna um grande fazendeiro.', genre: 'Modernismo' },
        { id: 14, title: 'O Guarani', author: 'José de Alencar', cover: 'https://m.media-amazon.com/images/I/7125-MeD+KL.jpg', description: 'O amor proibido entre a nobre Ceci e o índio Peri, que a protege de todos os perigos.', genre: 'Romantismo' },
        { id: 15, title: 'Sagarana', author: 'João Guimarães Rosa', cover: 'https://m.media-amazon.com/images/I/81VvCG8xXWL._UF1000,1000_QL80_.jpg', description: 'Uma coletânea de contos que revelam o universo do sertão mineiro.', genre: 'Modernismo' },
        { id: 16, title: 'O Ateneu', author: 'Raul Pompeia', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGIn69nZ_UiFAD05FqJEmx42jRrXmDKXf3Hg&s', description: 'A vida de Sérgio, um menino que estuda em um colégio interno e enfrenta as pressões da sociedade.', genre: 'Realismo/Naturalismo' },
        { id: 17, title: 'A Moreninha', author: 'Joaquim Manuel de Macedo', cover: 'https://m.media-amazon.com/images/I/61rqadtSs3S._UF1000,1000_QL80_.jpg', description: 'As peripécias de um grupo de jovens estudantes de medicina em uma ilha do Rio de Janeiro.', genre: 'Romantismo' },
        { id: 18, title: 'Morte e Vida Severina', author: 'João Cabral de Melo Neto', cover: 'https://m.media-amazon.com/images/I/71AYPfbv2BL._UF1000,1000_QL80_.jpg', description: 'A trajetória de um retirante nordestino em busca de uma vida melhor na cidade grande.', genre: 'Poema Dramático' },
        { id: 19, title: 'O Noviço', author: 'Martins Pena', cover: 'https://www.lpm.com.br/livros/imagens/novico__o_9788525406231_hd.jpg', description: 'Uma comédia de costumes que critica a hipocrisia e os interesses da sociedade da época.', genre: 'Teatro' }
    ];

    // Carrega análises do localStorage ou inicializa um objeto vazio
    const allAnalyses = JSON.parse(localStorage.getItem('analyses')) || {};

    // --- Templates das Telas (Views) ---

    // Cabeçalho Padrão
    const header = `
        <header class="main-header">
            <div class="user-profile">
                <span>${loggedInUser.name}</span>
                <div class="user-avatar">${loggedInUser.name.charAt(0).toUpperCase()}</div>
            </div>
        </header>`;

    const homeView = `
        ${header}
        <section>
            <h2>Resumo</h2>
            <div class="grid-container">
                <div class="card"><span class="card-number">${allAnalyses[loggedInUser.email]?.length || 0}</span><span class="card-label">Análises</span></div>
                <div class="card"><span class="card-number">04</span><span class="card-label">Obras</span></div>
                <div class="card"><span class="card-number">01</span><span class="card-label">Notificações</span></div>
            </div>
        </section>
        <section>
            <h2>Destaques</h2>
            <div class="grid-container">
                ${books.slice(0, 3).map(book => `
                    <div class="book-card" onclick="navigateTo('detalhes-obra', ${book.id})">
                        <img src="${book.cover}" alt="${book.title}">
                        <div><h3>${book.title}</h3><p>${book.author}</p></div>
                    </div>`).join('')}
            </div>
        </section>`;

    // Função para gerar o template de um card de livro
    function renderBookCard(book) {
    return `
        <div class="book-card" onclick="navigateTo('detalhes-obra', ${book.id})">
                <img src="${book.cover}" alt="${book.title}">
                <div><h3>${book.title}</h3><p>${book.author}</p></div>
            </div>`;
    }

    const obrasView = `
        ${header}
        <section>
            <h2>Catálogo de Obras</h2>
            <div class="search-bar"><input type="text" id="searchInput" placeholder="Pesquisar obras ou autores..."></div>
            <div class="grid-container" id="booksContainer">
                ${books.map(renderBookCard).join('')}
            </div>
        </section>`;
        
    const bookDetailsView = (bookId) => {
        const book = books.find(b => b.id === bookId);
        return `
            ${header}
            <section>
                <div class="book-details-container">
                    <div class="book-cover">
                        <img src="${book.cover}" alt="${book.title}">
                        <button class="btn btn-primary btn-full" onclick="navigateTo('create-analise', ${book.id})">Escrever Análise</button>
                    </div>
                    <div class="book-info">
                        <h2>${book.title}</h2><h3>${book.author}</h3>
                        <h4>Descrição</h4><p>${book.description}</p>
                        <h4>Gênero</h4><p>${book.genre}</p>
                    </div>
                </div>
            </section>`;
    };
    
    // **NOVO**: Tela "Minhas Análises" - FELIPE
    const minhasAnalisesView = () => {
        const userAnalyses = allAnalyses[loggedInUser.email] || [];
        
        let content;
        if (userAnalyses.length === 0) {
            content = `
                <div class="empty-state">
                    <h3>Você ainda não escreveu nenhuma análise.</h3>
                    <p>Que tal escolher uma obra e compartilhar suas ideias?</p>
                    <button class="btn btn-primary" onclick="navigateTo('obras')">Ver catálogo de obras</button>
                </div>`;
        } else {
            content = `
                <div class="analyses-grid">
                    ${userAnalyses.map(analysis => `
                        <div class="analysis-card">
                            <h4>${analysis.bookTitle}</h4>
                            <h3>${analysis.title}</h3>
                            <div class="star-rating-display">${'★'.repeat(analysis.rating)}${'☆'.repeat(5 - analysis.rating)}</div>
                            <p>${analysis.text.substring(0, 150)}...</p>
                        </div>
                    `).join('')}
                </div>`;
        }

        return `
            ${header}
            <section>
                <div class="section-header">
                    <h2>Minhas Análises</h2>
                    <button class="btn" onclick="navigateTo('obras')">Escrever nova análise</button>
                </div>
                ${content}
            </section>`;
    };

 
        
    const defaultView = `${header}<section><h2>Página em Construção</h2></section>`;

    const views = {
        'home': homeView,
        'obras': obrasView,
        'analises': minhasAnalisesView, // Alterado para a nova view
        'notificacoes': defaultView,
        'perfil': defaultView,
    };
    
  // --- Roteamento e Renderização ---
    const renderView = (viewName, params = null) => {
        mainContent.innerHTML = ''; // Limpa o conteúdo antigo
        
        // LÓGICA ESPECIAL PARA A NOSSA NOVA TELA
        if (viewName === 'detalhes-obra') {
            // 1. Busca o conteúdo do arquivo HTML da nova tela
            openBookDetails(params, loggedInUser);
  
            return; // Para a execução aqui para não carregar outra tela por engano
        }

        // Esta é a lógica que você já tinha para as outras telas
        let viewContent;
        if (viewName === 'create-analise') {
            viewContent = createAnaliseView(params);
        } else {
            viewContent = typeof views[viewName] === 'function' ? views[viewName]() : views[viewName] || defaultView;
        }
        mainContent.innerHTML = viewContent;

        if (viewName === 'create-analise') {
            setupStarRating();
            setupAnalysisForm();
        } else if (viewName === 'obras') {
            setupObrasSearch();
        }
    };
    window.navigateTo = (viewName, params) => {
        window.location.hash = viewName + (params ? `/${params}` : '');
    };

    const handleRouteChange = () => {
        const hash = window.location.hash.substring(1) || 'home';
        const [viewName, param] = hash.split('/');
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewName);
        });
        
        renderView(viewName, param ? Number(param) : null);
    };

    // --- Lógica Interativa Específica ---
    function setupStarRating() {
        const stars = document.querySelectorAll('.star-rating .fa-star');
        const ratingInput = document.getElementById('ratingValue');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = star.dataset.value;
                ratingInput.value = rating;
                stars.forEach(s => {
                    s.classList.toggle('selected', s.dataset.value <= rating);
                });
            });
        });
    }

    function setupAnalysisForm() {
        const form = document.getElementById('analysisForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newAnalysis = {
                bookId: form.dataset.bookId,
                bookTitle: form.dataset.bookTitle,
                title: document.getElementById('title').value,
                text: document.getElementById('analysis').value,
                rating: document.getElementById('ratingValue').value
            };
            
            // Salva a análise no localStorage
            const userEmail = loggedInUser.email;
            if (!allAnalyses[userEmail]) {
                allAnalyses[userEmail] = [];
            }
            allAnalyses[userEmail].unshift(newAnalysis); // Adiciona no início
            localStorage.setItem('analyses', JSON.stringify(allAnalyses));

            // Navega para a lista de análises
            navigateTo('analises');
        });
    }
    
    function setupObrasSearch() {
        const searchInput = document.getElementById('searchInput');
        const booksContainer = document.getElementById('booksContainer');

        if (searchInput) {
            searchInput.addEventListener('keyup', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredBooks = books.filter(book =>
                    book.title.toLowerCase().includes(searchTerm) ||
                    book.author.toLowerCase().includes(searchTerm)
                );

                if (filteredBooks.length === 0) {
                    booksContainer.innerHTML = '<p>Nenhuma obra encontrada.</p>';
                } else {
                    booksContainer.innerHTML = filteredBooks.map(renderBookCard).join('');
                }
            });
        }
    }
     
    // --- Inicialização ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.view);
        });
    });
    function openBookDetails(bookId, loggedInUser) {
    const url = './detalhes-obra-view.html';
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar detalhes: ' + response.status + ' -> ' + url);
            return response.text();
        })
        .then(html => {
            const mainContent = document.getElementById('mainContent');
            mainContent.innerHTML = html;

            // Se a função já estiver disponível (arquivo já carregado), chama direto
            if (typeof setupBookDetailsPage === 'function') {
                setupBookDetailsPage(bookId, loggedInUser);
                return;
            }

            // Senão, carrega o script e chama após o load
            const script = document.createElement('script');
            script.src = './JS/detalhes-obra.js';
            script.onload = () => {
                if (typeof setupBookDetailsPage === 'function') {
                    setupBookDetailsPage(bookId, loggedInUser);
                } else {
                    console.error('setupBookDetailsPage não definida após carregar detalhes-obra.js');
                }
            };
            script.onerror = (e) => console.error('Erro ao carregar detalhes-obra.js', e);
            document.body.appendChild(script);
        })
        .catch(err => {
            console.error(err);
            document.getElementById('mainContent').innerHTML = '<h2>Erro ao carregar detalhes da obra.</h2>';
        });
}
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('analyses'); // Opcional: limpar análises no logout
        window.location.href = 'index.html';
    });

    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange(); // Renderiza a view inicial
});