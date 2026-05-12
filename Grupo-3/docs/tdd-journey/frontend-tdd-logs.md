# Fase 5 - TDD de Testes UnitÃ¡rios do Frontend

## Objetivo

Configurar uma base de testes unitÃ¡rios para o remote MFE usando Vitest e React Testing Library.

## Vermelho

Os testes devem cobrir inicialmente:

- RenderizaÃ§Ã£o do formulÃ¡rio de login.
- SubmissÃ£o do login chamando `AuthContext`.
- RenderizaÃ§Ã£o do formulÃ¡rio de cadastro.
- SubmissÃ£o de cadastro chamando `AuthContext`.
- Cliente HTTP anexando Bearer JWT.
- Cliente HTTP limpando token em `401`.

## Verde

Comportamentos esperados:

- `npm test` executa a suÃ­te.
- `npm run test:coverage` gera cobertura.
- Componentes principais do remote auth possuem testes iniciais.

## ObservaÃ§Ã£o

O shell ainda estÃ¡ em JavaScript. A suÃ­te inicial foi adicionada no remote TypeScript (`front-end`). A expansÃ£o para o shell fica para a prÃ³xima passada ou para a migraÃ§Ã£o do shell para TypeScript.

## Melhorias Aplicadas

- Scripts `test`, `test:watch` e `test:coverage` adicionados ao remote.
- Vitest configurado com ambiente `jsdom`.
- React Testing Library configurado com `@testing-library/jest-dom`.
- Testes iniciais adicionados para `LoginForm`, `RegisterForm` e `httpClient`.

## ValidaÃ§Ã£o

Validar no terminal com Node/NPM:

```powershell
cd .\Grupo-3\front-end
npm install
npm test
npm run build
```

ValidaÃ§Ã£o realizada via WSL Ubuntu:

```bash
cd /mnt/c/Users/rafae/Downloads/Grupo-3/Grupo-3/front-end
npm install
npm test
npm run build
```

Resultado dos testes:

```text
Test Files  3 passed (3)
Tests       6 passed (6)
```

Resultado do build:

```text
vite v5.4.21 building for production...
936 modules transformed.
remoteEntry.js gerado.
built in 17.61s
```

Status: testes e build do remote MFE aprovados.
# Fase 6 - TDD de Infraestrutura e MiniStack

## Objetivo

Validar a stack local e reduzir falhas de configuraÃ§Ã£o antes dos testes integrados completos.

## Vermelho

As validaÃ§Ãµes devem cobrir:

- `.env` pode ser criado/atualizado por comando.
- `docker compose config` renderiza com `.env`.
- VariÃ¡veis obrigatÃ³rias sÃ£o verificadas.
- URLs locais principais respondem quando a stack estÃ¡ rodando.
- Logs e status dos containers podem ser consultados por script.

## Verde

Comportamentos esperados:

- Script de ambiente prepara `JWT_SECRET`, credenciais locais e URLs.
- Smoke test valida shell, remote entry, backend e MiniStack.
- Erros de infraestrutura aparecem com mensagens claras.

## Melhorias Aplicadas

- Criado script `setup-env.ps1` para preparar `.env`.
- Criado script `smoke-infra.ps1` para validar Compose e endpoints locais.
- Compose foi ajustado para usar `VITE_MS_AUTH_URL` com `/api/auth`.

## ValidaÃ§Ã£o

ValidaÃ§Ã£o de configuraÃ§Ã£o executada:

```powershell
powershell -ExecutionPolicy Bypass -File .\Grupo-3\scripts\smoke-infra.ps1 -SkipHttp
docker compose --env-file .env.example config --quiet
```

Resultado:

```text
OK: docker compose config valido
```

O smoke HTTP completo deve ser executado com Docker Desktop e a stack rodando:

```powershell
powershell -ExecutionPolicy Bypass -File .\Grupo-3\scripts\smoke-infra.ps1
```
# Fase 7 - DocumentaÃ§Ã£o TÃ©cnica e Arquitetura

## Arquitetura Geral do Sistema
A aplicaÃ§Ã£o adota uma arquitetura distribuÃ­da composta por:
- **Backend:** Spring Boot, responsÃ¡vel por gerenciar regras de negÃ³cios, persistÃªncia no PostgreSQL e autenticaÃ§Ã£o baseada em JWT.
- **Frontend Micro-Frontends (MFE):** Arquitetura baseada em React e Vite com o plugin Module Federation.
  - **Host (Shell):** Ponto de entrada da aplicaÃ§Ã£o (`chave-shell`).
  - **Remote:** MÃ³dulo de autenticaÃ§Ã£o (`chave-mfe-auth`).
