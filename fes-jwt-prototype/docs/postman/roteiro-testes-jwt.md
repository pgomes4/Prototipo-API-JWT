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
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzY2MDYzOC05ZThiLTRiNmEtODA1Ni02ZWE0NmUyODJkZWUiLCJlbWFpbCI6ImFkbW1hc3RlckBmaWN0aW9uYWwubG9jYWwiLCJyb2xlcyI6WyJBZG1NYXN0ZXIiXSwicGVybWlzc2lvbnMiOltdLCJkZXBhcnRhbWVudG8iOiJJbmZyYWVzdHJ1dHVyYSIsImlhdCI6MTc4MDQzMTcxOSwiZXhwIjoxNzgwNDMyNjE5fQ.k1JJla_AJbCyy1VhyBV57WAXTja1G6ka2o0l-Oz7BOs

//refreshToken
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MzY2MDYzOC05ZThiLTRiNmEtODA1Ni02ZWE0NmUyODJkZWUiLCJ0eXBlIjoicmVmcmVzaCIsInRva2VuSWQiOiI2YzUyNWNlMS1iNmFhLTRiZjktOTJlNS01NzU1MzZmMmFiMmUiLCJpYXQiOjE3ODA0MzE3MTksImV4cCI6MTc4MTAzNjUxOX0.7Jg-zV2XpWmyIDGN9OMLN8pMTbialQOt02ZUh_Ea3Dg


