# FictionalEnterpriseSolutions — Protótipo JWT Fullstack

Protótipo inicial para validar os conceitos centrais de JWT em uma aplicação com backend e frontend integrados.

## Objetivo do protótipo

Validar, antes da estética, os conceitos de:

- Login com JWT
- Access Token
- Refresh Token
- Logout com revogação do refresh token
- Hash de senha com salt usando bcryptjs
- Rotas protegidas
- RBAC com `AdmMaster` e `UserFinal`
- Integração Frontend ↔ Backend
- Testes funcionais e negativos com Postman

## Estrutura

```txt
backend/
frontend/
docs/
```

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

URL prevista:

```txt
http://localhost:3333
```

> A estrutura foi preparada para simular HTTPS local, mas nesta primeira versão o backend também roda em HTTP para facilitar o teste inicial. Depois podemos ativar certificado local.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

URL prevista:

```txt
http://localhost:5173
```

## Usuários fictícios da seed

### AdmMaster

```txt
E-mail: admmaster@fictional.local
Senha: ******
```

### UserFinal RH

```txt
E-mail: rh.user@fictional.local
Senha: *****
```

## Endpoints principais

```txt
POST    /api/v1/auth/login
POST    /api/v1/auth/refresh
POST    /api/v1/auth/logout
PATCH   /api/v1/auth/inativar-usuario
GET     /api/v1/me
GET     /api/v1/admin-area
GET     /api/v1/user-area

```

## Prioridade de testes

1. Login válido
2. Login inválido
3. Rota protegida sem token
4. Rota protegida com token válido
5. UserFinal tentando acessar rota admin
6. Refresh token válido
7. Logout revogando refresh token
8. Reutilização de refresh token após logout
9. Inativar usuário por email
10. Com o login inativado tentar acessar rotas.
