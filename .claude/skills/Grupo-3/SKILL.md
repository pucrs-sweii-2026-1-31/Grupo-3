```markdown
# Grupo-3 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill outlines the core development patterns, coding conventions, and workflows used in the Grupo-3 repository. The project is primarily Java-based (backend) with a TypeScript/React frontend, and it emphasizes test-driven development (TDD), clear documentation, and consistent code style. The repository uses conventional commits, structured documentation, and automated testing to ensure maintainability and quality.

## Coding Conventions

### File Naming
- **Java & TypeScript/React files:** Use `camelCase` for file names.
  - Example: `userController.java`, `userProfile.tsx`

### Import Style
- **Relative imports** are preferred.
  - Example (TypeScript/React):
    ```typescript
    import UserCard from './UserCard';
    ```
  - Example (Java):
    ```java
    import com.grupo3.service.userService;
    ```

### Export Style
- **Mixed export styles** are used depending on the language and context.
  - Example (TypeScript):
    ```typescript
    export default UserProfile;
    export { UserCard };
    ```
  - Example (Java):
    ```java
    public class UserService { ... }
    ```

### Commit Messages
- **Conventional commits** with prefixes like `docs`, `feat`.
  - Example:
    ```
    feat: add user authentication controller
    docs: update architecture diagram for new phase
    ```

## Workflows

### Feature Development with TDD
**Trigger:** When implementing a new feature, architectural phase, or major refactor using TDD and updating documentation.  
**Command:** `/feature-tdd`

1. **Implement or Refactor Code**
   - Add or update backend Java classes (e.g., controllers, services).
   - Add or update frontend components or services (TypeScript/React).
2. **Add or Update Tests**
   - Write or update unit/integration tests for new or changed code.
   - Example (TypeScript test):
     ```typescript
     import { render, screen } from '@testing-library/react';
     import UserCard from './UserCard';

     test('renders user name', () => {
       render(<UserCard name="Alice" />);
       expect(screen.getByText('Alice')).toBeInTheDocument();
     });
     ```
   - Example (Java test):
     ```java
     @Test
     public void testUserService() {
         UserService service = new UserService();
         assertEquals("Alice", service.getUserName(1));
     }
     ```
3. **Update Documentation**
   - Update architecture docs, TDD logs, or UI manuals as needed.
   - Example: Add a new section to `docs/architecture/feature-x.md`.
4. **Update Configuration or Scripts (if needed)**
   - Modify Docker, CI/CD, or scripts to support new features.

**Files Involved:**
- `src/main/java/**/*.java`
- `src/test/java/**/*.java`
- `front-end/src/**/*.tsx`
- `front-end/src/**/*.ts`
- `front-end/src/**/*.test.tsx`
- `front-end/src/**/*.test.ts`
- `docs/architecture/*.md`
- `docs/tdd-journey/*.md`
- `docs/ui-manual.md`
- `scripts/*.ps1`

---

### Documentation Phase Delivery
**Trigger:** When finalizing and documenting a project phase or milestone.  
**Command:** `/document-phase`

1. **Write or Update Documentation**
   - Update architecture or UI documentation to reflect the current state.
   - Example: Edit `docs/architecture/phase2.md` or `docs/ui-manual.md`.
2. **Add or Update Reports**
   - Complete or revise phase/milestone reports (e.g., `docs/FINAL-REPORT.md`).

**Files Involved:**
- `docs/architecture/*.md`
- `docs/ui-manual.md`
- `docs/FINAL-REPORT.md`

---

## Testing Patterns

- **Testing Framework:** [vitest](https://vitest.dev/) (for frontend TypeScript/React)
- **Test File Pattern:** Files end with `.test.tsx` or `.test.ts`
  - Example: `userCard.test.tsx`
- **Test Example:**
  ```typescript
  import { render, screen } from '@testing-library/react';
  import LoginForm from './LoginForm';

  test('shows error on invalid input', () => {
    render(<LoginForm />);
    // Simulate user input and assert error message
  });
  ```
- **Java Tests:** Use standard JUnit patterns in `src/test/java/**/*.java`.

## Commands

| Command          | Purpose                                                      |
|------------------|--------------------------------------------------------------|
| /feature-tdd     | Start a new feature or refactor with TDD and documentation   |
| /document-phase  | Finalize and document a project phase or milestone           |
```