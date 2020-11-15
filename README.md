[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p style="background-color:black" align="center">
  <a href="https://github.com/whateverwillian/go-barber-server">
    <img src="images/logo.svg" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">Go Barber Server</h3>

  <p align="center">
    Backend do aplicativo Go Barber feito com nodeJS e TypeScript
    <br />
    <br />
    <a href="https://github.com/whateverwillian/go-barber-server/issues">Reportar um Bug</a>
    ·
    <a href="https://github.com/whateverwillian/go-barber-server/issues">Pedir uma Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## 📌 Referência

* [Sobre o projeto](#sobre-o-projeto)
  * [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Getting started](#getting-started)
  * [Pré-requisitos](#pré-requisitos)
  * [Instalação](#instalação)
* [Rotas da aplicação](#rotas-da-aplicação)
* [Como contribuir?](#como-contribuir?)
* [Licença](#licença)
* [Contatos](#contatos)



<!-- ABOUT THE PROJECT -->
## 🚀 Sobre o projeto

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Esse é o servidor do aplicativo Go Barber. A idéia do aplicativo é auxiliar na vida dos barbeiros facilitando a parte de gerenciar os serviços. O aplicativo mantém uma agenda e nela usuários podem marcar seus cortes de cabelo, mantendo uma lista dos próximos usuários à serem atendidos e uma disponibilidade automática.

### Tecnologias utilizadas
Nesse aplicativo foram utilizadas as seguintes tecnologias
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/pt-br/)
* [Typescript](https://www.typescriptlang.org/)
* [TypeORM](https://typeorm.io/#/)
* [Postgres](https://www.postgresql.org/)
* [mongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)

<!-- GETTING STARTED -->
## 🌈 Getting started
Para utilizar o projeto localmente basta seguir os seguintes passos.

### Pré-requisitos

Precisamos das seguintes ferramentas.
* npm 
* Docker

### Instalação

1. Clone o repositório
```sh
git clone https://github.com/whateverwillian/go-barber-server
```
2. instale as dependências do projeto
```sh
npm install
```
3. Crie os bancos de dados com Docker
* postgres
```JS
docker run -d --name postgres -e POSTGRESQL_PASSWORD=senha -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_DATABASE=postgres -p 5432:5432 bitnami/postgresql:latest
```
* mongoDB
```JS
docker run -d --name mongodb -e MONGODB_USERNAME=mongo -e MONGODB_PASSWORD=senha -e MONGODB_DATABASE=mongo -p 27017:17017 bitnami/mongodb:latest
```
* Redis
```JS
docker run -d --name redis -e REDIS_PASSWORD=senha -p 6379:6379 bitnami/redis:latest
```
No caso do redis precisamos colocar as variáveis no arquivo .env na raíz do projeto
```JS
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASS=senha
```
4. Configure a conexão com os bancos no arquivo ormconfig.json
```JS
[
  {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "senha",
    "database": "postgres",
    "entities": [
      "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
      "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "host": "localhost",
    "port": 27017,
    "database": "mongo",
    "username": "mongo",
    "password": "senha",
    "useUnifiedTopology": true,
    "entities": [
      "./src/modules/**/infra/typeorm/schemas/*.ts"
    ]
  }
]
```

## 🔥 Rotas da aplicação

* Users
```JS
POST users - criar um usuário
PATCH users/avatar - atualizar o avatar
```
* Profile
```JS
GET profiles - mostra seu perfil
PUT profiles/update - atualiza informações do perfil
```

* Password
```JS
POST passwords/forgot - Esqueci minha senha
POST passwords/reset - Insere uma nova senha
```

* Sessions
```JS
POST sessions - Faz login
```

* Providers
```JS
GET providers - Lista os provedores de serviço
GET providers/:provider_id/day-availability - Pega a disponibilidade do provider pra um dia
GET providers/:provider_id/month-availability - Pega a disponibilidade do provider para o mês
```

* Appointments
```JS
POST appointments - Cria um agendamento
GET appointments/me - Caso você seja um provedor, pega seus serviços agendados
```

<!-- CONTRIBUTING -->
## 🥰 Como contribuir?

Contribuir é o que faz a comunidade open source um lugar tão incrível para aprender, inspirar e criar. Qualquer contribuição é **apreciada**.

1. Dê um fork no projeto
2. Crie uma nova Branch (`git checkout -b feature/nova-feature`)
3. Dê um commit nas mudanças (`git commit -m 'Adicionei uma feature'`)
4. Dê um push pra Branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📕 Licença

Distribuído sob licença MIT.

<!-- CONTACT -->
## Contatos

Willian tavares - [https://www.linkedin.com/in/whateverwill](https://www.linkedin.com/in/whateverwill) - willianliketavares@gmail.com

Project Link: [https://github.com/whateverwillian/go-barber-server](https://github.com/whateverwillian/go-barber-server)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/whateverwillian/go-barber-server?style=flat-square
[contributors-url]: https://github.com/whateverwillian/go-barber-server/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/whateverwillian/go-barber-server?style=flat-square
[forks-url]: https://github.com/whateverwillian/go-barber-server/network/members
[stars-shield]: https://img.shields.io/github/stars/whateverwillian/go-barber-server?style=flat-square
[stars-url]: https://github.com/whateverwillian/go-barber-server/stargazers
[issues-shield]: https://img.shields.io/github/issues/whateverwillian/go-barber-server?style=flat-square
[issues-url]: https://github.com/whateverwillian/go-barber-server/issues
[license-shield]: https://img.shields.io/github/license/whateverwillian/go-barber-server?style=flat-square
[license-url]: https://github.com/whateverwillian/go-barber-server/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/whateverwillian
[product-screenshot]: images/screenshot.png