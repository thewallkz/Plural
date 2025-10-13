document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Validação de formulários e feedback (Requisito RNF3.5)
    const displayError = (message) => {
        if(errorMessage) errorMessage.textContent = message;
    };

    // Cadastro de Conta (Requisito R1.1)
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!name || !email || !password) {
                displayError('Todos os campos são obrigatórios.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.email === email)) {
                displayError('Este e-mail já está cadastrado.');
                return;
            }
            
            // Armazenamento seguro de senhas (simulado) (Requisito RNF2.1)
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = 'index.html';
        });
    }

    // Autenticação (Login) (Requisito R1.2)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                displayError('E-mail ou senha inválidos.');
            }
        });
    }
});