import { test as base } from '@playwright/test';
import { WikiPage } from '../pages/wikiPage';

type WikiFixtures = {
  wikiPage: WikiPage;
  wikiSearch: WikiPage;
};

export const test = base.extend<WikiFixtures>({
  wikiPage: async ({ page }, use) => {
    const wiki = new WikiPage(page);
    await page.goto('https://pt.wikipedia.org');
    await use(wiki);
  },

  wikiSearch: async ({ page }, use, testInfo) => {
    const wiki = new WikiPage(page);
    await page.goto('https://pt.wikipedia.org');
    await wiki.search('Playwright');
    await use(wiki);
  },
});
