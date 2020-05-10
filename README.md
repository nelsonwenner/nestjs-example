<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Prerequisites
* Docker Compose version (1.25.4)
* Docker version (19.03.8)
* Node version (12.16.1)
* Npm version (6.14.4)

# Getting Started
1. Fork this repository and clone on your machine
2. Change the directory to `nestjs-example` where you cloned it;
3. At the terminal, run:

```bash
/* Environment variables */

$ cp .env.example .env

/* container up */

$ docker-compose up
```
## Swagger documentation
- Open the host [localhost:3333/api/](http://localhost:3333/api/) and start using it.
---

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Typeorm cli
```bash
# create file migrate
$ npm run typeorm:cli -- migration:create -n test

# migrate
$ npm run typeorm:cli -- migration:run

# migrate revert
$ npm run typeorm:cli -- migration:revert
```
---