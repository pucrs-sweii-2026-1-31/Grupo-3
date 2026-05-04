# Referência Rápida de Comandos (Skills)

> **💡 DICA DE OURO PARA O GITHUB COPILOT:** 
> Para que o Copilot não tenha "preguiça" e leia o manual de como executar esses comandos com perfeição, **você DEVE começar sua mensagem com `@workspace`**. 
> Exemplo: `@workspace Faça um /plan para a nova funcionalidade de login.`

---

## 🏆 O Guia de Sobrevivência (Os 4 Comandos de Ouro)
Se você não quiser decorar tudo, decore apenas estes 4 comandos. Eles formam o ciclo perfeito para você iniciar e manter qualquer projeto:

1. **`/plan` (O Arquiteto):** Use ANTES de começar qualquer funcionalidade nova. Ele impede a IA de sair codando bagunçado. Ele desenha a arquitetura, prevê bugs e pede sua aprovação para começar.
2. **`/code-review` (O Revisor):** Use APÓS escrever código. Ele procura ativamente por falhas de segurança e violação de boas práticas.
3. **`/build-fix` (O Socorrista):** Use QUANDO DER ERRO. O projeto não compila? O Java estourou exceção? Use esse comando para acionar o especialista em resolver quebras.
4. **`/tdd` (O Fiscal):** Use PARA CRIAR TESTES obrigatórios antes de fazer regras de negócios importantes.

**Resumo Rápido:**
* Vai criar algo novo? `→ /plan`
* Terminou de escrever? `→ /code-review`
* Deu pau e não roda? `→ /build-fix`

---

## Fluxo de Trabalho Principal

| Comando | O que ele faz |
|---------|-------------|
| `/plan` | Analisa requisitos, avalia riscos e escreve um plano de implementação passo a passo — **espera sua confirmação antes de tocar no código** |
| `/tdd` | Força o desenvolvimento orientado a testes (TDD): cria interface → escreve teste que falha → implementa → verifica 80%+ de cobertura |
| `/code-review` | Revisão completa de qualidade, segurança e manutenibilidade dos arquivos alterados |
| `/build-fix` | Detecta e corrige erros de compilação — delega automaticamente para o agente correto de resolução de build |
| `/verify` | Executa o ciclo completo de verificação: compilar (build) → lint → testar → checar tipagem |
| `/quality-gate` | Verificação de qualidade (Quality Gate) contra os padrões do projeto |

---

## Testes

| Comando | O que ele faz |
|---------|-------------|
| `/tdd` | Fluxo TDD universal (qualquer linguagem) |
| `/e2e` | Gera + roda testes End-to-End (Playwright), captura screenshots/vídeos/rastros |
| `/test-coverage` | Relata a cobertura de testes e identifica lacunas |
| `/go-test` | Fluxo TDD para Go (baseado em tabelas, 80%+ cobertura) |
| `/kotlin-test` | TDD para Kotlin (Kotest + Kover) |
| `/rust-test` | TDD para Rust (cargo test, testes de integração) |
| `/cpp-test` | TDD para C++ (GoogleTest + gcov/lcov) |

---

## Revisão de Código (Code Review)

| Comando | O que ele faz |
|---------|-------------|
| `/code-review` | Revisão de código universal |
| `/python-review` | Python — PEP 8, dicas de tipagem, segurança, padrões idiomáticos |
| `/go-review` | Go — padrões idiomáticos, segurança de concorrência, tratamento de erros |
| `/kotlin-review` | Kotlin — null safety, segurança de corrotinas, arquitetura limpa |
| `/rust-review` | Rust — ownership, lifetimes, uso do unsafe |
| `/cpp-review` | C++ — segurança de memória, paradigmas modernos, concorrência |

---

## Corretores de Build (Build Fixers)

| Comando | O que ele faz |
|---------|-------------|
| `/build-fix` | Autodetecta a linguagem e corrige erros de compilação |
| `/go-build` | Corrige erros de build do Go e avisos do `go vet` |
| `/kotlin-build` | Corrige erros do compilador Kotlin/Gradle |
| `/rust-build` | Corrige erros de compilação do Rust e do borrow checker |
| `/cpp-build` | Corrige problemas do CMake e do linker em C++ |
| `/gradle-build` | Corrige erros do Gradle para Android / KMP |

---

## Planejamento & Arquitetura

