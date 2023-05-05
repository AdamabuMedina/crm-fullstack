import { el, mount } from "redom"
import { topRowAccount } from "./topRowAccount"
import { topRowBalance } from "./topRowBalance"
import { topRowButton } from "./topRowButton"
import { topRowSelect } from "./topRowSelect"

// Создание верхнего блока сайта
export const createTopRow = (elements, data) => {
  const row = el(".top-row")
  const title = el("h1.top-row__title", data.title)
  const select = topRowSelect(data.sort)
  const button = topRowButton(data.button)

  const account = topRowAccount(data.account)
  const balance = topRowBalance(data.balance)

  // Добавляем в DOM элементы, которые необходимо отобразить
  if (elements.includes("title")) mount(row, title)
  if (elements.includes("sort")) mount(row, select)
  if (elements.includes("button")) mount(row, button)
  if (elements.includes("account")) mount(row, account)
  if (elements.includes("balance")) mount(row, balance)

  return row
}
