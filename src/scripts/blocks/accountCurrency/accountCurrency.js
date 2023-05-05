import { el, mount, setChildren } from "redom"
import { currencies } from "../../api/currencies"
import { handleError } from "../../utils/handle-error"

// Создание блока с валютами счёта
export const createAccountCurrency = ({
  token = localStorage.token,
  onInit,
}) => {
  const element = el(".account-currency")
  const title = el("p.account-currency__title", "Ваши валюты")
  const list = el("ul.account-currency__list")

  setChildren(element, [title, list])

  const fetch = () => {
    currencies(token)
      .then(response => {
        if (response.error) {
          throw new Error(response.error)
        }
        return response.payload
      })
      .then(currencies => {
        // Очищаем список от пустых строк
        list.innerHTML = ""

        // Заполняем его реальными данными
        Object.keys(currencies).forEach(key => {
          add(currencies[key])
        })
      })
      .then(() => onInit())
      .catch(error => handleError(error))
  }

  const add = currency => {
    const li = el("li.account-currency__item")
    const code = el("span.account-currency__code")
    const amount = el("span.account-currency__amount")

    if (currency) {
      // Если передали данные строки, заполняем их
      code.textContent = currency.code

      // Если у пользователя нет такой валюты, пропускаем эту строку
      if (currency.amount === 0) return

      amount.textContent = currency.amount
        // Приводим число в формат 1 000 000.00
        .toLocaleString("ru-RU")
        .replace(",", ".")
    } else {
      // Иначе добавляем классы для визуализации загрузки
      code.classList.add("account-currency__code--skeleton")
      amount.classList.add("account-currency__amount--skeleton")
    }

    setChildren(li, [code, amount])
    mount(list, li)
  }

  // Заполняем список пустыми строками для анимации загрузки
  for (let i = 0; i < 6; i++) {
    add()
  }

  fetch()

  return {
    element,
    fetch,
    add,
  }
}
