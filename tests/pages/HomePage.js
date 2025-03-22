export class Homepage {
  #btnExit
  #txtBalance

  constructor(page) {
    this.page = page

    this.#btnExit = page.locator('#btnExit')
    this.#txtBalance = page.locator('#textBalance')
  }

  async goTo() {
    await this.page.goto('/')
  }

  async clickOnExit() {
    await this.#btnExit.click()
  }

  async balanceIsVisible() {
    return this.#txtBalance
  }
}