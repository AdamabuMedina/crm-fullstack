// Blocks
import { createHeader } from "../blocks/header/header"
import { createMain } from "../blocks/main"
import { createContainer } from "../blocks/createContainer"
import { createTopRow } from "../blocks/topRow/topRow"
import { createCurrencyInfo } from "../blocks/currencyInfo/currencyInfo"
import { createAccountCurrency } from "../blocks/accountCurrency/accountCurrency"
import { createCurrencyExchangeForm } from "../blocks/currencyExchangeForm/currencyExchangeForm"
import { createCurrencyFeed } from "../blocks/currencyFeed/currencyFeed"
import { headerCurrencyPage } from "../blocks/header/headerConfig"
import { mount, setChildren } from "redom"
import { topRowCurrencyPage } from "../blocks/topRow/topRowConfig"

export const renderCurrencyPage = body => {
  const header = createHeader(headerCurrencyPage)
  const main = createMain()
  const mainContainer = createContainer()
  const topRow = topRowCurrencyPage()
  const currencyInfo = createCurrencyInfo()

  const currencyFeed = createCurrencyFeed()
  const accountCurrency = createAccountCurrency({
    onInit: () => {
      currencyFeed.rows = accountCurrency.element.childElementCount + 6
      currencyFeed.reload()
    },
  })

  const currencyExchangeForm = createCurrencyExchangeForm({
    onSubmit: () => accountCurrency.fetch(),
  })

  setChildren(currencyInfo, [
    accountCurrency.element,
    currencyExchangeForm,
    currencyFeed.element,
  ])

  setChildren(mainContainer, [topRow, currencyInfo])

  mount(main, mainContainer)

  body.innerHTML = ""

  setChildren(body, [header, main])
}
