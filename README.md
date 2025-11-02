# OrangeHRM Playwright Automation Framework

This repository contains the initial setup for a modern **UI automation framework** using  
**Playwright + TypeScript + Page Action Model (PAM)** for the OrangeHRM demo application

## Project Overview

This framework follows a **modular and scalable design** using Page and Action layers, providing clean separation between:

- Page Objects (UI elements and actions)
- Business Flows (Auth, Dashboard, Time)
- Reusable Fixtures and Configurations

## Current Scope (v1)

The first implemented test suite covers the **authentication flow**:
- Added `LoginPage` with robust Playwright locators.
- Created `AuthActions` for reusable login flows.
- Implemented **Login Matrix Test** to validate:
  - Successful login with valid credentials  
  - Invalid credentials error handling  
  - Required field validations (username/password)

### Folder Structure

```
src/
├── actions/ # Business logic (e.g., Auth, Time)
├── config/ # Constants and environment settings
├── fixtures/ # Shared setup/teardown (future use)
├── pages/ # Page Objects (Login, Dashboard, etc.)
├── tests/ # Test suites (feature-based)
└── utils/ # Helpers, data, and configuration
```

## Tech Stack

- [Playwright](https://playwright.dev/) (v1.48+)
- [TypeScript](https://www.typescriptlang.org/)
- [Allure Reporter](https://docs.qameta.io/allure/)
- ESLint + Prettier for code quality
- Node.js 20+
- GitHub Actions CI (to be added)

## Setup & Run

### Prerequisites

- Node.js 20+
- Git

### Installation

Clone the repository and run:

```bash
npm run setup
```

This command installs all dependencies and downloads Playwright browsers.

### Running Tests

Headed mode:
```bash
npm run test
``` 

Headless mode:
```bash
npx playwright test --headless
``` 

Debug mode (opens Playwright inspector):
```bash 
npx playwright test --debug
```

Show report:
```bash
npx playwright show-report
```

## Code Quality and Formatting

The project uses ESLint v9 (Flat Config) and Prettier to enforce consistent code style.

### Run static analysis

```bash
npm run lint
```

Runs ESLint against all `.ts` files in the `src/` directory.

> If no TypeScript files exist yet, ESLint will report
>
> `No files matching the pattern "src" were found.`
>
> This is expected until code is added.

### Auto-fix issues

```
npm run lint:fix
```

Applies automatic fixes for minor problems.

### Format code

```
npm run format
```

Runs Prettier on all files to keep code style consistent.

## Project Status

**Current:**

- Framework and environment fully configured (Playwright + TypeScript + ESLint v9 + Prettier).  
- `LoginPage` implemented with stable, role-based Playwright locators.  
- `AuthActions` created for reusable login workflows.  
- `login.matrix.spec.ts` added, covering:
  - Successful authentication  
  - Invalid credentials validation  
  - Required field validation for username and password  
- All imports resolved using TypeScript aliases (`@base`), linting and formatting validated.

**Next Steps:** 

- Add `DashboardPage` to validate main widgets and navigation menu items.  
- Implement `TimePage` to automate Punch In/Out workflows.  
- Integrate Allure reporting and attach artifacts on test failure.  
- Configure GitHub Actions CI for automated headless execution.  
- Expand Page Action Model for Admin and PIM modules.

## Author

**Rodrigo Barroco**
Quality Automation Engineer
Project: OrangeHRM QA Automation Challenge
