function setupBookDetailsPage(bookId, loggedInUser) {
    // Simula a busca de dados de livros (os dados são os mesmos que você forneceu)
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

    const currentBook = books.find(b => b.id === bookId);
    if (!currentBook) {
        // Presumindo que o mainContent está na dashboard.html
        document.getElementById('mainContent').innerHTML = '<h2>Obra não encontrada</h2>'; 
        return;
    }

    // --- Elementos do DOM ---
    const viewContainer = document.getElementById('detalhes-obra-view');
    const bookCover = document.getElementById('bookCover');
    const bookTitle = document.getElementById('bookTitle');
    const bookAuthor = document.getElementById('bookAuthor');
    const bookDescription = document.getElementById('bookDescription');
    const averageStars = document.getElementById('averageStars');
    const ratingsCount = document.getElementById('ratingsCount');
    const userRatingStars = document.querySelectorAll('#userRatingStars .fa-star');
    const likeBookButton = document.getElementById('likeBookButton');
    const bookLikesCount = document.getElementById('bookLikesCount');
    const newAnalysisForm = document.getElementById('newAnalysisForm');
    const newAnalysisText = document.getElementById('newAnalysisText');
    const analysesList = document.getElementById('analysesList');
    // NOVO: Referência ao container dos controles
    const analysisControls = document.getElementById('analysisControls'); 
    
    document.getElementById('userName').textContent = loggedInUser.name;
    document.getElementById('userAvatar').textContent = loggedInUser.name.charAt(0).toUpperCase();
    
    // --- Gerenciamento de Dados com localStorage ---
    const getDb = () => JSON.parse(localStorage.getItem('pluralBookInteractions')) || {};
    const saveDb = (db) => localStorage.setItem('pluralBookInteractions', JSON.stringify(db));

    let db = getDb();
    if (!db[bookId]) {
        db[bookId] = { likes: [], ratings: [], analyses: [] };
    }
    let bookData = db[bookId];

    // --- Funções de Renderização ---

    function renderBookInfo() {
        viewContainer.setAttribute('data-book-id', bookId);
        bookCover.src = currentBook.cover;
        bookTitle.textContent = currentBook.title;
        bookAuthor.textContent = currentBook.author;
        bookDescription.textContent = currentBook.description;
    }

    function renderAnalyses() {
        analysesList.innerHTML = ''; 

        // 1. FILTRA AS ANÁLISES: A CORREÇÃO DE PRIVACIDADE ESTÁ AQUI
        const analysesToDisplay = bookData.analyses.filter(analysis => {
            // Regra 1: O usuário logado (dono) sempre vê suas próprias análises
            if (analysis.userEmail === loggedInUser.email) {
                return true;
            }
            // Regra 2: Para análises de terceiros, só mostra se isPublic for explicitamente true.
            // Análises antigas ou não marcadas (undefined/false) serão ocultadas.
            return analysis.isPublic === true;
        });


        if (analysesToDisplay.length === 0) {
            analysesList.innerHTML = '<p>Nenhuma análise pública ainda. Seja o primeiro a comentar!</p>';
            return;
        }

        // 2. RENDERIZA APENAS AS ANÁLISES FILTRADAS
        analysesToDisplay.forEach(analysis => {
            const isLikedByCurrentUser = analysis.likes.includes(loggedInUser.email);
            
            // Verifica se é uma análise privada do usuário logado (para mostrar o cadeado)
            const isPrivateComment = analysis.userEmail === loggedInUser.email && analysis.isPublic !== true;
            
            const analysisElement = document.createElement('div');
            analysisElement.className = 'analysis-item card';
            
            const privacyIndicator = isPrivateComment 
                ? '<span class="privacy-tag">🔒 Análise Privada</span>' 
                : '';
                
            analysisElement.innerHTML = `
                <div class="analysis-header">
                    <div class="analysis-author">
                        <div class="user-avatar small">${analysis.userName.charAt(0).toUpperCase()}</div>
                        <span>${analysis.userName}</span>
                    </div>
                    <span class="analysis-date">${new Date(analysis.date).toLocaleDateString('pt-BR')}</span>
                </div>
                ${privacyIndicator} 
                <div class="analysis-body"><p>${analysis.text}</p></div>
                <div class="analysis-actions">
                    <button class="btn-like-analysis ${isLikedByCurrentUser ? 'liked' : ''}" data-analysis-id="${analysis.id}">
                        <i class="fa-solid fa-thumbs-up"></i> Curtir (<span>${analysis.likes.length}</span>)
                    </button>
                </div>
            `;
            analysesList.appendChild(analysisElement);
        });
    }
    
    function renderRatingsAndLikes() {
        // Lógica mantida
        const totalRatings = bookData.ratings.length;
        const sumOfRatings = bookData.ratings.reduce((sum, r) => sum + r.rating, 0);
        const average = totalRatings > 0 ? (sumOfRatings / totalRatings) : 0;
        
        averageStars.innerHTML = '★'.repeat(Math.round(average)) + '☆'.repeat(5 - Math.round(average));
        ratingsCount.textContent = `(${totalRatings} ${totalRatings === 1 ? 'avaliação' : 'avaliações'})`;

        const currentUserRating = bookData.ratings.find(r => r.user === loggedInUser.email);
        userRatingStars.forEach(star => {
            star.classList.toggle('selected', currentUserRating && star.dataset.value <= currentUserRating.rating);
        });
        
        const isBookLiked = bookData.likes.includes(loggedInUser.email);
        likeBookButton.querySelector('.fa-heart').classList.toggle('liked', isBookLiked);
        bookLikesCount.textContent = bookData.likes.length;
    }

    // --- Lógica de Interação da Text Box (Foco/Blur) ---
    
    // Expande o campo e controles ao ganhar foco
    if (newAnalysisText && analysisControls) {
        newAnalysisText.addEventListener('focus', () => {
            newAnalysisText.classList.add('expanded');
            analysisControls.classList.remove('collapsed');
            analysisControls.classList.add('expanded');
        });
    }

    // Colapsa o campo e controles ao perder foco, SE estiver vazio
    if (newAnalysisText && analysisControls) {
        newAnalysisText.addEventListener('blur', () => {
            // Usa um pequeno timeout para permitir o clique no botão de envio
            setTimeout(() => {
                 if (newAnalysisText.value.trim() === '') {
                    newAnalysisText.classList.remove('expanded');
                    analysisControls.classList.remove('expanded');
                    analysisControls.classList.add('collapsed');
                }
            }, 100);
        });
    }

    // --- Lógica de Eventos ---
    
    // Avaliar com estrelas (Mantida)
    userRatingStars.forEach(star => {
        star.addEventListener('click', () => {
            const ratingValue = parseInt(star.dataset.value, 10);
            let userRating = bookData.ratings.find(r => r.user === loggedInUser.email);

            if (userRating) {
                userRating.rating = ratingValue;
            } else {
                bookData.ratings.push({ user: loggedInUser.email, rating: ratingValue });
            }
            saveDb(db);
            renderRatingsAndLikes();
        });
    });
    
    // Curtir a obra (Mantida)
    likeBookButton.addEventListener('click', () => {
        const userEmail = loggedInUser.email;
        const likeIndex = bookData.likes.indexOf(userEmail);

        if (likeIndex > -1) {
            bookData.likes.splice(likeIndex, 1);
        } else {
            bookData.likes.push(userEmail);
        }
        saveDb(db);
        renderRatingsAndLikes();
    });

    // Enviar nova análise (Lógica de submissão com checkbox)
    newAnalysisForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = newAnalysisText.value.trim();
        if (!text) return;
        
        // CAPTURA O VALOR FUNCIONAL DO CHECKBOX
        const isPublic = document.getElementById('isPublic').checked; 

        const newAnalysis = {
            id: Date.now(),
            userName: loggedInUser.name,
            userEmail: loggedInUser.email,
            text: text,
            date: new Date().toISOString(),
            likes: [],
            isPublic: isPublic // Valor salvo: true ou false
        };
        bookData.analyses.unshift(newAnalysis); 
        saveDb(db);
        renderAnalyses();
        newAnalysisText.value = '';
        
        // Colapsa a caixa de volta após o envio
        if (newAnalysisText && analysisControls) {
            newAnalysisText.classList.remove('expanded');
            analysisControls.classList.remove('expanded');
            analysisControls.classList.add('collapsed');
            document.getElementById('isPublic').checked = false; 
        }
    });
    
    // Curtir uma análise específica (Mantida)
    analysesList.addEventListener('click', (e) => {
        const likeButton = e.target.closest('.btn-like-analysis');
        if (!likeButton) return;
        
        const analysisId = parseInt(likeButton.dataset.analysisId, 10);
        const analysis = bookData.analyses.find(a => a.id === analysisId);
        
        if (analysis) {
            const userEmail = loggedInUser.email;
            const likeIndex = analysis.likes.indexOf(userEmail);

            if (likeIndex > -1) {
                analysis.likes.splice(likeIndex, 1); 
            } else {
                analysis.likes.push(userEmail); 
            }
            saveDb(db);
            renderAnalyses();
        }
    });

    // --- Inicialização ---
    renderBookInfo();
    renderRatingsAndLikes();
    renderAnalyses();
}