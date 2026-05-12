# Fase 1 - TDD do Backend

## Objetivo do TDD

Estabilizar e ampliar os testes do backend antes de avanÃ§ar para frontend, infraestrutura e documentaÃ§Ã£o. O escopo desta fase Ã© a API Spring Boot em `Trabalho_Eng_Soft_II`.

## Vermelho

Os testes passaram a descrever os comportamentos esperados para:

- CriaÃ§Ã£o de usuÃ¡rio com `ROLE_USER` padrÃ£o.
- CriaÃ§Ã£o da role padrÃ£o quando ela ainda nÃ£o existe.
- Bloqueio de email duplicado.
- Bloqueio de nome de usuÃ¡rio duplicado.
- Listagem de usuÃ¡rios como `UserResumoDTO`.
- ExclusÃ£o de usuÃ¡rios existentes e inexistentes.
- ValidaÃ§Ã£o de controller para email invÃ¡lido, senha curta e nome em branco.
- Login com sucesso e credenciais invÃ¡lidas.
- Registro com sucesso e falha de validaÃ§Ã£o.
- Busca no repository de roles.
- Tratamento global de erros de negÃ³cio e autenticaÃ§Ã£o.

## Verde

Comportamentos necessÃ¡rios em produÃ§Ã£o:

- `UserService` verifica unicidade de email e username antes de salvar.
- `UserService` atribui `ROLE_USER`.
- `GlobalExceptionHandler` retorna `401 Unauthorized` para falhas de autenticaÃ§Ã£o.
- Controllers retornam payloads consistentes com `ApiResponse` e `ApiError`.

## RefatoraÃ§Ã£o

Depois dos testes verdes:

- Mover dependÃªncias de services/controllers para injeÃ§Ã£o por construtor.
- Substituir `IllegalArgumentException` genÃ©rica por exceÃ§Ãµes de domÃ­nio quando Ãºtil.
- Adicionar cÃ³digos de erro mais claros na documentaÃ§Ã£o de contratos.
- Adicionar metas de cobertura depois de conhecer o relatÃ³rio base.

## RefatoraÃ§Ã£o PÃ³s-Verde Aplicada

- Controllers usam injeÃ§Ã£o por construtor.
- Services usam injeÃ§Ã£o por construtor.
- ConfiguraÃ§Ã£o de seguranÃ§a e filtro JWT usam injeÃ§Ã£o por construtor.
- `TokenService` recebe `api.security.token.secret` pelo construtor.
- Regras de duplicidade de usuÃ¡rio lanÃ§am `DuplicateResourceException`.
- ExclusÃ£o de usuÃ¡rio inexistente lanÃ§a `ResourceNotFoundException`.
- Testes unitÃ¡rios foram atualizados para validar as novas exceÃ§Ãµes de domÃ­nio.
- `TokenServiceTest` nÃ£o usa mais reflection para injetar o segredo JWT.

## Comandos

Rodar testes do backend com Maven local:

```powershell
mvn test
```

Rodar testes do backend com Docker:

```powershell
powershell -ExecutionPolicy Bypass -File ..\scripts\test-backend.ps1
```

Gerar relatÃ³rio de cobertura JaCoCo:

```powershell
mvn verify
```

Caminho do relatÃ³rio JaCoCo:

```text
Trabalho_Eng_Soft_II/target/site/jacoco/index.html
```

## ObservaÃ§Ã£o de Ambiente

No ambiente inicial, `java`, `mvn`, `node` e `npm` nÃ£o estavam no PATH, e o Docker Desktop nÃ£o estava rodando na primeira tentativa. O script de testes do backend estÃ¡ preparado para usar Docker quando o daemon estiver disponÃ­vel.

## Resultado da ValidaÃ§Ã£o

Validado em 2026-05-11 Ã s 03:05:31 America/Sao_Paulo usando:

```powershell
powershell -ExecutionPolicy Bypass -File .\Grupo-3\scripts\test-backend.ps1
```

Resultado:

```text
Tests run: 36, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
Total time: 41.980 s
```

A linha de base TDD da Fase 1 ficou verde.

## ValidaÃ§Ã£o PÃ³s-RefatoraÃ§Ã£o

Validado depois da refatoraÃ§Ã£o pÃ³s-verde em 2026-05-11 Ã s 03:12:31 America/Sao_Paulo usando:

```powershell
powershell -ExecutionPolicy Bypass -File .\Grupo-3\scripts\test-backend.ps1
```

Resultado:

```text
Tests run: 36, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
Total time: 28.463 s
```

A validaÃ§Ã£o pÃ³s-refatoraÃ§Ã£o da Fase 1 ficou verde.
# Fase 2 - TDD de Hardening do Backend

