# Videobuster-back-end

## Descrição
Sistema de locação de filmes feito com web services (JSON/HTTP) para o processo seletivo da Phi (4all hub).

## Stack
O sistema é implementado em Node.js e utiliza NPM como gerenciador de pacotes e um banco de dados relacional (MySQL) para persistir os dados principais. Também foi utilizado o Redis através da biblioteca JWT-Redis para a implementação de signup, login e logoff dos usuários. Algumas outras bibliotecas utilizadas foram Express, Knex, Bcrypt, Jest e Dotenv.

## Pré-requisitos para rodar o sistema localmente
Para que o sistema seja rodado na sua máquina você precisa realizar os seguintes passos:

- Instalação do <a href="https://nodejs.org/en/download/">Node.JS</a>

- Instalação do Redis Server (O Redis deve estar rodando durante o uso do sistema) (<a href="https://github.com/microsoftarchive/redis/releases">Windows</a>) (<a href="https://redis.io/topics/quickstart">Linux</a>)

- Copiar o repositório git para a sua máquina, o que pode ser através do comando <i>git clone https://github.com/Paulopma/videobuster-back-end.git</i>

- Na pasta raíz, crie um arquivo .env com as seguintes configurações:
- - DB_HOST = (host do seu banco)
- - DB_USER = (usuário do seu banco)
- - DB_PASSWORD = (senha do seu banco)
- - DB_DATABASE_NAME = (nome do seu banco)
- - JWT_KEY = (chave Jason Web Token)
- - JWT_EXPIRES_IN = (tempo de expiração do token de acesso ex: 10hour)
- - BCRYPT_COST = 12

- Ainda na pasta raíz, rode o comando <i>npm install</i> para que todas as dependências necessárias sejam instaladas

- Depois rode os comandos <i>npm run build</i> e <i>npm run start</i>. Pronto, o sistema já estará rodando na sua máquina.

## Uso dos <i><a href="https://pt.stackoverflow.com/questions/86399/qual-a-diferen%C3%A7a-entre-endpoint-e-api#:~:text=Um%20endpoint%20de%20um%20web,APIs%20podem%20existir%20sem%20endpoints.">endpoints</a></i>

Tipo de entrada utilizada: JSON

Para realizar o login na aplicação é necessário um token de acesso que é gerado no signup e login do usuário. Esse token deve ser utilizado no atributo Authorization do headers para acessar todos os demais endpoints.

## Exemplos de uso:
### User Signup:
Cria um novo usuário com ID, nome, e-mail e senha; e libera um token de acesso.

POST: http://localhost:3003/user/signup

<strong>Entrada</strong>

Body:
|name|email|password|
| -------- |-------- |-------- |
|Paulo Aguiar|paulo@gmail.com|123456|

<strong>Saída</strong>

Body:
|message|token|
| ---------- |-------- |
|"User created successfuly"|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1OTc3Yjc4LTA0NWMtNDE0NC04ZjM3LTNkZTVkZDNiMjA3NCIsImp0aSI6IjA1OTc3Yjc4LTA0NWMtNDE0NC04ZjM3LTNkZTVkZDNiMjA3NCIsImlhdCI6MTYwNTc5NDI3OSwiZXhwIjoxNjA1ODMwMjc5fQ.kPYTQQDFgTZTpi_Zw-zqW4SDdnCqNPND2FJ54mSJy2w

### User Login:
Libera um token de acesso de as informações de e-mail e senha de um usuário criado, através do signup, estiverem corretas.

GET: http://localhost:3003/user/login

<strong>Entrada</strong>

Body:
|email|password|
| -------- |-------- |-------- |
|Paulo Aguiar|123456|

<strong>Saída</strong>

Body:
|message|token|
| ---------- |-------- |
|"User successfuly logged in"|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA1OTc3Yjc4LTA0NWMtNDE0NC04ZjM3LTNkZTVkZDNiMjA3NCIsImp0aSI6IjA1OTc3Yjc4LTA0NWMtNDE0NC04ZjM3LTNkZTVkZDNiMjA3NCIsImlhdCI6MTYwNTc5NDI3OSwiZXhwIjoxNjA1ODMwMjc5fQ.kPYTQQDFgTZTpi_Zw-zqW4SDdnCqNPND2FJ54mSJy2w

### Get Available Movies:
Faz uma listagem de todos os filmes disponíveis (não alugados) no banco de dados, mostrando seu título, diretor e quantidade de filmes disponíveis pelo título. É necessário um token de acesso válido inserido no headers.

GET: http://localhost:3003/movie/available

<strong>Entrada</strong>

