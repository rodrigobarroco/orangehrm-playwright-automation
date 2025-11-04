# OrangeHRM Playwright Automation

Automated end-to-end test suite for the [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/) using **Playwright + TypeScript**.  
The suite validates key modules like Login, Dashboard, and Time (Punch In/Out, Records, Duplicate Prevention, etc.) following clean BDD-style documentation.

## Quick Start

Clone o repositório e rode tudo localmente:

# 1. Clone o projeto
```bash
git clone https://github.com/rodrigobarroco/orangehrm-playwright-automation.git
cd orangehrm-playwright-automation
```
# 2. Instale as dependências
```bash
npm ci
```
# 3. Instale os navegadores do Playwright
```bash
npx playwright install --with-deps
```
# 4. Execute os testes
```bash
npm test
```

## Continuous Integration

| Workflow | Status |
|-----------|--------|
| Playwright Tests | ![Playwright Tests](https://github.com/rodrigobarroco/orangehrm-playwright-automation/actions/workflows/playwright.yml/badge.svg) |

**Latest Allure Report:**  
[View Report on GitHub Pages](https://rodrigobarroco.github.io/orangehrm-playwright-automation/)  
*(updated automatically after each successful CI run)*


## Stack

- **Playwright** (browser automation)
- **TypeScript** (strict typing)
- **Allure Report** (visual test reports)
- **GitHub Actions** (CI/CD pipeline)
- **Page Object Model** (structured test design)


## Scripts

```bash
# Run tests locally
npm run test

# Generate and open Allure report locally
npm run report:allure

# Lint and fix
npm run lint:fix

# Format code
npm run format
```

## Project Structure

```bash
src/
├── fixtures/           # Shared test setup and teardown
├── pages/              # Page Object Models
├── tests/
│   ├── login/          # Login feature tests
│   ├── dashboard/      # Dashboard validations
│   └── time/           # Time Module (Punch In/Out, Records)
└── utils/              # Helpers and custom assertions
```
## Requirements

- Node.js 20+

Verify your version:
```bash
node -v
```

- npm 10+ (included with Node)

- Playwright Browsers
```bash
npx playwright install --with-deps
```

- Allure Commandline
Installed automatically as a dev dependency (`allure-commandline`).

## Conventions

- Tags like `@punch` or `@records` group tests by feature.

- Each test follows a readable BDD-style block:

```bash
/**
 * Scenario: Edit existing Punch In/Out record successfully
 *
 * Given I am on the Attendance > My Records page
 * When I click the edit icon for a record
 * And update the Punch Out Note field
 * Then I should see a success toast message "Successfully Updated"
 */
```

## CI Flow Summary

1. Install dependencies and Playwright browsers

2. Run tests headless on Ubuntu

3. Upload playwright-report, test-results, and allure-results artifacts

4. Generate Allure report

5. Deploy to GitHub Pages

### Author
**Rodrigo Barroco** Quality Automation Engineer Project: OrangeHRM QA Automation Challenge
