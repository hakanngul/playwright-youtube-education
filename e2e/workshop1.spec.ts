import { test, expect } from '@playwright/test';


test('Basic Navigation', async({page}) => {
    await page.goto('https://www.gitlab.com/');
    await page.reload();
})


test.only('Interacting with Web element on Gitlab', async({page}) => {
    await page.goto('https://www.gitlab.com/');
   // await page.click('#onetrust-accept-btn-handler');
   await page.locator('#be-navigation-desktop').getByRole('link', { name: 'Get free trial' })
   .click();    await page.getByTestId('new-user-first-name-field')
    .fill('John1')

    await page.getByTestId('new-user-last-name-field') 
    .fill('Snow')
})

test('Usign various locator methods', async ({page}) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('https://www.gitlab.com/');
    // await page.getByRole('button', { name: 'Main menu' }).click();
    // await page.getByRole('link', {name: 'Sign in '}).click();
    await page.click(':has-text("Sign in")');
})



test.afterAll(async({page}) => {
    await page.close();
})
