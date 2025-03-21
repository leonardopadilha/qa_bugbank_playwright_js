// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.goTo()
})

test('Deve acessar a tela de login', async ({ page }) => {
  await expect(page).toHaveTitle(/BugBank/);
});

test('Não deve fazer login com dados de login em branco', async ({ page }) => {  
  await loginPage.form()

  const messages = await loginPage.formatInvalid()
  expect(messages.filter(msg => msg === 'É campo obrigatório')).toHaveLength(2)
    
/*   expect(await loginPage.formatInvalid()).toHaveText([
    'É campo obrigatório', 
    'É campo obrigatório'
  ]) */

})

test('Não deve realizar login com email inválido', async ({ page }) => {
  const invalidEmail = ['teste@teste', 'teste@com', 'www.com.br']

  for (let email of invalidEmail) {
    await loginPage.form(email)
    const element = await page.locator('[class*=ContainerFormLogin] p').first().textContent()
    expect(element).toEqual('Formato inválido')
  }
})

test('Não deve acessar a tela secreta com dados de login inválido', async ({ page }) => {
  await loginPage.form("teste@teste.com.br", "123456")

  const msgLoginInvalidExpected = "Usuário ou senha inválido.Tente novamente ou verifique suas informações!"
  const msgLoginInvalidReturned = (await loginPage.invalidLogin()).replace(/\n/g, '').trim()
  expect(msgLoginInvalidReturned).toMatch(msgLoginInvalidExpected)
});