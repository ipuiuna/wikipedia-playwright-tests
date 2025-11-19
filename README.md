# Wikipedia Playwright Tests
Playwright automation project with BDD + weekly CI/CD

## Documented Test Cases (Given-When-Then)

| ID | Feature: Search on Wikipedia |
|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TC01 | **Should return relevant results for existing article search**<br>**Given** the user is on the Portuguese Wikipedia homepage<br>**When** the user searches for "Linguagem JavaScript"<br>**Then** the first result should contain "JavaScript" and be reachable |
| TC02 | **Should display "no results" for invalid search**<br>**Given** the user is on the homepage<br>**When** the user searches for a random 30-character string that does not exist<br>**Then** a "no results found" message should be displayed |
| TC03 | **Should navigate from search results to article page**<br>**Given** the user has searched for "Automação de testes"<br>**When** the user clicks on the first result link<br>**Then** the URL should change to the article page and no longer contain "Special:Search" |
| TC04 | **Should switch interface language to English**<br>**Given** the user is on the Portuguese Wikipedia homepage<br>**Whenсор** the user selects English from the language menu<br>**Then** the URL should contain "en.wikipedia.org"<br>**And** the page title should be "Wikipedia, the free encyclopedia" |
| TC05 | **Should show functional hamburger menu on mobile viewport**<br>**Given** the browser viewport is set to mobile size (Pixel 5)<br>**When** the user opens Wikipedia<br>**Then** the hamburger menu button should be visible and functional |

## Execution Status

![Playwright Tests](https://github.com/ipuiuna/wikipedia-playwright-tests/actions/workflows/playwright.yml/badge.svg?branch=main)
![Stability](https://img.shields.io/badge/Stability-100%25-brightgreen)

- Automated tests with Playwright running **weekly** (every Monday at 06:00 BRT)
- Full HTML report: https://github.com/ipuiuna/wikipedia-playwright-tests

## How to Run Locally

```bash
# 1. Clone and install
git clone https://github.com/ipuiuna/wikipedia-playwright-tests.git
cd wikipedia-playwright-tests
npm ci

# 2. Install browsers
npx playwright install

# 3. Run all tests (desktop + mobile)
npx playwright test

# Optional: run specific scenarios
npx playwright test --grep "@mobile"      # only mobile tests
npx playwright test --grep "@desktop"    # only desktop tests
npx playwright test "wikipedia.spec.ts"  # only Wikipedia module

# View report
npx playwright show-report
