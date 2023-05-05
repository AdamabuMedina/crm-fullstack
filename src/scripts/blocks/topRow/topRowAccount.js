import { el } from "redom"

export const topRowAccount = data => {
  const account = el(".top-row__account")

  if (data) {
    // Если передали номер счёта, добавляем его
    account.textContent = `№ ${data}`
  } else {
    // Иначе добавляем класс для визуализации загрузки
    account.classList.add("top-row__account--skeleton")
  }

  return account
}
