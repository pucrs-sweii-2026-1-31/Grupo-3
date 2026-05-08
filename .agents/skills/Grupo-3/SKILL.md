```markdown
# Grupo-3 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the Grupo-3 JavaScript codebase. It covers file naming, import/export styles, commit message conventions, and testing patterns. By following these guidelines, contributors can maintain code consistency and quality across the project.

## Coding Conventions

### File Naming
- **Use PascalCase** for all file names.
  - Example: `UserProfile.js`, `LoginForm.js`

### Import Style
- **Use relative imports** to reference modules within the project.
  - Example:
    ```javascript
    import UserProfile from './UserProfile';
    ```

### Export Style
- **Use default exports** for modules.
  - Example:
    ```javascript
    // UserProfile.js
    const UserProfile = () => { /* ... */ };
    export default UserProfile;
    ```

### Commit Messages
- **Follow Conventional Commits** with the `chore` prefix.
  - Example:
    ```
    chore: update dependencies
    ```

## Workflows

### Code Contribution
**Trigger:** When adding or updating code in the repository  
**Command:** `/contribute`

1. Create a new file using PascalCase naming.
2. Write your code, using relative imports and default exports.
3. Write or update corresponding test files (see Testing Patterns).
4. Commit your changes using a conventional commit message with the `chore` prefix.
5. Push your branch and open a pull request.

### Running Tests
**Trigger:** When you need to verify code correctness  
**Command:** `/run-tests`

1. Locate test files matching the `*.test.*` pattern.
2. Use the project's preferred test runner (framework not specified; check project documentation or package.json).
3. Run all tests and review results.

## Testing Patterns

- **Test files** are named with the pattern `*.test.*` (e.g., `UserProfile.test.js`).
- The testing framework is not specified; check for documentation or dependencies in `package.json`.
- Place test files alongside the modules they test or in a dedicated `tests` directory.

#### Example Test File
```javascript
// UserProfile.test.js
import UserProfile from './UserProfile';

test('UserProfile renders correctly', () => {
  // Test implementation here
});
```

## Commands
| Command        | Purpose                                      |
|----------------|----------------------------------------------|
| /contribute    | Start the code contribution workflow         |
| /run-tests     | Run all test files in the project            |
```
