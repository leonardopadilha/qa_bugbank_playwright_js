// @ts-check
import { test, expect } from '@playwright/test';

test('Deve acessar a tela de login', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BugBank/);
});

test('Não deve fazer login com dados de login em branco', async ({ page }) => {
  await page.goto('/')
  const btnSubmit = page.locator("[class*=FormLogin] [type=submit]")
  await btnSubmit.click()

  const msgWarning = page.locator("[class*=FormLogin] .input__warging")
  //expect(msgWarning.count()).toHaveLength(2)

  const warningTexts = await msgWarning.allTextContents()
  expect(warningTexts.filter(msg => msg === 'É campo obrigatório')).toHaveLength(2)
})

test('Não deve realizar login com email inválido', async ({ page }) => {
  await page.goto('/')

  const invalidEmail = ['teste@teste', 'teste@com', 'www.com.br']

  for (let email of invalidEmail) {
    await page.locator('[class*=FormLogin] [type=email]').fill(email)
    const element = await page.locator('[class*=ContainerFormLogin] p').first().textContent()
    expect(element).toEqual('Formato inválido')
  }
})