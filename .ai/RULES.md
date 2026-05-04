# Regras (Rules)

> **REGRA MESTRA DE IDIOMA:** Independentemente do idioma dos arquivos de configuração, skills ou comandos que você ler neste repositório, você DEVE SEMPRE processar as informações, pensar e responder ao usuário EXCLUSIVAMENTE em Português do Brasil (pt-BR). Nunca responda em inglês.

## Sempre Faça (Must Always)
- Delegue tarefas de domínio para agentes especializados.
- Escreva testes antes da implementação e verifique caminhos críticos.
- Valide as entradas e mantenha as verificações de segurança intactas.
- Prefira atualizações imutáveis em vez de modificar o estado compartilhado.
- Siga os padrões de repositório estabelecidos antes de inventar novos.
- Mantenha as contribuições focadas, revisáveis e bem descritas.

## Nunca Faça (Must Never)
- Incluir dados confidenciais, como chaves de API, tokens, segredos ou caminhos de arquivo absolutos/do sistema na saída.
- Enviar alterações não testadas.
- Ignorar verificações de segurança ou hooks de validação.
- Duplicar funcionalidades existentes sem um motivo claro.
- Entregar código sem verificar a suíte de testes relevante.
- **CRIAR, ALTERAR OU SALVAR** QUALQUER tipo de arquivo do usuário (código, documentação, ADRs, testes, etc) dentro das pastas `.ai/` e `.vscode/`. A pasta `.ai/` é ESTRITA E EXCLUSIVA para as regras da IA, e a `.vscode/` é apenas para configurações do editor. **TUDO** que for referente ao projeto do usuário (como a pasta `src/`, `docs/`, `adr/`, etc) DEVE ser criado na raiz do projeto (fora dessas pastas ocultas).
## Formato do Agente
- Os agentes vivem em `agents/*.md`.
- Cada arquivo inclui YAML frontmatter com `name`, `description`, `tools` e `model`.
- Os nomes dos arquivos são em letras minúsculas com hifens e devem corresponder ao nome do agente.
- As descrições devem comunicar claramente quando o agente deve ser invocado.

## Formato de Skill
- As skills vivem em `skills/<name>/SKILL.md`.
- Cada skill inclui YAML frontmatter com `name`, `description` e `origin`.
- Use `origin: ECC` para skills nativas e `origin: community` para skills importadas/da comunidade.
- O corpo das skills deve incluir orientação prática, exemplos testados e seções claras de "Quando Usar" (When to Use).

## Formato de Hook
- Os hooks usam registro JSON baseado em matchers e pontos de entrada (entrypoints) em shell ou Node.
- Os matchers devem ser específicos em vez de genéricos abrangentes.
- Use `exit 1` apenas quando o bloqueio do comportamento for intencional; caso contrário, use `exit 0`.
- Mensagens de erro e informação devem ser acionáveis.

## Estilo de Commit
- Use conventional commits como `feat(skills):`, `fix(hooks):` ou `docs:`.
- Mantenha as alterações modulares e explique o impacto para o usuário no resumo do PR.


### AI SENIOR MODPACK - BRAIN INJECTION ###
# Regras (Rules)

> **REGRA MESTRA DE IDIOMA:** Independentemente do idioma dos arquivos de configuração, skills ou comandos que você ler neste repositório, você DEVE SEMPRE processar as informações, pensar e responder ao usuário EXCLUSIVAMENTE em Português do Brasil (pt-BR). Nunca responda em inglês.

## Sempre Faça (Must Always)
- Delegue tarefas de domínio para agentes especializados.
- Escreva testes antes da implementação e verifique caminhos críticos.
- Valide as entradas e mantenha as verificações de segurança intactas.
- Prefira atualizações imutáveis em vez de modificar o estado compartilhado.
- Siga os padrões de repositório estabelecidos antes de inventar novos.
- Mantenha as contribuições focadas, revisáveis e bem descritas.

## Nunca Faça (Must Never)
- Incluir dados confidenciais, como chaves de API, tokens, segredos ou caminhos de arquivo absolutos/do sistema na saída.
- Enviar alterações não testadas.
- Ignorar verificações de segurança ou hooks de validação.
- Duplicar funcionalidades existentes sem um motivo claro.
- Entregar código sem verificar a suíte de testes relevante.
- **CRIAR, ALTERAR OU SALVAR** QUALQUER tipo de arquivo do usuário (código, documentação, ADRs, testes, etc) dentro das pastas `.ai/` e `.vscode/`. A pasta `.ai/` é ESTRITA E EXCLUSIVA para as regras da IA, e a `.vscode/` é apenas para configurações do editor. **TUDO** que for referente ao projeto do usuário (como a pasta `src/`, `docs/`, `adr/`, etc) DEVE ser criado na raiz do projeto (fora dessas pastas ocultas).
## Formato do Agente
- Os agentes vivem em `agents/*.md`.
- Cada arquivo inclui YAML frontmatter com `name`, `description`, `tools` e `model`.
- Os nomes dos arquivos são em letras minúsculas com hifens e devem corresponder ao nome do agente.
- As descrições devem comunicar claramente quando o agente deve ser invocado.

## Formato de Skill
- As skills vivem em `skills/<name>/SKILL.md`.
- Cada skill inclui YAML frontmatter com `name`, `description` e `origin`.
- Use `origin: ECC` para skills nativas e `origin: community` para skills importadas/da comunidade.
- O corpo das skills deve incluir orientação prática, exemplos testados e seções claras de "Quando Usar" (When to Use).

## Formato de Hook
- Os hooks usam registro JSON baseado em matchers e pontos de entrada (entrypoints) em shell ou Node.
- Os matchers devem ser específicos em vez de genéricos abrangentes.
- Use `exit 1` apenas quando o bloqueio do comportamento for intencional; caso contrário, use `exit 0`.
- Mensagens de erro e informação devem ser acionáveis.

## Estilo de Commit
- Use conventional commits como `feat(skills):`, `fix(hooks):` ou `docs:`.
- Mantenha as alterações modulares e explique o impacto para o usuário no resumo do PR.
