import { Page, Locator, expect } from '@playwright/test';

export class WikiPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly noResults: Locator;
  readonly resultsContainer: Locator;
  readonly searchResults: Locator;
  private lastSearchTerm: string = '';

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page
      .locator('input#searchInput, input[name="search"]')
      .first();

    this.resultsContainer = this.page.locator('ul.mw-search-results');
    this.searchResults = this.resultsContainer.locator('li.mw-search-result');
    this.noResults = page.locator('.mw-search-nonefound');
  }

  async goto() {
    await this.page.goto('https://pt.wikipedia.org');
  }

  async search(term: string) {
    this.lastSearchTerm = term.trim();
    // in mobile needs to click the search icon first
    const searchIcon = this.page.locator('#searchIcon');
    if (await searchIcon.isVisible({ timeout: 3000 })) {
      await searchIcon.click();
      await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
    }
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async assertHasResults() {
    await expect(this.searchResults).not.toHaveCount(0, { timeout: 10000 });
  }

  async assertNoResults() {
    await expect(this.noResults).toBeVisible();
  }

  get firstSearchResult() {
    const regex = new RegExp(this.lastSearchTerm.replace(/ /g, '\\s+'), 'i');
    console.log('last search term: ', this.lastSearchTerm);
    console.log('results container: ', this.resultsContainer);
    return this.resultsContainer
      .locator('li.mw-search-result')
      .first()
      .getByRole('link', { name: regex });
  }

  get firstRelevantResult() {
    return this.page.locator('span.searchmatch').first().locator('..'); // up to <a>
  }
}
