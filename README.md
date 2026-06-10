# <h1 align="center"> 🚀 Prototipo-API-JWT </h1>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

## 📖 Sobre o Projeto

O protótipo foi desenvolvido para demonstrar uma arquitetura completa de autenticação e autorização utilizando JWT (JSON Web Token), RBAC (Role-Based Access Control), refresh token, controle de sessão e proteção de rotas utilizando:

- JWT (JSON Web Token)
- RBAC (Role-Based Access Control)
- Refresh Token
- Blacklist de Tokens
- Controle de Sessão
- Proteção de Rotas
- PostgreSQL
- Sequelize ORM
- React

---
## 🏗️ Arquitetura
```txt
Frontend React
        ↓
Backend Node.js
        ↓
JWT + RBAC
        ↓
PostgreSQL
```
---
## 🌐 Ambiente
O protótipo terá os ambientes de backend e frontend que serão implementados em localhost.

## Backend

```txt
http://localhost:3333
https://localhost:3333
```

## Frontend

```txt
http://localhost:5173
https://localhost:5173
```

---
## 🗄️ Banco de Dados

|Item|Valor|
| -------- |-------- |
| Banco | PostgreSQL |
| ORM | Sequelize |
| Porta | 5432 |
| Usuário | postgres |

---
## 👥 Roles Utilizadas

```txt
AdmMaster
UserFinal
```
---
### 👤 Usuários de Teste: 

| Nome | Email | Departamento | Status |
|--------|--------|--------|--------|
| Adm Master Fictício | admmaster@fictional.local | Infraestrutura | ATIVO |
| Colaborador RH Fictício | rh.user@fictional.local | RH | ATIVO |

---
## 🔐 Funcionalidades Implementadas

- Login
- Logout
- JWT Authentication
- Access Token
- Refresh Token
- Middleware de Autenticação
- Middleware de Autorização (RBAC)
- Proteção de Rotas
- Blacklist de Tokens
- Revogação de Sessão
- Controle de Permissões
---

## ⚙️ Configuração do Ambiente
## Backend

### Acessar pasta

```bash
cd fes-jwt-prototype/backend
```

### Instalar dependências

```bash
npm install
```

### Atualizar dependências seguras

```bash
npm audit fix
```

> ⚠️ Não executar `npm audit fix --force`.

---

## Banco de Dados

### Criar Banco PostgreSQL

```sql
CREATE DATABASE fes_jwt_prototype_development;
```

### Configurar arquivo .env

```env
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=fes_jwt_prototype_development
DB_USERNAME=postgres
DB_PASSWORD=SUA_SENHA
```

---

## Executar Migrations

```bash
npx sequelize-cli db:migrate
```

Resultado esperado:

```txt
create-access-token-blacklist: migrated
add-user-block-to-access-token-blacklist: migrated
```

---

## Executar Seeds

```bash
npx sequelize-cli db:seed:all
```

---

## Iniciar Backend

```bash
npm run dev
```

Resultado esperado:

```txt
FictionalEnterpriseSolutions backend rodando em:
http://localhost:3333
```

---

# 🎨 Frontend

## Acessar pasta

```bash
cd ../frontend
```

## Instalar dependências

```bash
npm install
```

## Executar aplicação

```bash
npm run dev
```

Resultado esperado:

```txt
http://localhost:5173
```

---

# 🔄 Fluxo Git

## Baixar alterações

```bash
git pull origin main
```

## Verificar alterações

```bash
git status
```

## Adicionar arquivos

```bash
git add .
```

## Criar commit

```bash
git commit -m "Descrição da alteração"
```

## Enviar para GitHub

```bash
git push origin main
```

---

# 📁 Estrutura do Projeto

```txt
fes-jwt-prototype
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── migrations
│   ├── routes
│   ├── services
│   └── config
│
├── frontend
│   ├── src
│   ├── pages
│   ├── services
│   └── components
│
└── documentation
```

---

# 🛠️ Recuperação Completa do Ambiente

```bash
git clone <URL_DO_REPOSITORIO>

cd fes-jwt-prototype/backend

npm install

npm audit fix

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all

npm run dev
```

Em outro terminal:

```bash
cd fes-jwt-prototype/frontend

npm install

npm run dev
```

---

# 🚧 Roadmap

## Fase Atual

- [x] JWT
- [x] RBAC
- [x] Refresh Token
- [x] Blacklist
- [x] Frontend React

---

## Próximas Evoluções

- [ ] Lifecycle Management
- [ ] Inativação de Usuários
- [ ] Reativação de Usuários
- [ ] Férias
- [ ] Afastamento
- [ ] Auditoria de Eventos
- [ ] Swagger / OpenAPI
- [ ] Integração SailPoint
- [ ] Identity Governance & Administration (IGA)

---

# 👩‍💻 Autora

Priscila Gomes

Projeto acadêmico desenvolvido para demonstrar conceitos de autenticação, autorização, governança de identidade e segurança de aplicações.
