# Critérios de Aceite do Projeto

## Backend

- Testes unitários passam para services, controllers, repositories, validação, comportamento de segurança e tratamento de erros.
- Regras de negócio para criação de usuário, email duplicado, username duplicado, atribuição de role, login e exclusão estão cobertas.
- Respostas da API possuem contratos consistentes de sucesso e erro.
- Autenticação JWT está validada e documentada.
- Swagger/OpenAPI reflete a API implementada.

## Contratos da API

- Contratos dos endpoints documentados.
- Exemplos de request e response documentados.
- Códigos de erro documentados.
- Rotas públicas e protegidas documentadas.
- Modelo de autenticação Bearer JWT documentado.

## Frontend e Microfrontend

- Shell host e remote MFE rodam com React 18, TypeScript, Vite, MUI e Module Federation.
- `@originjs/vite-plugin-federation` configurado no host e no remote.
- `exposes`, `remotes` e dependências compartilhadas configuradas.
- Dependências compartilhadas incluem `react`, `react-dom`, `@mui/material`, `@emotion/react` e `@emotion/styled`.
- Lazy loading, `Suspense`, fallback de carregamento e error boundaries implementados.
- Shell consegue consumir o contrato exportado pelo remote.

## Autenticação no Frontend

- Cliente HTTP possui interceptors.
- Respostas `401` e `403` são tratadas.
- `AuthContext` gerencia o estado global de autenticação.
- Token JWT é enviado como `Authorization: Bearer <token>` nas chamadas protegidas.
- URLs da API e dos remotes são configuradas por variáveis de ambiente.

## Testes do Frontend

- Vitest e React Testing Library configurados.
- Componentes, hooks, services, rotas, layouts e páginas principais possuem testes unitários.
- Chamadas de API são mockadas quando necessário.
- Estados de carregamento, erro, sucesso e rota protegida são testados.

## Infraestrutura

- Docker Compose renderiza com sucesso usando `.env.example`.
- Stack inicia com as variáveis obrigatórias.
- Backend, remote MFE, shell, Postgres, MiniStack e provisionador Terraform são validados.
- Containers se comunicam corretamente.
- Logs e fluxo de inicialização são compreensíveis.
- Smoke tests validam API, shell, remote entry e conectividade do backend.

## Documentação

- Documentação de arquitetura criada.
- Guia de UI/design system criado.
- Contratos da API e documentação de autenticação criados.
- Runbook local criado.
- Fluxos principais e infraestrutura documentados com diagramas quando útil.
