export class LoginPage {
  #inputEmail
  #inputPassword
  #btnAccess
  #btnRegister
  #invalidLoginModal
  #msgInvalidFormat

  constructor(page) {
    this.page = page

    this.#inputEmail = page.locator('[class*=FormLogin] [type=email]')
    this.#inputPassword = page.locator('[class*=FormLogin] [type=password]')
    this.#btnAccess = page.getByRole('button', { name: 'Acessar' })
    this.#btnRegister = page.locator('button', { hasText: 'Registrar'})
    this.#invalidLoginModal = page.locator('#modalText')
    this.#msgInvalidFormat = page.locator("[class*=FormLogin] .input__warging")
  }

  async goTo() {
    await this.page.goto('/')
  }

  async form(name = "", password = "") {
    if (name) {
      await this.#inputEmail.type(name)
    } 
    if (password) {
      await this.#inputPassword.type(password)
    }
    await this.#btnAccess.click()
  }

  async clickOnRegister() {
    await this.#btnRegister.click()
  }

  async invalidLogin() {
    return await this.#invalidLoginModal.textContent()
  }

  async formatInvalid() {
    const messages = await this.#msgInvalidFormat.allTextContents()
    return messages
  }
}