import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { user } from '../../support/functions/user';

let loginPage
let registerPage
let newUser

test.beforeEach(async({ page }) => {
  newUser = user()

  loginPage = new LoginPage(page)
  registerPage = new RegisterPage(page)

  await loginPage.goTo()
  await loginPage.clickOnRegister()
})

test('Deve acessar a home com sucesso', async({ page }) => {
  await registerPage.register(newUser)
  await registerPage.closeModal()
  await loginPage.form(newUser.email, newUser.password)
  await page.waitForURL('/home')
})