| Comando | O que ele faz |
|---------|-------------|
| `/plan` | Plano de implementação com avaliação de risco |
| `/multi-plan` | Planejamento colaborativo com múltiplos modelos (IAs) |
| `/multi-workflow` | Desenvolvimento colaborativo com múltiplos modelos |
| `/multi-backend` | Desenvolvimento com foco no Backend (múltiplos modelos) |
| `/multi-frontend` | Desenvolvimento com foco no Frontend (múltiplos modelos) |
| `/multi-execute` | Execução colaborativa com múltiplos modelos |
| `/orchestrate` | Guia para orquestração de múltiplos agentes via tmux/worktree |
| `/devfleet` | Orquestrar agentes em paralelo via DevFleet |

---

## Gerenciamento de Sessão

| Comando | O que ele faz |
|---------|-------------|
| `/save-session` | Salva o estado atual da conversa/sessão |
| `/resume-session` | Carrega a última sessão salva e continua de onde parou |
| `/sessions` | Navega, pesquisa e gerencia o histórico de sessões |
| `/checkpoint` | Marca um ponto de salvamento (checkpoint) na sessão atual |
| `/aside` | Responde a uma pergunta rápida sem perder o contexto da tarefa atual |
| `/context-budget` | Analisa o uso da janela de contexto da IA — encontra peso de tokens, otimiza |

---

## Aprendizado & Melhoria

| Comando | O que ele faz |
|---------|-------------|
| `/learn` | Extrai padrões reutilizáveis da sessão atual |
| `/learn-eval` | Extrai padrões + autoavalia a qualidade antes de salvar |
| `/evolve` | Analisa instintos aprendidos, sugere estruturas de skill evoluídas |
| `/promote` | Promove instintos do escopo do projeto para escopo global |
| `/instinct-status` | Mostra todos os instintos aprendidos (projeto + global) com pontuação de confiança |
| `/instinct-export` | Exporta instintos para um arquivo |
| `/instinct-import` | Importa instintos de um arquivo ou URL |
| `/skill-create` | Analisa o histórico do git local → gera uma skill reutilizável |
| `/skill-health` | Painel de saúde do portfólio de skills com análises |
| `/rules-distill` | Escaneia skills, extrai princípios transversais e os condensa em regras |

---

## Refatoração & Limpeza

| Comando | O que ele faz |
|---------|-------------|
| `/refactor-clean` | Remove código morto, consolida duplicatas, limpa a estrutura |
| `/prompt-optimize` | Analisa um rascunho de prompt e cospe uma versão enriquecida e otimizada |

---

## Documentação & Pesquisa

| Comando | O que ele faz |
|---------|-------------|
| `/docs` | Pesquisa na documentação atual da biblioteca/API via Context7 |
| `/update-docs` | Atualiza a documentação do projeto |
| `/update-codemaps` | Regenera mapas de código (codemaps) para o repositório |

---

## Loops & Automação

| Comando | O que ele faz |
|---------|-------------|
| `/loop-start` | Inicia um loop de agente recorrente em um intervalo de tempo |
| `/loop-status` | Verifica o status dos loops em execução |
| `/claw` | Inicia o NanoClaw v2 — um terminal (REPL) persistente com roteamento de modelo e carregamento de skills |

---

## Projeto & Infraestrutura

| Comando | O que ele faz |
|---------|-------------|
| `/projects` | Lista projetos conhecidos e suas estatísticas de instinto |
| `/harness-audit` | Audita a configuração do ambiente de agente quanto a confiabilidade e custo |
| `/eval` | Roda o ambiente de avaliação |
| `/model-route` | Encaminha uma tarefa para o modelo certo (Haiku / Sonnet / Opus / GPT-4o) |
| `/pm2` | Inicialização do gerenciador de processos PM2 |
| `/setup-pm` | Configura o gerenciador de pacotes (npm / pnpm / yarn / bun) |

---

## Guia de Decisão Rápida

```text
Começando uma nova feature?     → /plan primeiro, depois /tdd
Acabou de escrever código?      → /code-review
O build quebrou/deu erro?       → /build-fix
Precisa de documentação viva?   → /docs <nome-da-biblioteca>
A sessão está terminando?       → /save-session ou /learn-eval
Continuando no dia seguinte?    → /resume-session
O contexto ficou muito pesado?  → /context-budget e depois /checkpoint
Quer extrair o que aprendeu?    → /learn-eval e depois /evolve
Rodando tarefas repetitivas?    → /loop-start
```
