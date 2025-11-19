# Wikipedia Playwright Tests

Playwright automation project with BDD + weekly CI/CD

## Documented Test Cases (Given-When-Then)

| ID   | Feature: Search on Wikipedia                                                                                                                                                                                                                                                                  |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TC01 | **Should return relevant results for existing article search**<br>**Given** the user is on the Portuguese Wikipedia homepage<br>**When** the user types "Linguagem JavaScript" in the search box and clicks Search<br>**Then** the article title should contain "JavaScript"                  |
| TC02 | **Should display "no results" for invalid search**<br>**Given** the user is on the homepage<br>**When** the user types a random 30-character string that does not exist<br>**Then** the message "There are no results for your search" (or similar) should be displayed                       |
| TC03 | **Should navigate from search results to article page**<br>**Given** the user has searched for "Automação de testes"<br>**When** the user clicks on the first suggested article link<br>**Then** the URL should no longer contain "/wiki/Special:Search"                                      |
| TC04 | **Should switch interface language to English**<br>**Given** the user is on the Portuguese homepage<br>**When** the user clicks the "English" link in the footer<br>**Then** the URL should contain "en.wikipedia.org" and the page title should change to "Wikipedia, the free encyclopedia" |
| TC05 | **Should show functional hamburger menu on mobile viewport**<br>**Given** the browser is in mobile viewport (Pixel 5)<br>**When** the user opens Wikipedia<br>**Then** the hamburger menu should be visible and functional                                                                    |

> TC01 / TC02 / TC03 / TC04 implemented<br>
> Status: 4/5 Passed (updated daily via GitHub Actions)<br>
> TC05 to be implemented<br>

[![Playwright Tests](https://github.com/ipuiuna/wikipedia-playwright-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/ipuiuna/wikipedia-playwright-tests/actions/workflows/playwright.yml)

Automated tests with Playwright running weekly (every Monday at 06:00 BRT)
Full report: https://ipuiuna.github.io/wikipedia-playwright-tests/
