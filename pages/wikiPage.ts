import { Page, Locator } from '@playwright/test';

export class WikiPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstSearchResult: Locator;
  readonly noresults: Locator;
  readonly resultsContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('combobox', {
      name: 'Pesquisar na Wikipédia',
    });
    this.resultsContainer = this.page.locator('.mw-search-results');
    this.searchButton = page.getByRole('button', { name: 'Procurar' });
    this.firstSearchResult = this.resultsContainer
      .getByRole('listitem')
      .first()
      .getByRole('heading', { level: 3 });
    this.noresults = page.locator('.mw-search-nonefound');
  }

  async goto() {
    await this.page.goto('https://pt.wikipedia.org');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async openFirstLink(): Promise<void> {
    await this.page.getByRole('heading', { level: 3 }).first().click();
  }
}
