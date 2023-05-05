import "normalize.css"
import "../../node_modules/choices.js/public/assets/styles/choices.min.css"
import "../styles/main.scss"

import { renderLoginPage } from "./pages/login"
import { renderAccountsPage } from "./pages/accounts"
import { renderAccountPage } from "./pages/account"
import { renderHistoryPage } from "./pages/history"
import { renderCurrencyPage } from "./pages/currency"
import { renderBanksPage } from "./pages/banks"

export const render = (path = "") => {
  const origin = location.origin
  const pathname = path ? path : location.pathname
  const body = document.querySelector("body")

  if (path) {
    history.pushState({}, "", `${origin}${pathname}`)
  }

  if (!localStorage.token) {
    history.pushState({}, "", origin)
    renderLoginPage(body)
  } else if (pathname === "/accounts") {
    renderAccountsPage(body)
  } else if (pathname.match(/^\/accounts\/\d+$/)) {
    renderAccountPage(pathname.split("/")[2], body)
  } else if (pathname.match(/^\/accounts\/\d+\/history$/)) {
    renderHistoryPage(pathname.split("/")[2])
  } else if (pathname === "/currency") {
    renderCurrencyPage(body)
  } else if (pathname === "/banks") {
    renderBanksPage(body)
  } else {
    history.pushState({}, "", `${origin}/accounts`)
    renderAccountsPage(body)
  }
}

render()
