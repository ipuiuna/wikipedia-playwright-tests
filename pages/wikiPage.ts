import { Page, Locator, expect } from '@playwright/test';

export class WikiPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly noResults: Locator;
  readonly resultsContainer: Locator;
  readonly searchResults: Locator;
  private lastSearchTerm: string = '';
  readonly languageSelector: Locator;
  private readonly languageMap: Record<string, string> = {
    en: 'en',
    english: 'en',
    inglês: 'en',
    es: 'es',
    español: 'es',
    espanhol: 'es',
    pt: 'pt',
    'pt-br': 'pt',
    português: 'pt',
    fr: 'fr',
  };

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page
      .locator('input#searchInput, input[name="search"]')
      .first();

    this.resultsContainer = this.page.locator('ul.mw-search-results');
    this.searchResults = this.resultsContainer.locator('li.mw-search-result');
    this.noResults = page.locator('.mw-search-nonefound');
    this.languageSelector = this.page
      .getByRole('button', { name: /idioma|language|languages/i })
      .or(this.page.locator('a.language-selector'))
      .or(this.page.locator('#p-lang-btn-checkbox'))
      .first();
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
    return this.resultsContainer
      .locator('li.mw-search-result')
      .first()
      .getByRole('link', { name: regex });
  }

  get firstRelevantResult() {
    return this.page.locator('span.searchmatch').first().locator('..'); // up to <a>
  }

  async changeLanguage(input: string) {
    const normalized = input.toLowerCase().trim();
    const code = this.languageMap[normalized];

    if (!code)
      throw new Error(`Language does not exists in languageMap: ${input}`);

    const isMobile = (await this.page.viewportSize())?.width! < 700;

    if (isMobile) {
      const mobileButton = this.page.locator(
        '#page-secondary-actions .language-selector.button'
      );
      await mobileButton.scrollIntoViewIfNeeded();
      await mobileButton.click();
      await this.page.waitForSelector('#p-lang', {
        state: 'attached',
        timeout: 5000,
      });

      const link = this.page.locator(`li a[lang="${code}"]`).first();
      const isVisible = await link.isVisible().catch(() => false);

      if (isVisible) {
        await link.scrollIntoViewIfNeeded();
        await link.click();
      } else {
        const href = await link.getAttribute('href');
        if (!href) {
          throw new Error(`Link for ${code} does not has a href`);
        }
        await this.page.goto(href);
      }
      await this.page.waitForURL(`**${code}.wikipedia.org**`, {
        timeout: 10000,
      });
      return;
    }

    await this.languageSelector.click({ force: true });
    await this.page.waitForSelector('li a[lang]', {
      state: 'visible',
      timeout: 5000,
    });

    const link = this.page.locator(`li a[lang="${code}"]`).first();

    await link.scrollIntoViewIfNeeded();
    await link.click({ force: true });
    await this.page.waitForURL(`**${code}.wikipedia.org**`, {
      timeout: 10000,
    });
    console.log(
      `changing language to ${code} (${isMobile ? 'mobile' : 'desktop'})`
    );
  }
}
