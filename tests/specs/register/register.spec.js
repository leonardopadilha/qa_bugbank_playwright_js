import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { user } from '../../support/functions/user';

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

  const messageExpected = "A conta foi criada com sucesso"
  const messageReturned = (await registerPage.createdAccount())
                                  .replace(/\d+[-]?\d+/g, '')  // Remove números e traços
                                  .replace(/\s+/g, ' ')         // Substitui múltiplos espaços por um único espaço
                                  .trim();                      // Remove espaços no início e no final da string
  
  //expect(await registerPage.checkIsVisible()).toBeVisible()
  expect(await messageReturned).toContain(messageExpected)
})