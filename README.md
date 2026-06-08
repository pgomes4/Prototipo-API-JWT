# <h1 align="center"> Prototipo-API-JWT </h1>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)


O protótipo foi desenvolvido para demonstrar uma arquitetura completa de autenticação e autorização utilizando JWT (JSON Web Token), RBAC (Role-Based Access Control), refresh token, controle de sessão e proteção de rotas.

# Ambiente
O protótipo terá os ambientes de backend e frontend que serão implementados em localhost.

Backend :  → http:/localhost:3333 ou https:/localhost:3333

Frontend: → http:/localhost:5173 ou https:/localhost:5173

# Banco de Dados
```
> PostgreSQL
> ORM: Sequelize
> Porta: 5432
> Usuário local: postgres
```
## Roles Utilizadas
```
> AdmMaster
> UserFinal
```
### Usuários: 

<h3>
|nome|email|departamento|status|
| -------- |-------- |-------- |-------- |
|Adm Master Fictício|admmaster@fictional.local|Infraestrutura|Ativo|
|Colaborador RH Fictício|rh.user@fictional.local|RH|Ativo|

</h3>
