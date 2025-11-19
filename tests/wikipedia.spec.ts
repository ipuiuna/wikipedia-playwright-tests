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

  test('TC03 - 	Navigation from search results', async ({ wikiPage }) => {
    await wikiPage.search('Automação de testes');
    await wikiPage.assertHasResults();
    const searchUrl = wikiPage.page.url();
    await expect(wikiPage.page).toHaveURL(/search=/);
    await wikiPage.firstRelevantResult.click();
    await expect(wikiPage.page).not.toHaveURL(searchUrl);
    await expect(wikiPage.page).not.toHaveURL(/Especial%3APesquisar/);
    await expect(wikiPage.page).not.toHaveURL(/w\/index\.php/);
    await expect(wikiPage.page).toHaveURL(/Automa%C3%A7%C3%A3o_de_teste/);
  });
});

test.describe('Wikipedia Language Change', () => {
  test('TC04 - Should switch interface language to English', async ({
    wikiPage,
  }) => {
    await wikiPage.goto();
    await wikiPage.changeLanguage('English');
    await expect(wikiPage.page.url()).toContain('en.wikipedia.org');
    await expect(wikiPage.page).toHaveTitle(/Wikipedia, the free encyclopedia/);
  });
});
