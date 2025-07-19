# Plataforma de Aprendizado de Inglês para Estudantes

## Funcionalidades Principais

* **Autenticação de Usuários:** Cadastro e login seguros com sistema de tokens JWT.
* **Acesso Flexível:** Opção de "continuar sem login" para explorar o conteúdo, com funcionalidades de progresso restritas.
* **Exercícios Interativos:**
    * Listagem e seleção de quizzes por tema e dificuldade.
    * Quizzes de múltipla escolha com 5 perguntas por tema.
    * Verificação instantânea de respostas e pontuação.
    * Marcação de quizzes "Concluídos" para usuários logados.
* **Materiais de Leitura:**
    * Exibição de textos categorizados por nível de dificuldade.
    * Conteúdo voltado para expandir vocabulário e compreensão.
* **Persistência de Progresso:** Salva a pontuação dos quizzes no banco de dados para usuários autenticados.
* **Dashboard do Aluno:** Área dedicada para visualização de conteúdo e acompanhamento do aprendizado.


## Tecnologias Utilizadas

* **Frontend:** `React.js`
    * Interface de usuário interativa e reativa.
    * `React Router DOM` para navegação.
    * `Axios` para requisições HTTP à API.
* **Backend:** `Node.js` com `Express`
    * API RESTful robusta e escalável.
    * `Mongoose` para modelagem de dados e interação com MongoDB.
    * `bcryptjs` para segurança de senhas (hashing).
    * `jsonwebtoken` (JWT) para autenticação.
    * `dotenv` para gerenciamento de variáveis de ambiente.
* **Banco de Dados:** `MongoDB Atlas`
    * Banco de dados NoSQL na nuvem (tier gratuito M0 Sandbox).
    * Armazena dados de usuários, materiais de aprendizado e progresso.

## Estrutura do Projeto

O projeto é organizado em duas pastas principais:

* `frontend/`: Contém todo o código da interface do usuário em React.
* `backend/`: Contém o código da API em Node.js/Express e a lógica de conexão com o MongoDB.

## Como Executar o Projeto Localmente

Para configurar e rodar o projeto em sua máquina local, siga os passos abaixo:

### Pré-requisitos

* Node.js (versão 18 ou superior recomendada)
* npm (gerenciador de pacotes do Node.js)
* Conta no MongoDB Atlas com um cluster M0 Sandbox configurado.

### Configuração do Backend

1.  **Navegue até a pasta `backend`:**
    ```bash
    cd backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Crie um arquivo `.env`:**
    Na raiz da pasta `backend`, crie um arquivo chamado `.env` e adicione suas variáveis de ambiente:
    ```
    MONGO_URI=mongodb+srv://<seu_usuario>:<sua_senha>@<seu_cluster>.mongodb.net/learnenglishbr?retryWrites=true&w=majority
    JWT_SECRET=sua_chave_jwt
    PORT=5000
    ```
    * Substitua `<seu_usuario>`, `<sua_senha>` e `<seu_cluster>` pelas suas credenciais do MongoDB Atlas.

4.  **Inicie o servidor backend:**
    ```bash
    npm run dev
    ```
    O servidor será iniciado em `http://localhost:5000`.

### Configuração do Frontend

1.  **Abra um novo terminal e navegue até a pasta `frontend`:**
    ```bash
    cd frontend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Crie um arquivo `.env`:**
    Na raiz da pasta `frontend`, crie um arquivo chamado `.env` e adicione sua variável de ambiente:
    ```
    REACT_APP_API_URL=http://localhost:5000/api
    ```
4.  **Inicie o aplicativo React:**
    ```bash
    npm start
    ```
    O aplicativo será aberto no seu navegador em `http://localhost:3000`.

## Deploy da Aplicação

O deploy gratuito desta aplicação é realizado utilizando os seguintes serviços:

* **Backend:** `Render` (para o serviço web e API)
* **Frontend:** `Vercel` (para a aplicação React estática)
* **Banco de Dados:** `MongoDB Atlas` (cloud database)

## Contribuição

Este projeto está em desenvolvimento contínuo. Sugestões e contribuições são bem-vindas.