## Objetivo

Endurecer o backend sem alterar a proposta da API: tornar autenticaÃ§Ã£o, erros, CORS e configuraÃ§Ã£o mais previsÃ­veis antes de avanÃ§ar para contratos e frontend.

## Vermelho

Os testes desta fase devem cobrir:

- `TokenService` rejeita `JWT_SECRET` ausente, vazio ou em branco.
- `TokenService` continua gerando e validando token quando o segredo Ã© vÃ¡lido.
- `ResourceNotFoundException` retorna `404 Not Found`.
- `DuplicateResourceException` continua retornando `400 Bad Request`.
- Credenciais invÃ¡lidas continuam retornando `401 Unauthorized`.
- `SecurityConfig` expÃµe configuraÃ§Ã£o CORS com origens permitidas por variÃ¡vel de ambiente.

## Verde

Comportamentos esperados em produÃ§Ã£o:

- A aplicaÃ§Ã£o falha cedo se o segredo JWT estiver invÃ¡lido.
- Erros de domÃ­nio tÃªm status HTTP coerente.
- CORS permite o shell e o remote MFE locais por padrÃ£o.
- A lista de origens CORS pode ser alterada por variÃ¡vel de ambiente.
- A suÃ­te de testes do backend permanece verde.

## RefatoraÃ§Ã£o

Depois da suÃ­te verde:

- Manter mensagens de erro em portuguÃªs e sem expor detalhes internos.
- Centralizar propriedades configurÃ¡veis em `application.properties`.
- Documentar variÃ¡veis relevantes para a infra e para o backend.
- Preparar a Fase 2.1 de contratos da API.

## Comandos

Rodar a suÃ­te do backend:

```powershell
powershell -ExecutionPolicy Bypass -File .\Grupo-3\scripts\test-backend.ps1
```

Gerar relatÃ³rio de cobertura:

```powershell
powershell -ExecutionPolicy Bypass -File .\Grupo-3\scripts\test-backend.ps1 -MavenArgs verify
```

## Melhorias Aplicadas

- `TokenService` rejeita segredo JWT nulo, vazio ou em branco.
- `ResourceNotFoundException` passa a ser tratada como `404 Not Found`.
- `DuplicateResourceException` permanece como erro de negÃ³cio `400 Bad Request`.
- CORS foi habilitado no Spring Security.
- Origens CORS permitidas sÃ£o configuradas por `APP_CORS_ALLOWED_ORIGINS`.
- Valores padrÃ£o de CORS permitem o shell em `http://localhost:3000` e o remote MFE em `http://localhost:4001`.
- `.env.example` e `docker-compose.yml` foram atualizados com a variÃ¡vel de CORS.

## ValidaÃ§Ã£o

Tentativa de validaÃ§Ã£o pelo agente:

```text
ERRO: Docker esta instalado, mas o daemon nao esta rodando. Inicie o Docker Desktop e tente novamente.
```

ValidaÃ§Ã£o pendente no terminal local do usuÃ¡rio:

```powershell
powershell -ExecutionPolicy Bypass -File .\Grupo-3\scripts\test-backend.ps1
```
# Fase 2.1 - Contratos da API e AutenticaÃ§Ã£o

## Objetivo

Documentar os contratos consumidos pelo shell e pelo remote MFE, incluindo endpoints, exemplos de request/response, cÃ³digos de erro e autenticaÃ§Ã£o Bearer JWT.

## Base URL

Backend direto em desenvolvimento:

```text
http://localhost:3001/api
```

Via API Gateway/MiniStack:

```text
http://localhost:4566/restapis/<api-id>/v1/_user_request_/api
```

No frontend, a base deve vir de variÃ¡vel de ambiente:

```text
VITE_MS_AUTH_URL
```

## AutenticaÃ§Ã£o

Rotas protegidas devem enviar o token JWT no header:

```http
Authorization: Bearer <token>
```

Rotas pÃºblicas:

- `POST /api/auth/login`
- `POST /api/auth/register`

Rotas protegidas:

- `GET /api/users`
- `DELETE /api/users/{id}`

## POST /api/auth/login

Autentica um usuÃ¡rio e retorna um JWT.

Request:

```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

Response `200`:

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9..."
  }
}
```

Erros:

| Status | Caso |
|---|---|
| `400` | Email invÃ¡lido, email vazio ou senha vazia |
| `401` | Credenciais invÃ¡lidas |
| `500` | Erro interno inesperado |

## POST /api/auth/register

Cria um usuÃ¡rio.

Request:

