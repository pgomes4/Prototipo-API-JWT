# Roteiro de Testes JWT — Postman

## 1. Login válido

Cenário: autenticação com credenciais corretas.

Endpoint:

```txt
POST http://localhost:3333/api/v1/auth/login
```

Body:

```json
{
  "email": "admmaster@fictional.local",
  "senha": "password"
}
```

Resultado esperado:

```txt
200 OK + accessToken + refreshToken
```

Conceito aplicado: geração de JWT e refresh token após validação da senha com bcrypt.compare.

## 2. Login inválido

Cenário: senha incorreta.

Resultado esperado:

```txt
401 AUTH_INVALID_CREDENTIALS
```

Mitigação: resposta genérica evita revelar se e-mail ou senha está incorreto.

## 3. Rota protegida sem token

Endpoint:

```txt
GET http://localhost:3333/api/v1/me
```

Resultado esperado:

```txt
401 AUTH_TOKEN_NOT_PROVIDED
```

Mitigação: middleware exige Bearer Token.

## 4. Rota protegida com token válido

Header:

```txt
Authorization: Bearer <accessToken>
```

Resultado esperado:

```txt
200 OK
```

## 5. UserFinal tentando acessar rota admin

Endpoint:

```txt
GET http://localhost:3333/api/v1/admin-area
```

Resultado esperado:

```txt
403 RBAC_ACCESS_DENIED
```

Mitigação: RBAC separa autenticação de autorização.

## 6. Refresh token válido

Endpoint:

```txt
POST http://localhost:3333/api/v1/auth/refresh
```

Body:

```json
{
  "refreshToken": "<refreshToken>"
}
```

Resultado esperado:

```txt
200 OK + novo accessToken
```

## 7. Logout

Endpoint:

```txt
POST http://localhost:3333/api/v1/auth/logout
```

Resultado esperado:

```txt
200 OK + refresh token revogado
```

## 8. Refresh token revogado

Após logout, tentar usar o mesmo refresh token.

Resultado esperado:

```txt
401 AUTH_REFRESH_TOKEN_REVOKED
```





//accessToken
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NThlZGQxZC0yMmEwLTQwMzEtOTY5MC03OWQ5ZDI3ZDI2YzAiLCJlbWFpbCI6InJoLnVzZXJAZmljdGlvbmFsLmxvY2FsIiwicm9sZXMiOlsiVXNlckZpbmFsIl0sInBlcm1pc3Npb25zIjpbXSwiZGVwYXJ0YW1lbnRvIjoiUkgiLCJpYXQiOjE3ODEwMjQzMzUsImV4cCI6MTc4MTAyNTIzNX0.7Sz1vLIT6yB4LUZaKQCeftvEWKIWGrctel5INsqlHlc

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NThlZGQxZC0yMmEwLTQwMzEtOTY5MC03OWQ5ZDI3ZDI2YzAiLCJlbWFpbCI6InJoLnVzZXJAZmljdGlvbmFsLmxvY2FsIiwicm9sZXMiOlsiVXNlckZpbmFsIl0sInBlcm1pc3Npb25zIjpbXSwiZGVwYXJ0YW1lbnRvIjoiUkgiLCJpYXQiOjE3ODEwMjQ0NDEsImV4cCI6MTc4MTAyNTM0MX0.8GSI1Qvt135YBh2Tt94CWIJEdD3Axp9VKC8FIHTLM0g

//refreshToken
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NThlZGQxZC0yMmEwLTQwMzEtOTY5MC03OWQ5ZDI3ZDI2YzAiLCJ0eXBlIjoicmVmcmVzaCIsInRva2VuSWQiOiJkOGJmYjAzMS05NmNlLTRhNzQtYmM0YS00Nzc3YzQ1NWU2ODQiLCJpYXQiOjE3ODEwMjQzMzUsImV4cCI6MTc4MTYyOTEzNX0.6ablTNltGdZZNblwp9z1ShOvO4fXyAxceY8s9eQy8iY


