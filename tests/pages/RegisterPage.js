export class RegisterPage {
  #inputEmail
  #inputName
  #inputPassword
  #inputConfirmPassword
  #slideBalance
  #createdCheck
  #createdAccountModal
  #btnSubmit

  constructor(page) {
    this.page = page
    this.#inputEmail = page.locator('[class$=register] [name=email]')
    this.#inputName = page.getByPlaceholder('Informe seu Nome')
    this.#inputPassword = page.locator('.card__register [name="password"]')
    this.#inputConfirmPassword = page.locator('.card__register [name="passwordConfirmation"]')
    this.#createdCheck = page.locator('[class*=ContainerInformations] svg')
    this.#createdAccountModal = page.locator('#modalText')

    this.#btnSubmit = page.locator('[class*=Register] [type=submit]')
  }

  async goTo() {
    await this.page.goto('/')
  }

  async register(user, balance = "") {
    await this.#inputEmail.type(user.email)
    await this.#inputName.type(user.name)
    await this.#inputPassword.type(user.password)
    await this.#inputConfirmPassword.type(user.password)

    if (balance) {
      console.log('em construcao')
    }

    await this.#btnSubmit.click()
  }

  async checkIsVisible() {
    return await this.#createdCheck
  }

  async createdAccount() {
    return this.#createdAccountModal.textContent()
  }
}