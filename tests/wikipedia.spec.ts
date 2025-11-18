import { expect } from '@playwright/test';
import { test } from '../fixtures/wikiFixtures';

test.describe('Wikipedia Search Functionality', () => {
  test('TC01 - Search for an existing article', async ({ wikiPage }) => {
    await wikiPage.search('Linguagem JavaScript');
    await wikiPage.assertHasResults();
    await expect(wikiPage.firstRelevantResult).toContainText('JavaScript', {
      ignoreCase: true,
    });
  });

  test('TC02 - Search for a non-existing article', async ({ wikiPage }) => {
    await wikiPage.search('asdkjasdkjasdasdkjasdkjasdkkkk');
    await wikiPage.assertNoResults();
    await expect(wikiPage.noResults).toBeVisible();
  });
});
