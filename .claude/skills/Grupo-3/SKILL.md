```markdown
# Grupo-3 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `Grupo-3` Java repository. It covers file naming, import/export styles, commit message conventions, and testing patterns. By following these guidelines, contributors can maintain consistency and quality across the codebase.

## Coding Conventions

### File Naming
- Use **PascalCase** for all file names.
  - **Example:**  
    ```java
    MyClass.java
    UserService.java
    ```

### Import Style
- Use **relative imports** for referencing other classes or packages within the project.
  - **Example:**  
    ```java
    import com.grupo3.utils.Helper;
    ```

### Export Style
- Use **named exports** (standard Java `public class` or `public interface`).
  - **Example:**  
    ```java
    public class UserService {
        // class implementation
    }
    ```

### Commit Message Conventions
- Use **conventional commit** format.
- Prefix with `chore` for maintenance and non-feature changes.
- Keep commit messages concise (average 46 characters).
  - **Example:**  
    ```
    chore: update dependencies for security patch
    ```

## Workflows

### Code Contribution
**Trigger:** When adding or updating code  
**Command:** `/contribute`

1. Create a new branch for your feature or fix.
2. Write code following the coding conventions above.
3. Add or update tests as needed (see Testing Patterns).
4. Commit changes using the conventional commit format.
5. Push your branch and open a pull request.

### Dependency Update
**Trigger:** When dependencies need to be updated  
**Command:** `/update-deps`

1. Identify outdated dependencies.
2. Update dependency versions in the project files.
3. Test the project to ensure compatibility.
4. Commit changes with a `chore` prefix.
   - Example: `chore: update dependency X to v1.2.3`
5. Push changes and open a pull request.

## Testing Patterns

- Test files follow the pattern `*.test.*` (e.g., `UserService.test.java`).
- The specific testing framework is not detected, but tests should be placed alongside or near the code they test.
- Ensure that all new features or bug fixes include relevant tests.

  **Example Test File:**
  ```java
  // UserService.test.java
  public class UserServiceTest {
      // test methods
  }
  ```

## Commands
| Command         | Purpose                                   |
|-----------------|-------------------------------------------|
| /contribute     | Start the code contribution workflow      |
| /update-deps    | Begin the dependency update workflow      |
```