```json
{
  "userName": "joaosilva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

Response `200`:

```json
{
  "success": true,
  "message": "Usuario registrado com sucesso",
  "data": {
    "id": 1,
    "userName": "joaosilva",
    "email": "joao@email.com"
  }
}
```

Erros:

| Status | Caso |
|---|---|
| `400` | Campos invÃ¡lidos, email duplicado ou username duplicado |
| `500` | Erro interno inesperado |

## GET /api/users

Lista usuÃ¡rios com paginaÃ§Ã£o Spring.

Headers:

```http
Authorization: Bearer <token>
```

Query params opcionais:

```text
page=0&size=10&sort=userName,asc
```

Response `200`:

```json
{
  "success": true,
  "message": "OperaÃ§Ã£o realizada com sucesso",
  "data": {
    "content": [
      {
        "id": 1,
        "userName": "joaosilva",
        "email": "joao@email.com"
      }
    ],
    "totalElements": 1,
    "totalPages": 1,
    "size": 10,
    "number": 0
  }
}
```

Erros:

| Status | Caso |
|---|---|
| `401` | Token ausente ou invÃ¡lido |
| `403` | UsuÃ¡rio autenticado sem permissÃ£o |
| `500` | Erro interno inesperado |

## DELETE /api/users/{id}

Remove um usuÃ¡rio por ID.

Headers:

```http
Authorization: Bearer <token>
```

Response `200`:

```json
{
  "success": true,
  "message": "Usuario deletado com sucesso",
  "data": null
}
```

Erros:

| Status | Caso |
|---|---|
| `401` | Token ausente ou invÃ¡lido |
| `403` | UsuÃ¡rio autenticado sem permissÃ£o |
| `404` | UsuÃ¡rio nÃ£o encontrado |
| `500` | Erro interno inesperado |

## Formato de Erro

Erro de validaÃ§Ã£o:

```json
{
  "timestamp": "2026-05-11T03:20:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Erro de validaÃ§Ã£o nos campos",
  "path": "/api/auth/register",
  "validationErrors": [
    {
      "field": "email",
      "message": "Email invÃ¡lido"
    }
  ]
}
```

Erro de autenticaÃ§Ã£o:

```json
{
  "timestamp": "2026-05-11T03:20:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Credenciais invalidas",
  "path": "/api/auth/login",
  "validationErrors": null
}
```

Erro de recurso inexistente:

```json
{
  "timestamp": "2026-05-11T03:20:00",
  "status": 404,
  "error": "Not Found",
  "message": "Usuario com o id nao cadastrado",
  "path": "/api/users/99",
  "validationErrors": null
}
```

# Fase 3 - TDD de Microfrontend com Module Federation

## Objetivo

Transformar o frontend existente em uma arquitetura MFE mais organizada, mantendo o remote de autenticaÃ§Ã£o funcional e preparando o shell para consumir contratos exportÃ¡veis.

## Vermelho

Os testes/validaÃ§Ãµes da fase devem garantir:

- `vite.config.ts` do remote expÃµe mÃ³dulos funcionais.
- `vite.config.js` do shell consome o remote por variÃ¡vel de ambiente.
- DependÃªncias compartilhadas incluem React, React DOM, MUI e Emotion.
- Remote exporta um contrato estÃ¡vel para o shell.
- Componentes remotos funcionam standalone e federados.
- Lazy loading, `Suspense` e fallback continuam presentes no shell.

## Verde

Comportamentos esperados:

- Remote `mfe_auth` expÃµe `LoginPage`, `RegisterForm` e contrato de autenticaÃ§Ã£o.
- Shell usa `MFE_AUTH_URL`/`VITE_MFE_AUTH_URL` como fonte da URL do remote.
- MUI e Emotion sÃ£o compartilhados no Module Federation.
- Estrutura do remote passa a seguir a organizaÃ§Ã£o enterprise esperada.

## RefatoraÃ§Ã£o

- Evoluir o shell para TypeScript em uma prÃ³xima passada.
- Criar layout enterprise completo na Fase 4.
- Adicionar testes frontend com Vitest/RTL na Fase 5.

## Melhorias Aplicadas

- Remote `mfe_auth` expÃµe `LoginPage`, `RegisterForm` e `AuthContract`.
- `LoginPage` e `RegisterForm` federados agora recebem `AuthProvider`.
- Shared dependencies do remote e do shell incluem React, React DOM, MUI e Emotion.
- Shell passa a ler a URL do remote por `VITE_MFE_AUTH_URL` ou `MFE_AUTH_URL`.
- Shell recebeu `ErrorBoundary`, `Suspense` e fallback em portuguÃªs.
- `.env.example` passou a documentar `MFE_AUTH_URL` e `VITE_MFE_AUTH_URL`.

## ValidaÃ§Ã£o

ValidaÃ§Ãµes executadas:

```text
docker compose --env-file .env.example config --quiet
```

Resultado: configuraÃ§Ã£o renderizada com sucesso.

ValidaÃ§Ã£o pendente por ausÃªncia de Node/NPM no PATH do agente:

```powershell
npm install
npm run build
```
# Fase 3.1 - TDD de Cliente HTTP e AutenticaÃ§Ã£o no Frontend

## Objetivo

Criar uma base de autenticaÃ§Ã£o reutilizÃ¡vel para o remote MFE e exportÃ¡vel para o shell.

## Vermelho

Os testes/validaÃ§Ãµes da fase devem cobrir:

- Cliente HTTP centralizado lÃª a URL base de `VITE_MS_AUTH_URL`.
- Cliente HTTP adiciona `Authorization: Bearer <token>` quando houver token.
- Cliente HTTP trata `401` removendo sessÃ£o local.
- Cliente HTTP preserva `403` para decisÃ£o da UI.
- `AuthContext` centraliza login, logout, usuÃ¡rio autenticado e token.
- Remote exporta contrato estÃ¡vel para shell: tipos, auth service e provider.

## Verde

Comportamentos esperados:

- Login chama `/login`, armazena token e notifica o shell por callback.
- Cadastro chama `/register`.
- Erros de API aparecem no formulÃ¡rio.
- SessÃ£o fica centralizada no `AuthContext`.
- O contrato exportÃ¡vel fica em `src/federation/authContract.ts`.

## RefatoraÃ§Ã£o

- Substituir mocks locais por integraÃ§Ã£o real com backend/API Gateway.
- Manter componentes desacoplados do storage direto.
- Preparar testes com Vitest e React Testing Library.

## Melhorias Aplicadas

- Criado cliente HTTP centralizado em `src/services/httpClient.ts`.
- Cliente HTTP lÃª `VITE_MS_AUTH_URL`.
- Cliente HTTP adiciona `Authorization: Bearer <token>` em chamadas autenticadas.
- Cliente HTTP limpa o token local ao receber `401`.
- `403` Ã© preservado como `ApiClientError` para decisÃ£o da UI.
- Criado `AuthProvider`/`useAuth` em `src/hooks/useAuth.tsx`.
- Login chama `/login`, armazena token e chama callback do shell.
- Cadastro chama `/register`.
- Contrato exportÃ¡vel criado em `src/federation/authContract.ts`.
- Tipos compartilhados criados em `src/types/auth.ts` e `src/types/api.ts`.

## ValidaÃ§Ã£o

ValidaÃ§Ã£o estÃ¡tica realizada por busca de configuraÃ§Ã£o e exports. Build pendente porque Node/NPM nÃ£o estÃ£o disponÃ­veis no PATH do agente.
# Fase 4 - TDD de UI Enterprise

## Objetivo

Evoluir o shell para uma primeira experiÃªncia enterprise, com navegaÃ§Ã£o, sidebar responsiva, dashboard inicial e tema dark/light.

## Vermelho

Os testes/validaÃ§Ãµes desta fase devem garantir:

- Shell possui Navbar.
- Shell possui Sidebar responsiva.
- Shell possui Dashboard inicial.
- Shell possui aÃ§Ã£o de alternar tema.
- Shell mantÃ©m rotas de login/cadastro federadas.
- Shell preserva `Suspense`, fallback de carregamento e `ErrorBoundary`.

## Verde

Comportamentos esperados:

- UsuÃ¡rio autenticado vÃª dashboard com indicadores iniciais.
- UsuÃ¡rio nÃ£o autenticado Ã© redirecionado para `/login`.
- Logout limpa sessÃ£o local.
- Interface usa MUI e evita estilos inline como base principal.

## Melhorias Aplicadas

- Shell recebeu tema dark/light com MUI.
- Shell recebeu AppBar, Sidebar, Dashboard e cards de status.
- Shell manteve carregamento lazy dos remotes e `ErrorBoundary`.

## ValidaÃ§Ã£o

- Build do shell deve ser validado com `npm run build` dentro de `chave-shell-main/chave-shell-main`.
- Artefatos `dist/` sÃ£o ignorados pelo Git.

ValidaÃ§Ã£o realizada via WSL Ubuntu:

```bash
cd /mnt/c/Users/rafae/Downloads/Grupo-3/Grupo-3/chave-shell-main/chave-shell-main
npm install
npm run build
```

Resultado:

```text
vite v5.4.21 building for production...
11545 modules transformed.
built in 2m 58s
```

Status: build do shell aprovado.
