import { createAccount } from "../../api/create-account"
import { render } from "../.."
import { handleError } from "../../utils/handle-error"
import { createModal } from "../createModal"
import { createTopRow } from "./topRow"

import Plus from "../../../assets/images/plus.svg"
import Arrow from "../../../assets/images/arrow.svg"

export const topRowAccountPage = (id, data) => {
  if (data) {
    const topRow = createTopRow(["title", "account", "balance", "button"], {
      title: "Просмотр счёта",
      account: id,
      balance: data.balance,
      button: {
        className: "button--primary",
        text: "Вернуться назад",
        icon: Arrow,
        handler: () => render("/accounts"),
      },
    })

    return topRow
  } else {
    const topRow = createTopRow(["title", "account", "balance", "button"], {
      title: "Просмотр счёта",
      account: id,
      button: {
        className: "button--primary",
        text: "Вернуться назад",
        icon: Arrow,
        handler: () => render("/accounts"),
      },
    })

    return topRow
  }
}

export const topRowAccountsPage = accountsList => {
  const topRow = createTopRow(["title", "sort", "button"], {
    title: "Ваши счета",
    sort: [
      { text: "Сортировка", value: "" },
      { text: "По номеру", value: "account" },
      { text: "По балансу", value: "balance" },
      { text: "По последней транзакции", value: "last-transaction" },
    ],
    button: {
      className: "button--primary",
      text: "Создать новый счёт",
      icon: Plus,
      handler: async () => {
        try {
          // Запрос создания счёта на сервер
          const data = await createAccount(localStorage.token)
          if (data.error) {
            throw new Error(data.error)
          }

          // Добавляем данные в DOM и в свойство класса на случай сортировки
          accountsList.add(data.payload)
          accountsList.accounts.push(data.payload)

          // Открываем модальное окно в случае успеха
          const modal = createModal({
            title: "Счёт создан",
            text: `№ ${data.payload.account}`,
            button: {
              className: "button--primary",
              text: "Перейти к счёту",
              handler: () => {
                document.body.style.removeProperty("overflow")
                render(`/accounts/${data.payload.account}`)
              },
            },
          })
          modal.open()
        } catch (error) {
          handleError(error)
        }
      },
    },
  })

  return topRow
}

export const topRowHistoryPage = id => {
  const topRow = createTopRow(["title", "account", "balance", "button"], {
    title: "История баланса",
    account: id,
    button: {
      className: "button--primary",
      text: "Вернуться назад",
      icon: Arrow,
      handler: () => render(`/accounts/${id}`),
    },
  })

  return topRow
}

export const newTopRowHistoryPage = id => {
  const newTopRow = createTopRow(["title", "account", "balance", "button"], {
    title: "Просмотр счёта",
    account: id,
    balance: data.balance,
    button: {
      className: "button--primary",
      text: "Вернуться назад",
      icon: Arrow,
      handler: () => render(`/accounts/${id}`),
    },
  })

  return newTopRow
}

export const topRowCurrencyPage = () => {
  const topRow = createTopRow(["title"], {
    title: "Валютный обмен",
  })

  return topRow
}

export const topRowBankPage = () => {
  const topRow = createTopRow(["title"], {
    title: "Карта банкоматов",
  })

  return topRow
}
