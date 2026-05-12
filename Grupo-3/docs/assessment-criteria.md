# Critérios Avaliativos — Projeto Chave

Este documento detalha os critérios de avaliação utilizados na disciplina de Engenharia de Software II para o Projeto Chave (Grupo 3).

---

## 👨‍🏫 1. Avaliação do Professor (70%)

A avaliação do docente foca na conformidade técnica, arquitetura e processos de qualidade.

| Critério | Peso | Insuficiente (0–49%) | Regular (50–69%) | Bom (70–89%) | Excelente (90–100%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Governança e ADR** | 20% | ADR ausente ou sem justificativas técnicas mínimas. | ADR básico, descrevendo tecnologias mas sem análise de trade-offs. | ADR bem estruturado, justificando a stack. | ADR exemplar; justifica decisões de design para o domínio. |
| **MS de Autenticação** | 25% | Não funcional ou sem padrões de segurança mínimos. | Funcional, mas com falhas no fluxo de JWT ou sem Refresh Token. | Implementação sólida com documentação Swagger completa. | Robusto; RBAC funcional, conteinerizado com Docker e integrado ao Ministack. |
| **Microfrontend (MFE)** | 20% | Não utiliza a stack obrigatória. | Utiliza React/MUI, mas com inconsistências. | MFE funcional, seguindo o design system (MUI). | Interface fluida; manual de UI claro e tipagem rigorosa com TypeScript. |
| **DevOps e Qualidade** | 20% | Sem pipelines de CI/CD ou sem testes unitários. | Pipeline existe, mas falha ou não gera releases no Docker Hub/NPM. | CI/CD funcional no GitHub Actions com execução de testes unitários. | Pipeline otimizado; alta cobertura de testes e geração automática de releases. |
| **Uso de IA: Logs e Crítica** | 15% | Sem registro de logs ou uso de código com "alucinações" óbvias. | Logs básicos ou parciais; pouco discernimento sobre código gerado. | Logs organizados e evidência de revisão humana para ajustar à arquitetura. | Logs detalhados com evidências de uso crítico e reforço de design. |

---

## 👥 2. Avaliação dos Pares (15%)

Avaliação realizada pelos outros grupos da turma durante a apresentação.

| Eixo de Avaliação | Critério de Observação | Peso |
| :--- | :--- | :--- |
| **Clareza Arquitetural** | O grupo explicou bem como as decisões de design foram tomadas? | 30% |
| **Qualidade da Demo** | A funcionalidade de autenticação e a interface pareceram estáveis e fluidas? | 30% |
| **Viabilidade de Adoção** | O serviço de Auth apresentado parece robusto o suficiente para ser padrão? | 25% |
| **Documentação** | O manual de UI e o Swagger facilitam o entendimento por terceiros? | 15% |

---

## 🧘 3. Autoavaliação (15%)

Reflexão interna do grupo sobre o aprendizado e o processo de desenvolvimento.

| Eixo de Avaliação | Critério de Reflexão | Peso |
| :--- | :--- | :--- |
| **Domínio Tecnológico** | Evoluímos no uso de TypeScript, Docker, Ministack e GitHub Actions? | 30% |
| **Uso Crítico de IA** | Como utilizamos a IA e o quanto revisamos/validamos o que ela gerou? | 25% |
| **Gestão e Processo** | Mantivemos o Kanban e os repositórios organizados conforme as regras? | 25% |
| **Resolução de Desafios** | Qual foi nossa capacidade de superar impedimentos técnicos (bugs, ambiente)? | 20% |

---
> [!IMPORTANT]
> A nota final é a média ponderada das três seções acima. A transparência nos logs de IA é obrigatória para a validação dos critérios de Governança.
