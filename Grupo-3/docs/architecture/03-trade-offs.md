# ADR 03: Análise de Trade-offs e Justificativas Tecnológicas

## Status
Aceito

## Contexto
O projeto exige uma arquitetura escalável de micro-frontends e um backend robusto com foco em segurança (Autenticação e Autorização).

## Decisões e Trade-offs

### 1. Vite + Module Federation vs Webpack
- **Justificativa:** Vite oferece um tempo de inicialização (HMR) significativamente mais rápido que o Webpack.
- **Trade-off:** O Module Federation no Vite via `@originjs/vite-plugin-federation` é um plugin da comunidade, enquanto no Webpack 5 é nativo. No entanto, o ganho de performance em desenvolvimento compensa a dependência do plugin.

### 2. React + TypeScript
- **Justificativa:** TypeScript garante segurança de tipos em contratos complexos entre o Shell e os MFEs.
- **Trade-off:** Maior tempo inicial de configuração (boilerplate), mas reduz drasticamente bugs em tempo de execução.

### 3. Material UI (MUI) como Design System
- **Justificativa:** Acelera o desenvolvimento com componentes acessíveis e profissionais.
- **Trade-off:** Bundle size maior. Mitigado através de tree-shaking e uso de dependências compartilhadas no Module Federation.

### 4. Spring Boot + Security + JWT
- **Justificativa:** Ecossistema maduro para aplicações corporativas e facilidade de integração com padrões OAuth2/JWT.
- **Trade-off:** Consumo de memória superior a frameworks como Node.js ou Go. Justificado pela robustez e ferramentas de auditoria/segurança nativas.

### 5. PostgreSQL + LocalStack (MiniStack)
- **Justificativa:** Simulação fiel do ambiente AWS (API Gateway) em ambiente local usando Terraform.
- **Trade-off:** Complexidade na orquestração do Docker Compose. Mitigado pela criação de scripts de `smoke_tests` e `make setup`.

## Consequências
- A stack é moderna e produtiva.
- O ambiente local exige Docker Desktop devido à simulação de nuvem.
- A cobertura de testes automatizada é mandatória para manter a estabilidade da federação.
