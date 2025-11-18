# Wikipedia Playwright Tests

Playwright automation portfolio project with BDD + daily CI/CD

## Documented Test Cases (Given-When-Then)

| ID   | Feature: Search on Wikipedia                                                                                                                                                                                                                                      |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TC01 | **Search for an existing article**<br>**Given** the user is on the Portuguese Wikipedia homepage<br>**When** the user types "Linguagem JavaScript" in the search box and clicks Search<br>**Then** the article title should contain "JavaScript"                  |
| TC02 | **Search with no results**<br>**Given** the user is on the homepage<br>**When** the user types a random 30-character string that does not exist<br>**Then** the message "There are no results for your search" (or similar) should be displayed                   |
| TC03 | **Navigation from search results**<br>**Given** the user has searched for "Automação de testes"<br>**When** the user clicks on the first suggested article link<br>**Then** the URL should no longer contain "/wiki/Special:Search"                               |
| TC04 | **Language switch**<br>**Given** the user is on the Portuguese homepage<br>**When** the user clicks the "English" link in the footer<br>**Then** the URL should contain "en.wikipedia.org" and the page title should change to "Wikipedia, the free encyclopedia" |
| TC05 | **Mobile responsiveness**<br>**Given** the browser is in mobile viewport (Pixel 5)<br>**When** the user opens Wikipedia<br>**Then** the hamburger menu should be visible and functional                                                                           |

> Only the first one are fully automated with Playwright  
> Status: 1/5 Passed (updated daily via GitHub Actions)
> 4 more to complete

[![Playwright Tests](https://github.com/ipuiuna/wikipedia-playwright-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/ipuiuna/wikipedia-playwright-tests/actions/workflows/playwright.yml)

Automated tests with Playwright running weekly (every Monday at 06:00 BRT)
Full report: https://ipuiuna.github.io/wikipedia-playwright-tests/
