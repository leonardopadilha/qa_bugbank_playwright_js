import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { user } from '../support/functions/user';

let registerPage
let loginPage

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page)
  await registerPage.goTo()
})

test('Deve acessar a página de registro com sucesso', async({ page }) => {

  const newUser = user()
  console.log("User: " + newUser.name)

  loginPage = new LoginPage(page)

  await loginPage.clickOnRegister()
  await registerPage.register(newUser)
})