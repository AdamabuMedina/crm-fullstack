import { mount, setChildren } from "redom"

// Blocks
import { createHeader } from "../blocks/header/header"
import { createMain } from "../blocks/main"
import { createContainer } from "../blocks/createContainer"
import { createAccountInfo } from "../blocks/createAccountInfo"
import { balanceChart } from "../blocks/balanceChart"
import MoneyTransferHistory from "../blocks/moneyTransferHistory/moneyTransferHistory"

// API
import { account } from "../api/account"

// Utilities
import { monthlyBalance } from "../utils/monthly-balance"
import monthlyTransactions from "../utils/monthly-transactions"
import { chartInit } from "../utils/chart-init"
import { handleError } from "../utils/handle-error"
import { headerHistory } from "../blocks/header/headerConfig"
import {
  newTopRowHistoryPage,
  topRowHistoryPage,
} from "../blocks/topRow/topRowConfig"

// Отрисовка страницы подробной истории счёта
export const renderHistoryPage = async (id, body) => {
  // Создаём шапку страницы
  const header = createHeader(headerHistory)
  const main = createMain()
  const mainContainer = createContainer()

  // Создаём верхний блок без данных баланса счёта для анимации загрузки
  const topRow = topRowHistoryPage(id)

  // Создаём блок информации о счёте
  const accountInfo = createAccountInfo()

  // Создаем блок с графиком динамики баланса
  const balance = balanceChart("Динамика баланса")
  balance.classList.add("balance-chart--wide")

  // Создаем блок с графиком соотношения транзакций
  const transactionsChart = balanceChart(
    "Соотношение входящих/исходящих транзакций"
  )
  transactionsChart.classList.add("balance-chart--wide")

  // Создаём блок истории транзакций с пустыми данными для анимации загрузки
  const moneyTransferHistory = new MoneyTransferHistory(null, 25)

  setChildren(accountInfo, [
    balance,
    transactionsChart,
    moneyTransferHistory.element,
  ])
  setChildren(mainContainer, [topRow, accountInfo])
  mount(main, mainContainer)

  // Очищаем страницу для перерисовки
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
      const newTopRow = newTopRowHistoryPage(id)

      // Заменяем старый блок на новый
      mainContainer.replaceChild(newTopRow, topRow)

      // Добавляем к canvas блока с графиком динамики баланса анимацию загрузки
      const balanceChartCanvas = balance.querySelector("canvas")
      balanceChartCanvas.classList.remove("balance-chart__canvas--skeleton")

      // Рассчитываем баланс на начало последних шести месяцев
      const monthlyBalanceData = monthlyBalance(data, 12)

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

      // Добавляем к canvas блока с графиком соотношения транзакций анимацию загрузки
      const transactionsChartCanvas = transactionsChart.querySelector("canvas")
      transactionsChartCanvas.classList.remove(
        "balance-chart__canvas--skeleton"
      )

      // Рассчитываем соотношение транзакций на начало последних двенадцати месяцев
      const monthlyTransactionsData = monthlyTransactions(data, 12)
      const monthlyTransactionsSum = []

      // Создаём отдельный массив с суммой всех транзакций по месяцам для определения верхней/нижней границы
      monthlyTransactionsData
        .map(entry => entry.income)
        .forEach((income, index) => {
          monthlyTransactionsSum.push(
            income + monthlyTransactionsData.map(entry => entry.outcome)[index]
          )
        })

      // Инициализируем Chart.js для отрисовки графика
      chartInit(
        transactionsChartCanvas,
        {
          labels: monthlyTransactionsData.map(entry => entry.month),
          datasets: [
            {
              data: monthlyTransactionsData.map(entry => entry.outcome),
              backgroundColor: "#FD4E5D",
            },
            {
              data: monthlyTransactionsData.map(entry => entry.income),
              backgroundColor: "#76CA66",
            },
          ],
        },
        {
          arrayForMin: monthlyTransactionsSum,
          arrayForMid: monthlyTransactionsData.map(entry => entry.outcome),
          arrayForMax: monthlyTransactionsSum,
        }
      )

      // Создаём блок истории транзакций с полученными данными и пагинацией
      const newMoneyTransferHistory = new MoneyTransferHistory(data, 25, true)

      // Заменяем старый блок на новый
      accountInfo.replaceChild(
        newMoneyTransferHistory.element,
        moneyTransferHistory.element
      )
    })
    .catch(error => handleError(error))
}
