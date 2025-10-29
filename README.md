# OrangeHRM Playwright Automation Framework

This repository contains the initial setup for a modern **UI automation framework** using  
**Playwright + TypeScript + Page Action Model (PAM)** for the OrangeHRM demo application

## Project Overview

This first version defines the **project architecture, tooling, and dependency setup**.  
No tests or automation flows have been implemented yet.

Future updates will include:

- Page and Action layers for Login, PIM, and Admin modules
- Reusable fixtures and data management
- Allure reporting and CI/CD integration

### Folder Structure

```
src/
├── actions/       # Business flows (to be implemented)
├── fixtures/      # Shared setup/teardown (to be implemented)
├── pages/         # Page Objects (to be implemented)
├── tests/         # Test suites (to be implemented)
├── utils/         # Helpers, data, and configuration
└── config/        # Constants and environment settings
```

## Tech Stack

- [Playwright](https://playwright.dev/) (v1.48+)
- [TypeScript](https://www.typescriptlang.org/)
- [Allure Reporter](https://docs.qameta.io/allure/)
- ESLint + Prettier for code quality
- Node.js 20+

## Installation & Setup

### Prerequisites

- Node.js 20+
- Git

### Initial Setup

Clone the repository and run:

```bash
npm run setup
```

This command installs all dependencies and downloads Playwright browsers.

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

🟡 **Current:**

- Framework and environment successfully configured.  
- Initial Page Object implemented (`LoginPage`) with stable locator strategy and ESLint v9 + Prettier integration validated.

🟢 **Next Steps:** 

- Implement `LoginActions` with basic login workflow  
- Add first Playwright test scenarios for valid and invalid login  
- Configure `playwright.config.ts` (browser matrix, retries, reports)  
- Expand Page Objects for PIM and Admin modules

## Author

**Rodrigo Barroco**
Quality Automation Engineer
Project: Optii QA Automation Challenge
