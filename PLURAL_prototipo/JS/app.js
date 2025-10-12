document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const navLinks = document.querySelectorAll('.nav-link');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // --- Dados Simulados ---
    const books = [
        { id: 1, title: 'Dom Casmurro', author: 'Machado de Assis', cover: 'https://images-na.ssl-images-amazon.com/images/I/81x4OFVpSML.jpg', description: 'Dom Casmurro é um romance escrito por Machado de Assis...', genre: 'Romance' },
        { id: 2, title: 'O Cortiço', author: 'Aluísio Azevedo', cover: 'https://images-na.ssl-images-amazon.com/images/I/81Gj9S9Ea8L.jpg', description: 'Obra de Aluísio Azevedo que denuncia a exploração social...', genre: 'Naturalismo' },
        { id: 3, title: 'Grande Sertão: Veredas', author: 'João Guimarães Rosa', cover: 'https://images-na.ssl-images-amazon.com/images/I/81T1+dM0V2L.jpg', description: 'Narra a história do jagunço Riobaldo...', genre: 'Modernismo' },
        { id: 4, title: 'Vidas Secas', author: 'Graciliano Ramos', cover: 'https://images-na.ssl-images-amazon.com/images/I/81-3p2+aQZL.jpg', description: 'Retrata a vida de uma família de retirantes nordestinos...', genre: 'Modernismo' },
    ];
    
    // --- Templates das Telas (Views) ---

    const homeView = `
        <header class="main-header">
            <div class="user-profile">
                <span id="userName">${loggedInUser.name}</span>
                <div class="user-avatar">${loggedInUser.name.charAt(0).toUpperCase()}</div>
            </div>
        </header>
        <section>
            <h2>Resumo</h2>
            <div class="grid-container">
                <div class="card"><span class="card-number">12</span><span class="card-label">Análises</span></div>
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
        <header class="main-header"><div class="user-profile"><span>${loggedInUser.name}</span><div class="user-avatar">${loggedInUser.name.charAt(0).toUpperCase()}</div></div></header>
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
            <header class="main-header"><div class="user-profile"><span>${loggedInUser.name}</span><div class="user-avatar">${loggedInUser.name.charAt(0).toUpperCase()}</div></div></header>
            <section>
                <div class="book-details-container">
                    <div class="book-cover"><img src="${book.cover}" alt="${book.title}"></div>
                    <div class="book-info">
                        <h2>${book.title}</h2><h3>${book.author}</h3>
                        <h4>Descrição</h4><p>${book.description}</p>
                        <h4>Gênero</h4><p>${book.genre}</p>
                        <button class="btn">Adicionar aos Favoritos</button>
                    </div>
                </div>
            </section>`;
    };
    
    // Gerenciar Análises Críticas (Requisito R3)
    const analisesView = `
        <header class="main-header"><div class="user-profile"><span>${loggedInUser.name}</span><div class="user-avatar">${loggedInUser.name.charAt(0).toUpperCase()}</div></div></header>
        <section>
            <h2>Criação de Análise</h2>
            <form id="analysisForm">
                <div class="form-group"><label for="title">Título</label><input type="text" id="title" class="form-control"></div>
                <div class="form-group"><label for="analysis">Escreva sua análise aqui</label><textarea id="analysis" class="form-control"></textarea></div>
                <div class="form-group">
                    <label>Sua avaliação</label>
                    <div class="star-rating">
                        <i class="fa-solid fa-star" data-value="1"></i><i class="fa-solid fa-star" data-value="2"></i><i class="fa-solid fa-star" data-value="3"></i><i class="fa-solid fa-star" data-value="4"></i><i class="fa-solid fa-star" data-value="5"></i>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Enviar</button>
            </form>
        </section>`;
        
    const defaultView = `<header class="main-header"><div class="user-profile"><span>${loggedInUser.name}</span><div class="user-avatar">${loggedInUser.name.charAt(0).toUpperCase()}</div></div></header><section><h2>Página em Construção</h2></section>`;

    const views = {
        'home': homeView,
        'obras': obrasView,
        'analises': analisesView,
        'notificacoes': defaultView,
        'perfil': defaultView,
    };
    
    // --- Roteamento e Renderização ---
    const renderView = (viewName, params = null) => {
        mainContent.innerHTML = ''; // Limpa o conteúdo
        if (viewName === 'book-details') {
            mainContent.innerHTML = bookDetailsView(params);
        } else {
            mainContent.innerHTML = views[viewName] || defaultView;
        }
        
        // Adiciona lógica interativa para a view renderizada
        if(viewName === 'analises') {
            setupStarRating();
        }
    };

    window.navigateTo = (viewName, params) => {
        // Simula a navegação alterando o hash
        window.location.hash = viewName + (params ? `/${params}` : '');
    };

    const handleRouteChange = () => {
        const hash = window.location.hash.substring(1);
        const [viewName, param] = hash.split('/');
        
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewName);
        });
        
        renderView(viewName || 'home', param ? Number(param) : null);
    };

    // --- Lógica Interativa Específica ---
    function setupStarRating() {
        const stars = document.querySelectorAll('.star-rating .fa-star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = star.dataset.value;
                stars.forEach(s => {
                    s.classList.toggle('selected', s.dataset.value <= rating);
                });
            });
        });
    }
    
    // --- Inicialização ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.view);
        });
    });

    // Logout (Requisito R1.5)
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });

    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange(); // Renderiza a view inicial
});