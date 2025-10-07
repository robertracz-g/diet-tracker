import { test, expect } from '@playwright/test';

test.describe('Diet Tracker', () => {
  test('should display the main page with the calendar, daily, and summary views', async ({
    page,
  }) => {
    // The application should be running at this URL
    await page.goto('http://localhost:3000');

    // Wait for the main page to load
    await expect(
      page.getByRole('heading', { name: 'Diet Tracker' })
    ).toBeVisible();

    // Check for the calendar view
    await expect(
      page.getByRole('heading', { name: 'Calendar View' })
    ).toBeVisible();
    await expect(page.locator('.react-calendar')).toBeVisible();

    // Check for the daily view
    await expect(page.getByRole('heading', { name: /Daily View/ })).toBeVisible();

    // Check for the summary view
    await expect(
      page.getByRole('heading', { name: 'Summary View' })
    ).toBeVisible();

    // Take a screenshot of the main page
    await page.screenshot({ path: 'diet-tracker/playwright/screenshot.png' });
  });
});
