# Plural

Plural é um protótipo de dashboard para análise de obras literárias brasileiras, desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC).

## Estrutura do Projeto (Refatorado)

PLURAL_prototipo/
├── cadastro.html             # Tela de cadastro de usuário
├── dashboard.html            # Dashboard principal (após login)
├── detalhes-obra-view.html   # Estrutura da tela de detalhes da obra
├── index.html                # Tela de login
├── CSS/
│   └── style.css             # Estilos do projeto
├── JS/
│   ├── app.js                # Lógica do dashboard e navegação
│   ├── auth.js               # Lógica de autenticação (login/cadastro)
│   └── detalhes-obra.js      # Lógica da tela de detalhes (análises, comentários)
└── views/                    # Contém o HTML das páginas do dashboard
    ├── analises-view.html
    ├── home-view.html
    ├── notificacoes-view.html
    ├── obras-view.html
    └── perfil-view.html