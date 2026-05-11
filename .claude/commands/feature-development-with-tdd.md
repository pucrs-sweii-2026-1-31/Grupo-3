---
name: feature-development-with-tdd
description: Workflow command scaffold for feature-development-with-tdd in Grupo-3.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-development-with-tdd

Use this workflow when working on **feature-development-with-tdd** in `Grupo-3`.

## Goal

Implements a new feature or architectural phase using test-driven development, including implementation, tests, and documentation updates.

## Common Files

- `Grupo-3/Trabalho_Eng_Soft_II/src/main/java/**/*.java`
- `Grupo-3/Trabalho_Eng_Soft_II/src/test/java/**/*.java`
- `Grupo-3/front-end/src/**/*.tsx`
- `Grupo-3/front-end/src/**/*.ts`
- `Grupo-3/front-end/src/**/*.test.tsx`
- `Grupo-3/front-end/src/**/*.test.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Implement or refactor code in backend or frontend (e.g., controllers, services, components)
- Add or update corresponding unit/integration tests
- Update or create documentation (architecture, TDD logs, UI manual, etc.)
- Update configuration or scripts if needed (e.g., Docker, CI/CD, scripts)

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.