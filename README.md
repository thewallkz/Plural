# Plural

Plural é um protótipo de dashboard para análise de obras literárias brasileiras, desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC).

## Estrutura do Projeto (Refatorado)

```

PLURAL\_prototipo/
├── cadastro.html             \# Tela de cadastro de usuário
├── dashboard.html            \# Dashboard principal (após login)
├── detalhes-obra-view.html   \# Estrutura da tela de detalhes da obra
├── index.html                \# Tela de login
├── CSS/
│   └── style.css             \# Estilos do projeto
├── JS/
│   ├── app.js                \# Lógica do dashboard e navegação
│   ├── auth.js               \# Lógica de autenticação (login/cadastro)
│   └── detalhes-obra.js      \# Lógica da tela de detalhes (análises, comentários)
└── views/                    \# Contém o HTML das páginas do dashboard
├── analises-view.html
├── home-view.html
├── notificacoes-view.html
├── obras-view.html
└── perfil-view.html

```

## Funcionalidades Implementadas (Protótipo)

-   **Cadastro e Login:** Usuários podem criar contas e acessar o dashboard.
-   **Dashboard Home:** Visualização de resumo e navegação entre seções.
-   **Catálogo de Obras:** Lista de livros com busca por título ou autor.
-   **Detalhes da Obra:** Página dedicada com descrição, avaliação (estrelas) e curtidas.
-   **Criação de Análise:** Usuário pode escrever e publicar uma análise sobre uma obra.
-   **Comentários:** Usuários podem comentar nas análises de outros.
-   **Minhas Análises:** Página que lista todas as análises escritas pelo usuário.
-   **Perfil do Usuário:** Permite ao usuário alterar seu nome e senha.
-   **Notificações:** Página com lista de notificações (atualmente simuladas).
-   **Persistência Local:** Dados de usuários e interações são armazenados no `localStorage` do navegador.

## Como Executar

1.  Clone ou baixe este repositório.
2.  Abra o arquivo `PLURAL_prototipo/index.html` em seu navegador.
3.  Crie uma conta ou faça login para acessar o dashboard.

## Tecnologias

-   HTML5
-   CSS3
-   JavaScript (ES6)
-   [Font Awesome](https://fontawesome.com/) para ícones

## Observações

Este projeto é um protótipo e não utiliza backend ou banco de dados real. Todos os dados são armazenados localmente no navegador (`localStorage`). Isso significa que as interações (análises, comentários, curtidas) **não são compartilhadas entre usuários** e só são visíveis no navegador onde foram criadas.