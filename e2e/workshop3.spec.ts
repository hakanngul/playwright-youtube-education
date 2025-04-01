import { test, expect } from '@playwright/test';

test.skip('Advanced Interactions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const elements = await page.locator('.figure');
    await elements.nth(0).hover();
    await expect(elements.nth(0).locator('.figcaption')).toBeVisible();
    await expect(elements.nth(0).locator('.figcaption h5')).toHaveText('name: user1');
    await expect(elements.nth(1).locator('.figcaption')).not.toBeVisible();
    await page.waitForTimeout(1500);
})


test.skip('clicks', async ({ page }) => {
    await page.goto('https://demoqa.com/buttons');
    await page.click('#rightClickBtn', {button: 'right'});
    await expect(await page.locator('#rightClickMessage').textContent()).toContain('You have done a right click');
    
    await page.dblclick('#doubleClickBtn');
    await expect(await page.locator('#doubleClickMessage').textContent()).toContain('You have done a double click');
    
    await page.waitForTimeout(1500);
    // By text content
    const buttons = await page.locator('button').all();
    for (const button of buttons) {
        const text = await button.textContent();
        if (text?.trim() === 'Click Me') {
            await button.click();
            break;
        }
    }
    await page.waitForTimeout(1500);
})


test.skip('Drag and Drop', async ({ page }) => {
    await page.goto('https://demoqa.com/droppable');

    await page.dragAndDrop('#draggable', '#droppable');
    expect(await page.textContent('#droppable')).toContain('Dropped!');
    await page.waitForTimeout(1500);
})


test.skip('Drag and drop 2', async ({ page }) => {
    // windows size 
    await page.setViewportSize({ width: 1024, height: 1024 });
    await page.goto('https://demoqa.com/droppable');
    await page.locator('.simple-drop-container #draggable').hover();
    await page.mouse.down();
    await page.locator('.simple-drop-container #droppable').hover();
    await page.mouse.up();
    await page.waitForTimeout(1500);
})


test('Handling iframe', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 1024 });
    await page.goto('https://www.hyrtutorials.com/p/frames-practice.html');
    //iframe = id => frm2

    const iframeElement = await page.frame({name: 'frm2'});
    // page down to iframeElement




    const inputFirstName = '#firstName'
    const inputLastName = '#lastName'
    const radioGender = '#femalerb'
    const lang = '#englishchbx'

    await iframeElement!.type(inputFirstName, 'John');
    await iframeElement!.type(inputLastName, 'Snow');
    await iframeElement!.check(radioGender);
    await iframeElement!.check(lang);

    expect(await iframeElement!.inputValue(inputFirstName)).toBe('John');

    await page.waitForTimeout(1500);
})


test.afterEach(async({page}) => {
    await page.close();
})