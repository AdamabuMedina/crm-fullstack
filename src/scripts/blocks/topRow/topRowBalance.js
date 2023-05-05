import { el, setChildren } from "redom"

export const topRowBalance = data => {
  const balance = el(".top-row__balance")
  const balanceTitle = el("span.top-row__balance-title", "Баланс")
  const balanceAmount = el("span.top-row__balance-amount")

  if (data || data === 0) {
    // Если передали баланс счёта, добавляем его
    balanceAmount.textContent = `${data
      // Приводим число в формат 1 000 000.00
      .toLocaleString("ru-RU")
      .replace(",", ".")}`
  } else {
    // Иначе добавляем класс для визуализации загрузки
    balanceAmount.classList.add("top-row__balance-amount--skeleton")
  }

  setChildren(balance, [balanceTitle, balanceAmount])

  return balance
}
