// App
import { render } from ".."

import { createMain } from "../blocks/main"
import { createContainer } from "../blocks/createContainer"
import { createAccountInfo } from "../blocks/createAccountInfo"
import { createMoneyTransferForm } from "../blocks/moneyTransferForm/moneyTransferForm"
import { balanceChart } from "../blocks/balanceChart"
import MoneyTransferHistory from "../blocks/moneyTransferHistory/moneyTransferHistory"

import { account } from "../api/account"
import { monthlyBalance } from "../utils/monthly-balance"
import { chartInit } from "../utils/chart-init"
import { handleError } from "../utils/handle-error"
import { topRowAccountPage } from "../blocks/topRow/topRowConfig"
import { headerAccountPage } from "../blocks/header/headerConfig"
import { mount, setChildren } from "redom"
import { createHeader } from "../blocks/header/header"

// Отрисовка страницы информации о счёте
export const renderAccountPage = async (id, body) => {
  const header = createHeader(headerAccountPage)
  const main = createMain()
  const mainContainer = createContainer()
  const topRow = topRowAccountPage(id)

  mount(mainContainer, topRow)

  const accountInfo = createAccountInfo()
  const moneyTransferForm = createMoneyTransferForm(id)
  const balance = balanceChart("Динамика баланса")

  // Добавляем переход на страницу детальной истории
  balance.style.cursor = "pointer"
  balance.addEventListener("click", () => render(`/accounts/${id}/history`))

  // Создаём блок истории транзакций с пустыми данными для анимации загрузки
  const moneyTransferHistory = new MoneyTransferHistory(null, 10)

  // Добавляем переход на страницу детальной истории
  moneyTransferHistory.element.style.cursor = "pointer"
  moneyTransferHistory.element.addEventListener("click", () =>
    render(`/accounts/${id}/history`)
  )

  setChildren(accountInfo, [
    moneyTransferForm,
    balance,
    moneyTransferHistory.element,
  ])
  mount(mainContainer, accountInfo)
  mount(main, mainContainer)

  body.innerHTML = ""

  setChildren(body, [header, main])

  // Запрашиваем данные счёта с сервера
  account(id, localStorage.token)
    .then(response => {
      if (response.error) {
        throw new Error(response.error)
      }
      return response.payload
    })
    .then(data => {
      // Создаём верхний блок с полученным балансом счёта
      const newTopRow = topRowAccountPage(id, data)

      // Заменяем старый блок на новый
      mainContainer.replaceChild(newTopRow, topRow)

      // Добавляем к canvas блока с графиком динамики баланса анимацию загрузки
      const balanceChartCanvas = balance.querySelector("canvas")
      balanceChartCanvas.classList.remove("balance-chart__canvas--skeleton")

      // Рассчитываем баланс на начало последних шести месяцев
      const monthlyBalanceData = monthlyBalance(data, 6)

      // Инициализируем Chart.js для отрисовки графика
      chartInit(
        balanceChartCanvas,
        {
          labels: monthlyBalanceData.map(entry => entry.month),
          datasets: [
            {
              data: monthlyBalanceData.map(entry => entry.balance),
              backgroundColor: "#116ACC",
            },
          ],
        },
        {
          arrayForMin: monthlyBalanceData.map(entry => entry.balance),
          arrayForMax: monthlyBalanceData.map(entry => entry.balance),
        }
      )

      // Создаём блок истории транзакций с полученными данными
      const newMoneyTransferHistory = new MoneyTransferHistory(data, 10)

      // Добавляем переход на страницу детальной истории
      newMoneyTransferHistory.element.style.cursor = "pointer"
      newMoneyTransferHistory.element.addEventListener("click", () =>
        render(`/accounts/${id}/history`)
      )

      // Заменяем старый блок на новый
      accountInfo.replaceChild(
        newMoneyTransferHistory.element,
        moneyTransferHistory.element
      )
    })
    .catch(error => handleError(error))
}