- **Infraestrutura Local:** Docker Compose orquestrando o banco de dados PostgreSQL, LocalStack/MiniStack para simulaÃ§Ã£o AWS (API Gateway) e um container com Terraform para provisionamento local.

## Diagrama de IntegraÃ§Ã£o (Mermaid)

```mermaid
graph TD;
    Shell[Frontend Shell - Porta 3000] -->|Consome remoteEntry| MFEAuth[MFE AutenticaÃ§Ã£o - Porta 4001];
    Shell -->|RequisiÃ§Ãµes API via Gateway| MiniStack[MiniStack API Gateway - Porta 4566];
    MFEAuth -->|RequisiÃ§Ãµes API via Gateway| MiniStack;
    MiniStack -->|Roteia requisiÃ§Ãµes| Backend[Backend Spring Boot - Porta 3001/8080];
    Backend -->|PersistÃªncia| DB[(PostgreSQL - Porta 5432)];
    Terraform[Terraform Provisioner] -->|Configura Gateway| MiniStack;
```

## ContÃªineres e Portas
- `postgres` (Porta 5432): Banco de dados relacional.
- `ministack` (Porta 4566): Emulador de serviÃ§os cloud.
- `infra-provisioner`: Executa scripts Terraform para inicializar os serviÃ§os mockados no MiniStack.
- `chave-ms-auth` (Porta 3001): AplicaÃ§Ã£o backend principal.
- `chave-mfe-auth` (Porta 4001): Micro-frontend isolado para regras de login.
- `chave-shell` (Porta 3000): AplicaÃ§Ã£o container que integra as pÃ¡ginas e remotes.
# Fase 8 - Guia de UI / Design System

## IntroduÃ§Ã£o
Este guia define os padrÃµes visuais baseados na biblioteca **Material-UI (MUI)** adotada no projeto, buscando consistÃªncia nas aplicaÃ§Ãµes front-end (Host e Remotes). O objetivo Ã© uma estÃ©tica corporativa (Enterprise UI), moderna e adaptÃ¡vel.

## Paleta de Cores e Temas
A aplicaÃ§Ã£o deve suportar **Light Mode** e **Dark Mode**.
- **PrimÃ¡ria (Primary):** Azul corporativo escuro (`#1976d2`).
- **SecundÃ¡ria (Secondary):** Tonalidades de destaque (`#dc004e`).
- **Background (Light):** Tons pastÃ©is ou branco absoluto (`#ffffff` / `#f4f6f8`).
- **Background (Dark):** Cinza escuro ou preto suavizado (`#121212`).

## Tipografia
- Fonte base recomendada: **Inter** ou **Roboto**.
- CabeÃ§alhos (H1 a H6) com pesos variando de `400` a `700`.
- Texto padrÃ£o do corpo com tamanho legÃ­vel (e.g., `1rem` base).

## EspaÃ§amentos e Layouts
- **Grid de 8px:** Todo o layout segue a escala de 8px (margins, paddings). Ex: `theme.spacing(1) = 8px`, `theme.spacing(2) = 16px`.
- **Componentes Centrais:**
  - `Navbar`: Fixada no topo com elevaÃ§Ã£o sutil (box-shadow).
  - `Sidebar`: Responsiva (drawer fixo no desktop, overlay no mobile).
  - `Dashboard/Containers`: Utilizam `<Container maxWidth="lg">` para limitaÃ§Ã£o de largura e legibilidade.

## Componentes ReutilizÃ¡veis a Documentar
- **BotÃµes:** PadrÃµes `contained`, `outlined` e `text` previstos no MUI.
- **Campos de FormulÃ¡rio (TextField):** Variante `outlined` ativada por padrÃ£o com suporte a validaÃ§Ã£o e mensagens de erro integradas (vermelho para erros).
- **Cards:** Com bordas arredondadas (radius leve, ex: `8px`) e sombras sutis para sensaÃ§Ã£o de profundidade e glassmorphism se aplicÃ¡vel.

## Responsividade
- Utilizar breakpoints do MUI (`xs`, `sm`, `md`, `lg`, `xl`).
- Ocultar Sidebars em tamanhos menores (`xs` e `sm`) em favor de um menu *Hamburger*.
