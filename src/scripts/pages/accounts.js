import { createMain } from "../blocks/main"
import { createContainer } from "../blocks/createContainer"
import { createAccountsList } from "../blocks/accountsList/accountsList"
import { mount, setChildren } from "redom"
import { topRowChoices } from "../blocks/topRow/topRowChoices"
import { headerAccountsPage } from "../blocks/header/headerConfig"
import { topRowAccountsPage } from "../blocks/topRow/topRowConfig"
import { createHeader } from "../blocks/header/header"

// Отрисовка страницы списка счетов
export const renderAccountsPage = async body => {
  const header = createHeader(headerAccountsPage)
  const main = createMain()
  const mainContainer = createContainer()
  const accountsList = createAccountsList()
  const topRow = topRowAccountsPage(accountsList)

  setChildren(mainContainer, [topRow, accountsList.element])

  mount(main, mainContainer)

  body.innerHTML = ""

  setChildren(body, [header, main])

  topRowChoices(topRow, accountsList)
}
