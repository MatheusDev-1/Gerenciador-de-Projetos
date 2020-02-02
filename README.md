# Gerenciador de Projetos

Como primeiro desafio do Bootcamp GoStack da Rocketseat, tivemos que desenvolver uma API com métodos HTTPs CRUD (create, read, update, delete), para cadastrar/editar projetos.

O desafio foi bem simples pois já conhecia esta estrutura e o Express (biblioteca utilizada para lidar com as requisições). A aplicação dos middlewares no Express faz com que múltiplas validações das requisições (validar se ID já existe, se o projeto já existe) seja muito mais organizada e controlada.

Contudo, acredito que há formas de expandir um pouco mais este projeto, tornando-o utilizável como um app mobile utilizando o banco de dados MongoDB / PostGres, ou então, utilizando RealmDB para que seja possível a utilização do aplicativo de forma offline.

# Instalando

git clone https://github.com/MatheusDev-1/Gerenciador-de-Projetos.git 

**cd GerenciadorProjetos** && **npm install**
**cd GerenciadorProjetosAPI** && **npm install**

## Iniciando API

**cd GerenciadorProjetosAPI** && **yarn dev**

## Iniciando Mobile

**cd GerenciadorProjetos** && **react-native run-android**

# O que foi ou será utilizado

* Node JS (com bibliotecas Express, Nodemon e Axios)
* React Native (react-native-elements)

# Próximos commits

* Atualizar código para que os componentes sejam renderizados assim que as requisições terminarem

* Criar aplicativo simples no React Native para listar todos os projetos em uma FlatList e permitir também as ações de Criação, Edição e Deleção de projetos e/ou tarefas - 80%

