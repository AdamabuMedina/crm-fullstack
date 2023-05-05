import { el, mount } from "redom"
import { createAccountCard } from "./accountCard"
import { accounts } from "../../api/accounts"
import { handleError } from "../../utils/handle-error"

// Создание блока со списком счетов пользователя
export const createAccountsList = (token = localStorage.token) => {
  const element = el("ul.accounts-list")

  // Заполняем список пустыми строками для анимации загрузки
  for (let i = 0; i < 6; i++) {
    add()
  }

  // Запрос списка счетов пользователя с сервера
  accounts(token)
    .then(res => {
      if (res.error) {
        throw new Error(res.error)
      }
      return res.payload
    })
    .then(accounts => {
      // Добавляем свойство классу для метода сортировки
      accountsList.accounts = accounts

      // Очищаем список от пустых карточек
      element.innerHTML = ""

      // Заполняем его реальными данными
      accounts.forEach(account => add(account))
    })
    .catch(error => handleError(error))

  // Добавление карточки счёта к списку
  function add(account) {
    const item = el("li.accounts-list__item")

    mount(item, createAccountCard(account))
    mount(element, item)
  }

  // Сортировка и перерисовка карточек счетов
  function sort(param = "") {
    if (!param) {
      return
    } else if (param === "account") {
      // Сортировка по номеру счёта
      accountsList.accounts.sort((a, b) => a.account - b.account)
    } else if (param === "balance") {
      // Сортировка по балансу
      accountsList.accounts.sort((a, b) => a.balance - b.balance)
    } else if (param === "last-transaction") {
      // Сортировка по дате последней транзакции
      accountsList.accounts.sort((a, b) => {
        // Проверка на крайние случаи с отстутсвием транзакций
        if (a.transactions.length === 0 && b.transactions.length === 0) {
          return 0
        } else if (a.transactions.length === 0) {
          return -1
        } else if (b.transactions.length === 0) {
          return 1
        }
        return (
          new Date(a.transactions[a.transactions.length - 1].date).getTime() -
          new Date(b.transactions[b.transactions.length - 1].date).getTime()
        )
      })
    }
    // Очищаем список
    element.innerHTML = ""

    // Заполняем отсортированными данными
    accountsList.accounts.forEach(account => add(account))
  }

  const accountsList = { element, add, sort }
  return accountsList
}
