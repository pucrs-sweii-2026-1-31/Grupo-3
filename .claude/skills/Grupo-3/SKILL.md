```markdown
# Grupo-3 Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches the core development patterns and workflows used in the Grupo-3 repository, a Java-based project with modular backend, frontend, infrastructure, and shell components. It covers coding conventions, project structure, and step-by-step guides for initializing new project skeletons. The repository emphasizes clear organization, consistent naming, and modularization, making it easy to scale and maintain.

## Coding Conventions

### File Naming

- **Java files:** Use PascalCase for class names and file names.
  - Example: `UserController.java`, `ApplicationService.java`
- **Configuration and resource files:** Use lowercase with hyphens or underscores.
  - Example: `application.properties`, `docker-compose.yml`
- **Frontend files:** Follow framework conventions (e.g., PascalCase for components).

### Import Style

- Mixed import styles are used, both single-class and wildcard imports.
  - Example:
    ```java
    import java.util.List;
    import com.example.Trabalho_Eng_Soft_II.models.*;
    ```

### Export Style

- Default export style for Java: each public class is in its own file named after the class.
  - Example:
    ```java
    public class UserService {
        // ...
    }
    ```

### Directory Structure

- **Backend:** `src/main/java/com/example/Trabalho_Eng_Soft_II/`
- **Backend tests:** `src/test/java/com/example/Trabalho_Eng_Soft_II/`
- **Resources:** `src/main/resources/`
- **Frontend:** `front-end/`
- **Infrastructure:** `chave-infra-main/`
- **Shell:** `chave-shell-main/`

## Workflows

### Project Skeleton Initialization

**Trigger:** When starting a new project or major module (backend, frontend, infra, shell), to establish the base structure and configuration.

**Command:** `/init-skeleton`

**Step-by-step:**

1. **Add .gitignore and basic config files**
   - Ensure `.gitignore` is present to exclude build artifacts and environment files.
2. **Add Dockerfile and build scripts**
   - Place a `Dockerfile` at the project root for containerization.
3. **Add backend source files**
   - Create directories for controllers, models, services, repositories, configs, DTOs, and exceptions under `src/main/java/com/example/Trabalho_Eng_Soft_II/`.
   - Example:
     ```
     src/main/java/com/example/Trabalho_Eng_Soft_II/controllers/UserController.java
     src/main/java/com/example/Trabalho_Eng_Soft_II/models/User.java
     ```
4. **Add backend test files**
   - Place unit and integration tests under `src/test/java/com/example/Trabalho_Eng_Soft_II/`.
   - Example:
     ```
     src/test/java/com/example/Trabalho_Eng_Soft_II/controllers/UserControllerTest.java
     ```
5. **Add backend resources**
   - Add `application.properties` under `src/main/resources/` for configuration.
6. **Add frontend source files**
   - Set up directories for pages, components, styles, and configs under `front-end/`.
   - Example:
     ```
     front-end/src/components/Header.jsx
     front-end/src/pages/Home.jsx
     ```
7. **Add infra files**
   - Include infrastructure scripts and configs such as `Makefile`, `docker-compose.yml`, and Terraform files in `chave-infra-main/`.
8. **Add shell files**
   - Place shell-specific files like `Dockerfile`, `index.html`, `package.json`, and Vite config in `chave-shell-main/`.

**Example Directory Structure:**
```
Grupo-3/
  .gitignore
  Trabalho_Eng_Soft_II/
    Dockerfile
    pom.xml
    src/
      main/
        java/com/example/Trabalho_Eng_Soft_II/
        resources/application.properties
      test/
        java/com/example/Trabalho_Eng_Soft_II/
  chave-infra-main/
    docker-compose.yml
    Makefile
    ...
  chave-shell-main/
    Dockerfile
    index.html
    package.json
    ...
  front-end/
    src/
      components/
      pages/
      ...
```

## Testing Patterns

- **Testing framework:** Unknown (no explicit framework detected).
- **Test file pattern:** Java test files are located in `src/test/java/com/example/Trabalho_Eng_Soft_II/`.
- **Naming convention:** Test files are named after the class under test, suffixed with `Test`.
  - Example:
    ```
    UserServiceTest.java
    ```
- **Frontend tests:** If present, follow the pattern `*.test.ts` (TypeScript), typically for unit/component tests.

## Commands

| Command         | Purpose                                                    |
|-----------------|------------------------------------------------------------|
| /init-skeleton  | Initialize a new project or major module skeleton          |
```
