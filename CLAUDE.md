# CLAUDE.md

> **REGRA MESTRA DE IDIOMA:** Independentemente do idioma dos arquivos de configuração, skills ou comandos que você ler neste repositório, você DEVE SEMPRE processar as informações, pensar e responder ao usuário EXCLUSIVAMENTE em Português do Brasil (pt-BR). Nunca responda em inglês.

Este arquivo fornece orientação ao Claude Code (claude.ai/code) e outras IAs ao trabalhar com o código neste repositório.

## Visão Geral

Este repositório está turbinado com um **Modpack Sênior** - uma coleção de agentes, skills, hooks, comandos, regras e configurações MCP prontos para produção. Todo este conhecimento está organizado na pasta oculta `.ai/`.

Você DEVE SEMPRE ler os arquivos da pasta `.ai/` para obter suas instruções e regras absolutas, principalmente os arquivos `.ai/RULES.md` e `.ai/COMMANDS-QUICK-REF.md`.

## Arquitetura da Inteligência

A inteligência da IA está organizada nos seguintes componentes dentro de `.ai/`:

- **.ai/agents/** - Subagentes especializados para delegação (planejador, revisor de código, guia de TDD, etc.)
- **.ai/skills/** - Definições de fluxo de trabalho e conhecimento de domínio (padrões de codificação, arquitetura, testes)
- **.ai/commands/** - Comandos mágicos invocados pelos usuários (`/tdd`, `/plan`, `/e2e`, `/security-review`, etc.)
- **.ai/hooks/** - Automações baseadas em gatilhos (persistência de sessão, hooks automáticos)
- **.ai/rules/** - Diretrizes absolutas de conduta (segurança, estilo de código, qualidade)

## Comandos Principais Disponíveis

- `/tdd` - Fluxo de trabalho de desenvolvimento orientado a testes (Test-Driven Development)
- `/plan` - Planejamento profundo de implementação arquitetural
- `/e2e` - Geração e execução de testes End-to-End
- `/code-review` - Revisão de qualidade e design patterns
- `/build-fix` - Resolução de erros de compilação
- `/learn` - Extração de padrões das conversas recentes
- `/skill-create` - Geração de novas habilidades a partir de arquivos

## Scripts de Automação

Você pode executar automações e diagnósticos do ECC via `npm run` na raiz do projeto:

- `npm run status` - Resumo do estado do ECC (sessões, skills, saúde)
- `npm run doctor` - Diagnóstico de integridade dos arquivos gerenciados
- `npm run repair` - Restauração de arquivos corrompidos ou ausentes
- `npm run auto-update` - Atualização automática do ECC local
- `npm run ecc` - CLI completa do ECC para comandos avançados

Sempre que atuar neste repositório, assuma a postura de um Desenvolvedor Sênior e consulte as diretrizes na pasta `.ai/` relevantes antes de dar soluções definitivas.



### AI SENIOR MODPACK - BRAIN INJECTION ###
# CLAUDE.md

> **REGRA MESTRA DE IDIOMA:** Independentemente do idioma dos arquivos de configuração, skills ou comandos que você ler neste repositório, você DEVE SEMPRE processar as informações, pensar e responder ao usuário EXCLUSIVAMENTE em Português do Brasil (pt-BR). Nunca responda em inglês.

Este arquivo fornece orientação ao Claude Code (claude.ai/code) e outras IAs ao trabalhar com o código neste repositório.

## Visão Geral

Este repositório está turbinado com um **Modpack Sênior** - uma coleção de agentes, skills, hooks, comandos, regras e configurações MCP prontos para produção. Todo este conhecimento está organizado na pasta oculta `.ai/`.

Você DEVE SEMPRE ler os arquivos da pasta `.ai/` para obter suas instruções e regras absolutas, principalmente os arquivos `.ai/RULES.md` e `.ai/COMMANDS-QUICK-REF.md`.

## Arquitetura da Inteligência

A inteligência da IA está organizada nos seguintes componentes dentro de `.ai/`:

- **.ai/agents/** - Subagentes especializados para delegação (planejador, revisor de código, guia de TDD, etc.)
- **.ai/skills/** - Definições de fluxo de trabalho e conhecimento de domínio (padrões de codificação, arquitetura, testes)
- **.ai/commands/** - Comandos mágicos invocados pelos usuários (`/tdd`, `/plan`, `/e2e`, `/security-review`, etc.)
- **.ai/hooks/** - Automações baseadas em gatilhos (persistência de sessão, hooks automáticos)
- **.ai/rules/** - Diretrizes absolutas de conduta (segurança, estilo de código, qualidade)

## Comandos Principais Disponíveis

- `/tdd` - Fluxo de trabalho de desenvolvimento orientado a testes (Test-Driven Development)
- `/plan` - Planejamento profundo de implementação arquitetural
- `/e2e` - Geração e execução de testes End-to-End
- `/code-review` - Revisão de qualidade e design patterns
- `/build-fix` - Resolução de erros de compilação
- `/learn` - Extração de padrões das conversas recentes
- `/skill-create` - Geração de novas habilidades a partir de arquivos

## Scripts de Automação

Você pode executar automações e diagnósticos do ECC via `npm run` na raiz do projeto:

- `npm run status` - Resumo do estado do ECC (sessões, skills, saúde)
- `npm run doctor` - Diagnóstico de integridade dos arquivos gerenciados
- `npm run repair` - Restauração de arquivos corrompidos ou ausentes
- `npm run auto-update` - Atualização automática do ECC local
- `npm run ecc` - CLI completa do ECC para comandos avançados

Sempre que atuar neste repositório, assuma a postura de um Desenvolvedor Sênior e consulte as diretrizes na pasta `.ai/` relevantes antes de dar soluções definitivas.