Headers:
|key|value|
| -------- |-------- |-------- |
|Authorization|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImp0aSI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImlhdCI6MTYwNTc1NTExMiwiZXhwIjoxNjA1NzkxMTEyfQ.j_sgOgFnm-KCyajmdaEzvmkO5vjgGfh4_nTtjkYpZUA|

<strong>Saída</strong>

Body:

```json
[
    {
        "title": "Amadeus",
        "director": "Forman",
        "quantity": 5
    },
    {
        "title": "Jumanji",
        "director": "Johnston",
        "quantity": 2
    },
    {
        "title": "Os Deuses Devem Estar Loucos",
        "director": "Jamie",
        "quantity": 4
    },
]
```
### User Logout:
Invalida o token de acesso utilizado utilizado no headers.

GET: http://localhost:3003/user/logout

<strong>Entrada</strong>

Headers:
|key|value|
| -------- |-------- |
|Authorization|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImp0aSI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImlhdCI6MTYwNTc1NTExMiwiZXhwIjoxNjA1NzkxMTEyfQ.j_sgOgFnm-KCyajmdaEzvmkO5vjgGfh4_nTtjkYpZUA|

<strong>Saída</strong>

Body:
|message|
| ---------- |
|"User successfuly logged out"|

### Rent Movie By ID:
Aluga um filme disponível através do ID e relaciona o mesmo com o ID do usuário logado através do token de acesso. É necessário um token de acesso válido inserido no headers.

PUT: http://localhost:3003/movie/rent/:id

<strong>Entrada</strong>

Headers:
|key|value|
| -------- |-------- |
|Authorization|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImp0aSI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImlhdCI6MTYwNTc1NTExMiwiZXhwIjoxNjA1NzkxMTEyfQ.j_sgOgFnm-KCyajmdaEzvmkO5vjgGfh4_nTtjkYpZUA|

Params - Path Variables:
|key|value|
| ---------- |-------- |
|id|3|

<strong>Saída</strong>

Body:
|message|
| ---------- |
|"movie rented successfuly"|

### Return Movie By ID:
Retorna um filme alugado através do ID, retornando o mesmo para lista de filmes disponíveis, ao mesmo tempo que apaga o ID do usuário que havia previamente alugado o filme. É necessário um token de acesso válido inserido no headers.

PUT: http://localhost:3003/movie/return/:id

<strong>Entrada</strong>

Headers:
|key|value|
| -------- |-------- |
|Authorization|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImp0aSI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImlhdCI6MTYwNTc1NTExMiwiZXhwIjoxNjA1NzkxMTEyfQ.j_sgOgFnm-KCyajmdaEzvmkO5vjgGfh4_nTtjkYpZUA|

Params - Path Variables:
|key|value|
| ---------- |-------- |
|id|3|

<strong>Saída</strong>

Body:
|message|
| ---------- |
|"movie returned successfuly"|

### Seach Movie By Title:
Faz uma busca individual, através do título, por todos os filmes do banco de dados, mostrando o ID, título, diretor e, caso o filme esteja alugado, mostra também o ID, nome e e-mail do usuário que o alugou. Caso não esteja alugado terá apenas um null no lugar das informações de usuário.

GET: http://localhost:3003/movie/search/:title

<strong>Entrada</strong>

Headers:
|key|value|
| -------- |-------- |
|Authorization|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImp0aSI6IjAxMTEzZWQzLWEzMzAtNDg5MS05MTlkLTIxMzg3NzAwZWVjNiIsImlhdCI6MTYwNTc1NTExMiwiZXhwIjoxNjA1NzkxMTEyfQ.j_sgOgFnm-KCyajmdaEzvmkO5vjgGfh4_nTtjkYpZUA|

Params - Path Variables:
|key|value|
| ---------- |-------- |
|title|deuses|

<strong>Saída</strong>

Body:
```json
[
    {
        "id": 9,
        "title": "Os Deuses Devem Estar Loucos",
        "director": "Jamie",
        "rentedTo": {
            "id": "01113ed3-a330-4891-919d-21387700eec6",
            "name": "Whellyda",
            "email": "whellyda@gmail.com"
        }
    },
    {
        "id": 12,
        "title": "Os Deuses Devem Estar Loucos",
        "director": "Jamie",
        "rentedTo": null
    },
    {
        "id": 13,
        "title": "Os Deuses Devem Estar Loucos",
        "director": "Jamie",
        "rentedTo": null
    },
]
```

Outras informações de uso podem ser encontrados nessa documentação do Postman: 

https://documenter.getpostman.com/view/11589681/TVes7Rxk#978a8a8c-8c1b-49d8-a599-c7e1eda87656