import { el, setChildren } from "redom"
import { render } from "../.."
import { createButton } from "../createButton"

export const createAccountCard = account => {
  // Создание карточки счёта
  const card = el(".account-card")
  const id = el(".account-card__id")
  const balance = el(".account-card__balance")

  const lastTransaction = el(".account-card__transaction")
  const lastTransactionTitle = el("span.account-card__transaction-title")
  const lastTransactionDate = el("span.account-card__transaction-date")

  const button = createButton({
    className: "button--primary",
    text: "Открыть",
  })

  setChildren(lastTransaction, [lastTransactionTitle, lastTransactionDate])

  if (account) {
    // Если передали данные счёта, заполняем их
    id.textContent = account.account
    balance.textContent = `${account.balance
      .toLocaleString("ru-RU")
      .replace(",", ".")} ₽`

    lastTransactionTitle.textContent = "Последняя транзакция:"
    lastTransactionDate.textContent = account.transactions.length
      ? new Date(account.transactions[0].date).toLocaleString("ru-RU", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })
      : "-"
    button.addEventListener("click", () =>
      render(`/accounts/${account.account}`)
    )
  } else {
    // Иначе добавляем классы для визуализации загрузки
    id.classList.add("account-card__id--skeleton")
    balance.classList.add("account-card__balance--skeleton")
    lastTransaction.classList.add("account-card__transaction--skeleton")
    button.classList.add("button--skeleton")
  }

  card.append(id, balance, lastTransaction, button)
  return card
}
