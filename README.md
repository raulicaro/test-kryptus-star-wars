# Star Wars App Kryptus <> Raul
Criei um App React com:<br/>
1- Tela de login com o user e senha demandada<br/>
2- Tela Star Wars com uma tabela listando as infos dos 6 films consumindo a API SWAPI ( https://swapi.dev/ ) e salvando as infos em local storage (optei por fazer com local storage pq as infos da API não mundam, caso fosse mais complexo eu faria com ContextAPI ou até mesmo Redux) e ao clickar na row da tabela abre a tela dedicada a cada filme.(/movies)<br/>
3- Tela dedicada a cada filme, com tabelas que populam as infos de characters e planets, salvando localmente também, consumindo de 5 em 5 no máximo para não sobre carregar. o Opening Crawl fiz um botão triangular de toggle para o user decidir se quer o não exibir o texto. Sempre ao clickar no H1 Star Wars (amarelo), volta para a página inicial com os 6 filmes.(/movie/{id})<br/>


Para rodar a aplicação:<br/>
> npm install (caso necessário)
> npm start

Aplicação roda em: <br/>
> http://localhost:3000/ 

Erro de Openssl:
> $env:NODE_OPTIONS = "--openssl-legacy-provider" (no windows)
