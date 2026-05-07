```markdown
# Grupo-3 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the Grupo-3 Java codebase. It covers file naming, import/export styles, commit conventions, and testing patterns, providing practical examples and suggested commands for common workflows. This guide is ideal for onboarding new contributors or maintaining consistency across the project.

## Coding Conventions

### File Naming
- **Pattern:** PascalCase
- **Example:**  
  ```java
  public class UserProfile { ... }
  ```

### Import Style
- **Pattern:** Relative imports
- **Example:**  
  ```java
  import grupo3.models.UserProfile;
  ```

### Export Style
- **Pattern:** Named exports (public classes or methods)
- **Example:**  
  ```java
  public class UserProfile {
      public String getName() { ... }
  }
  ```

### Commit Patterns
- **Type:** Freeform (no strict prefix required)
- **Average Length:** ~42 characters
- **Example:**  
  ```
  Add user authentication and session handling
  ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or module  
**Command:** `/add-feature`

1. Create a new Java file using PascalCase for the class name.
2. Implement the feature using relative imports for dependencies.
3. Export the feature as a public class or method.
4. Write corresponding test files following the `*.test.*` pattern.
5. Commit changes with a descriptive, freeform message.

### Writing and Running Tests
**Trigger:** When verifying code correctness  
**Command:** `/run-tests`

1. Create a test file named with the pattern `*.test.*` (e.g., `UserProfile.test.java`).
2. Implement test cases for your classes and methods.
3. Use the project's preferred test runner (framework unknown; check project documentation or scripts).
4. Run the tests and ensure all pass before merging.

### Code Review and Merge
**Trigger:** When preparing code for integration  
**Command:** `/review-merge`

1. Ensure your code follows the coding conventions (file naming, imports, exports).
2. Confirm all tests pass.
3. Submit a pull request for review.
4. Address any feedback and merge upon approval.

## Testing Patterns

- **Framework:** Unknown (refer to project documentation for specifics)
- **File Naming:** Test files follow the pattern `*.test.*` (e.g., `OrderService.test.java`)
- **Example Test File:**
  ```java
  public class UserProfileTest {
      // Test methods here
  }
  ```

## Commands
| Command       | Purpose                                    |
|---------------|--------------------------------------------|
| /add-feature  | Start workflow for adding a new feature    |
| /run-tests    | Run all test files in the project          |
| /review-merge | Prepare code for review and merging        |
```
