```markdown
# Grupo-3 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `Grupo-3` TypeScript codebase. You'll learn how to structure files, write imports/exports, follow commit message conventions, and organize tests. This guide also provides suggested commands for common workflows to streamline your development process.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.ts`, `orderService.ts`

### Import Style
- Use **relative imports** for referencing other modules.
  - Example:
    ```typescript
    import { getUser } from './userService';
    ```

### Export Style
- Use **named exports** for functions, types, and constants.
  - Example:
    ```typescript
    // In userService.ts
    export function getUser(id: string) { ... }
    export const USER_ROLE = 'admin';

    // In another file
    import { getUser, USER_ROLE } from './userService';
    ```

### Commit Messages
- Follow the **conventional commit** style.
- Use the `chore` prefix for maintenance or non-feature commits.
  - Example:
    ```
    chore: update dependencies and fix minor lint issues
    ```

## Workflows

### Code Maintenance
**Trigger:** When performing non-feature changes such as dependency updates, refactoring, or minor fixes.
**Command:** `/chore`

1. Make your maintenance changes (e.g., update dependencies, refactor code).
2. Stage and commit your changes using the `chore` prefix in your commit message.
   - Example: `chore: refactor user service for readability`
3. Push your changes to the repository.

## Testing Patterns

- Test files follow the `*.test.*` naming pattern.
  - Example: `userService.test.ts`
- The testing framework is **unknown**; check existing test files for specifics.
- Place test files alongside the modules they test or in a dedicated test directory.

  Example test file structure:
  ```
  src/
    userService.ts
    userService.test.ts
  ```

## Commands
| Command | Purpose |
|---------|---------|
| /chore  | Run code maintenance or non-feature update workflow |
```
