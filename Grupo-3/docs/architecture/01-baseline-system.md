# Fase 0 - Linha de Base e Organização

## Objetivo

Registrar o estado atual do projeto antes de alterar backend, frontend, microfrontend, testes, infraestrutura ou documentação.

## Estrutura Atual

```text
Grupo-3/
|-- Trabalho_Eng_Soft_II/              Backend Spring Boot
|-- front-end/                          Remote MFE em React + TypeScript + Vite
|-- chave-shell-main/chave-shell-main/  Shell host em React + Vite
|-- chave-infra-main/chave-infra-main/  Docker Compose, MiniStack e Terraform
|-- docs/                               Documentação do projeto
|-- scripts/                            Scripts de validação
```

## Achados da Linha de Base

- O backend é uma API Spring Boot focada em autenticação e usuários.
- O backend usa Spring Security, JWT, JPA, validação, Swagger/OpenAPI, PostgreSQL e H2 nos testes.
- O backend já possui testes de service, controller, repository, token e carga de contexto.
- O remote frontend já usa React 18, TypeScript, Vite, MUI e `@originjs/vite-plugin-federation`.
- O shell já consome `mfe_auth` com Module Federation, lazy loading e `Suspense`.
- A infraestrutura já define Postgres, MiniStack, provisionador Terraform, backend, remote MFE e shell.
- Os testes de frontend ainda não estão configurados.
- No ambiente inicial, `java`, `mvn`, `node` e `npm` não estavam no PATH; por isso, a validação local precisava usar Docker ou um ambiente preparado.

## Lacunas Conhecidas Para as Próximas Fases

- `UserServiceTest` precisava mockar `RoleRepository`.
- `UserControllerTest` usava mock de método `void` para `deletarUsuario`, mas o service retorna `boolean`.
- As dependências compartilhadas do Module Federation incluíam apenas `react` e `react-dom`; MUI e Emotion também precisam ser compartilhados.
- O shell ainda está em JavaScript e deve migrar para TypeScript na arquitetura alvo.
- URLs da API e dos remotes precisam ser totalmente orientadas por variáveis de ambiente.
- O Docker Compose aceitava variáveis vazias quando `.env` não existia.
- A rota do API Gateway usada pelo frontend precisa ser validada contra a rota Terraform `/api/{proxy+}`.
- A prontidão do MiniStack/Terraform usa `service_started`, que não prova que o provisionamento terminou.

## Comandos Padrão

Rodar a validação da linha de base a partir da raiz do repositório:

```powershell
powershell -ExecutionPolicy Bypass -File .\Grupo-3\scripts\validate-baseline.ps1
```

Validar diretamente o Docker Compose:

```powershell
docker compose --env-file .env.example config
```

Rodar testes do backend quando Java/Maven estiverem disponíveis:

```powershell
.\mvnw.cmd test
```

Comandos do remote MFE quando Node/NPM estiverem disponíveis:

```powershell
npm install
npm run build
```

Comandos do shell quando Node/NPM estiverem disponíveis:

```powershell
npm install
npm run build
```

## Critérios de Aceite da Fase 0

- Estrutura do projeto documentada.
- `.env.example` criado para a stack local.
- Script obrigatório de validação da linha de base criado.
- Configuração do Docker Compose renderiza usando `.env.example`.
- Riscos conhecidos registrados antes do início das implementações.
- Próximas fases possuem uma referência estável para backend, frontend, infraestrutura e documentação.
