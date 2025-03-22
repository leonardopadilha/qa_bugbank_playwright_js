import { test, expect } from '@playwright/test';
import { Homepage } from '../../pages/HomePage';

let homePage

test.skip('Deve acessar a home com sucess', async({ page }) => {
  homePage = new Homepage(page)
  await homePage.goTo()
  //expect(await homePage.balanceIsVisible()).toBeVisible()
  await page.waitForTimeout(2000)
})