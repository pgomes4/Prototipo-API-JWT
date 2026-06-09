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
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NThlZGQxZC0yMmEwLTQwMzEtOTY5MC03OWQ5ZDI3ZDI2YzAiLCJlbWFpbCI6InJoLnVzZXJAZmljdGlvbmFsLmxvY2FsIiwicm9sZXMiOlsiVXNlckZpbmFsIl0sInBlcm1pc3Npb25zIjpbXSwiZGVwYXJ0YW1lbnRvIjoiUkgiLCJpYXQiOjE3ODEwMjI0NDAsImV4cCI6MTc4MTAyMzM0MH0.Sk7_x42H8KmiljPb20BP8mT9m3HdV_8P0aILRPLuOsw

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NThlZGQxZC0yMmEwLTQwMzEtOTY5MC03OWQ5ZDI3ZDI2YzAiLCJlbWFpbCI6InJoLnVzZXJAZmljdGlvbmFsLmxvY2FsIiwicm9sZXMiOlsiVXNlckZpbmFsIl0sInBlcm1pc3Npb25zIjpbXSwiZGVwYXJ0YW1lbnRvIjoiUkgiLCJpYXQiOjE3ODEwMjI1NTEsImV4cCI6MTc4MTAyMzQ1MX0.hf7gIM38JktlvqnyGHf5zMHD6jhulcA37i_Zs6qozPA

//refreshToken
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NThlZGQxZC0yMmEwLTQwMzEtOTY5MC03OWQ5ZDI3ZDI2YzAiLCJ0eXBlIjoicmVmcmVzaCIsInRva2VuSWQiOiIwZWY1YzYzMy1hNTMyLTRjOWMtYWQzMC1iNzk2M2I0ZWYwZGIiLCJpYXQiOjE3ODEwMjI0NDAsImV4cCI6MTc4MTYyNzI0MH0.mMFhP3tQCcit_BsxAGbxAGgX35SvDF66i3AJNraEwwM


