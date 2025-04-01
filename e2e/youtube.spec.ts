import { test, expect } from '@playwright/test';

test.describe('YouTube Basic Tests', () => {
  test('should load YouTube homepage', async ({ page }) => {
    // Navigate to YouTube
    await page.goto('https://www.youtube.com/');
    
    // Verify the page title contains "YouTube"
    await expect(page).toHaveTitle(/YouTube/);
    
    // Verify the YouTube logo is visible
    await expect(page.locator('ytd-logo')).toBeVisible();
  });

  test('should search for a video', async ({ page }) => {
    // Navigate to YouTube
    await page.goto('https://www.youtube.com/');
    
    // Click on the search input field
    await page.locator('input#search').click();
    
    // Type a search query
    await page.locator('input#search').fill('Playwright tutorial');
    
    // Press Enter to search
    await page.keyboard.press('Enter');
    
    // Wait for search results to load
    await page.waitForSelector('ytd-video-renderer');
    
    // Verify search results are displayed
    await expect(page.locator('ytd-video-renderer')).toBeVisible();
    
    // Verify the page URL contains the search query
    await expect(page).toHaveURL(/search_query=Playwright\+tutorial/);
  });
});
