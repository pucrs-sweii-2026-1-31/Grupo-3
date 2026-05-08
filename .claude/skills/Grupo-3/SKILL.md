```markdown
# Grupo-3 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `Grupo-3` TypeScript repository. It covers file organization, code style, commit message standards, and testing practices. By following these guidelines, contributors can maintain consistency and quality throughout the codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `userService.ts`, `orderController.ts`

### Import Style
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import userService from './userService';
    ```

### Export Style
- Use **default exports** for modules.
  - Example:
    ```typescript
    // userService.ts
    const userService = { /* ... */ };
    export default userService;
    ```

### Commit Messages
- Use **conventional commits** with the `feat` prefix for new features.
  - Example:
    ```
    feat: add user authentication middleware
    ```

## Workflows

### Feature Development
**Trigger:** When adding a new feature  
**Command:** `/feature-development`

1. Create a new branch for your feature.
2. Implement the feature using TypeScript and follow the coding conventions.
3. Write or update tests in files matching `*.test.*`.
4. Commit changes using the conventional commit format with the `feat` prefix.
5. Push your branch and open a pull request.

### Testing
**Trigger:** Before merging or submitting a pull request  
**Command:** `/run-tests`

1. Identify test files (matching `*.test.*`).
2. Run the project's test suite using the appropriate test runner.
3. Ensure all tests pass before proceeding.

## Testing Patterns

- Test files are named using the pattern `*.test.*` (e.g., `userService.test.ts`).
- The specific testing framework is not detected, but tests should be placed alongside or near the code they validate.
- Example test file structure:
  ```typescript
  // userService.test.ts
  import userService from './userService';

  describe('userService', () => {
    it('should return user data', () => {
      // test implementation
    });
  });
  ```

## Commands
| Command              | Purpose                                 |
|----------------------|-----------------------------------------|
| /feature-development | Start a new feature development workflow|
| /run-tests           | Run all tests in the repository         |
```