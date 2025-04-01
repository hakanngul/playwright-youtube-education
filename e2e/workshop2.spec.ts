import { test, expect } from '@playwright/test';

test.skip('Automation Form Submission', async ({ page }) => { 
    await page.goto('https://demo.playwright.dev/todomvc');

    const newTodo = await page.getByPlaceholder('What needs to be done?');

    await newTodo.fill('Buy some milk');
    await newTodo.press('Enter');
    await newTodo.fill('Buy some eggs');
    await newTodo.press('Enter');

    const todos = page.getByTestId('todo-item');
    await expect(todos.nth(0)).toHaveText('Buy some milk');
    await expect(todos.nth(1)).toHaveText('Buy some eggs');
    await expect(todos).toHaveCount(2);

    await todos.nth(0).getByRole('checkbox').check();
    await expect(todos.nth(0)).toHaveClass('completed');
    await expect(todos.nth(1)).not.toHaveClass('completed');

    await page.waitForTimeout(1000);
})

test('Handle Form Submission', async ({ page }) => {
    const locatorString = '[placeholder="What needs to be done?"]';
    await page.goto('https://demo.playwright.dev/todomvc');

    await page.fill(locatorString, 'Buy some milk');
    await page.press(locatorString, 'Enter');

    const checkbox = await page.locator('.toggle');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await page.waitForTimeout(1250);
})



// test only after all close browser
test.afterAll(async({page}) => {
    await page.close();
})