import { test as base } from '@playwright/test';
import { WikiPage } from '../pages/wikiPage';

type WikiFixtures = {
  wikiPage: WikiPage;
  wikiSearchForJavaScript: WikiPage;
};

export const test = base.extend<WikiFixtures>({
  wikiPage: async ({ page }, use) => {
    const wiki = new WikiPage(page);
    await page.goto('https://pt.wikipedia.org');
    await use(wiki);
  },

  wikiSearchForJavaScript: async ({ page }, use) => {
    const wiki = new WikiPage(page);
    await page.goto('https://pt.wikipedia.org');
    await wiki.search('Linguagem JavaScript');
    await wiki.assertHasResults();
    await use(wiki);
  },
});
