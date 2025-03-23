// @ts-check
import { expect, test as setup } from '@playwright/test';

const TOKEN_FILEPATH = '../../../playwright/.auth/user.json'

setup.skip('Autenticacao', async({ page }) => {

/* 
  const email = testInfo.project.use.email
  const password = testInfo.project.use.password */

  await page.goto('/')
  await page.locator('[class*=FormLogin] [type=email]').type('teste@teste.com')
  await page.locator('[class*=FormLogin] [type=password]').type('12345')
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Acessar' }).click()
  await expect(page.locator('#modalText')).toBeVisible()
  //await page.waitForURL('https://bugbank.netlify.app/home')
  //await expect(page.locator('#textBalance')).toBeVisible()

  await page.context().storageState({ path: TOKEN_FILEPATH })
})