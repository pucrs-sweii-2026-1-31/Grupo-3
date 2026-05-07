---
name: project-skeleton-initialization
description: Workflow command scaffold for project-skeleton-initialization in Grupo-3.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /project-skeleton-initialization

Use this workflow when working on **project-skeleton-initialization** in `Grupo-3`.

## Goal

Sets up the initial skeleton for a new project or major module, including backend, frontend, infrastructure, and configuration files.

## Common Files

- `Grupo-3/Trabalho_Eng_Soft_II/Dockerfile`
- `Grupo-3/Trabalho_Eng_Soft_II/pom.xml`
- `Grupo-3/Trabalho_Eng_Soft_II/src/main/java/com/example/Trabalho_Eng_Soft_II/**`
- `Grupo-3/Trabalho_Eng_Soft_II/src/test/java/com/example/Trabalho_Eng_Soft_II/**`
- `Grupo-3/Trabalho_Eng_Soft_II/src/main/resources/application.properties`
- `Grupo-3/chave-infra-main/chave-infra-main/**`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Add .gitignore and basic config files
- Add Dockerfile and build scripts
- Add backend source files (controllers, models, services, repositories, configs, DTOs, exceptions)
- Add backend test files (unit/integration tests for controllers, services, repositories)
- Add backend resources (application.properties)

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.