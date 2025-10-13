document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // --- Dados Simulados e Armazenamento ---
    const books = [
        { id: 1, title: 'Dom Casmurro', author: 'Machado de Assis', cover: 'https://images-na.ssl-images-amazon.com/images/I/81x4OFVpSML.jpg', description: 'Dom Casmurro é um romance escrito por Machado de Assis...', genre: 'Romance' },
        { id: 2, title: 'O Cortiço', author: 'Aluísio Azevedo', cover: 'https://images-na.ssl-images-amazon.com/images/I/81Gj9S9Ea8L.jpg', description: 'Obra de Aluísio Azevedo que denuncia a exploração social...', genre: 'Naturalismo' },
        { id: 3, title: 'Grande Sertão: Veredas', author: 'João Guimarães Rosa', cover: 'https://images-na.ssl-images-amazon.com/images/I/81T1+dM0V2L.jpg', description: 'Narra a história do jagunço Riobaldo...', genre: 'Modernismo' },
        { id: 4, title: 'Vidas Secas', author: 'Graciliano Ramos', cover: 'https://images-na.ssl-images-amazon.com/images/I/81-3p2+aQZL.jpg', description: 'Retrata a vida de uma família de retirantes nordestinos...', genre: 'Modernismo' },
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
                    <div class="book-card" onclick="navigateTo('book-details', ${book.id})">
                        <img src="${book.cover}" alt="${book.title}">
                        <div><h3>${book.title}</h3><p>${book.author}</p></div>
                    </div>`).join('')}
            </div>
        </section>`;

    const obrasView = `
        ${header}
        <section>
            <h2>Catálogo de Obras</h2>
            <div class="search-bar"><input type="text" placeholder="Pesquisar obras..."></div>
            <div class="grid-container">
                ${books.map(book => `
                    <div class="book-card" onclick="navigateTo('book-details', ${book.id})">
                        <img src="${book.cover}" alt="${book.title}">
                        <div><h3>${book.title}</h3><p>${book.author}</p></div>
                    </div>`).join('')}
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
    
    // **NOVO**: Tela "Minhas Análises"
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

    const createAnaliseView = (bookId) => {
        const book = books.find(b => b.id === bookId);
        return `
            ${header}
            <section>
                <h2>Criação de Análise para: ${book.title}</h2>
                <form id="analysisForm" data-book-id="${book.id}" data-book-title="${book.title}">
                    <div class="form-group"><label for="title">Título da sua análise</label><input type="text" id="title" class="form-control" required></div>
                    <div class="form-group"><label for="analysis">Escreva sua análise aqui</label><textarea id="analysis" class="form-control" required></textarea></div>
                    <div class="form-group">
                        <label>Sua avaliação</label>
                        <div class="star-rating">
                            <i class="fa-solid fa-star" data-value="1"></i><i class="fa-solid fa-star" data-value="2"></i><i class="fa-solid fa-star" data-value="3"></i><i class="fa-solid fa-star" data-value="4"></i><i class="fa-solid fa-star" data-value="5"></i>
                        </div>
                        <input type="hidden" id="ratingValue" name="rating" value="0">
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar Análise</button>
                </form>
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
        mainContent.innerHTML = ''; // Limpa o conteúdo
        
        let viewContent;
        if (viewName === 'book-details') {
            viewContent = bookDetailsView(params);
        } else if (viewName === 'create-analise') {
            viewContent = createAnaliseView(params);
        } else {
            // Se a view for uma função (como minhasAnalisesView), execute-a
            viewContent = typeof views[viewName] === 'function' ? views[viewName]() : views[viewName] || defaultView;
        }
        mainContent.innerHTML = viewContent;
        
        // Adiciona lógica interativa para a view renderizada
        if (viewName === 'create-analise') {
            setupStarRating();
            setupAnalysisForm();
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
    
    // --- Inicialização ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.view);
        });
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('analyses'); // Opcional: limpar análises no logout
        window.location.href = 'index.html';
    });

    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange(); // Renderiza a view inicial
});
