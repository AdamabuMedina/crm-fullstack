import { el, mount } from "redom"
import { autocomplete } from "../../utils/autocomplete"
import { setInputFilter } from "../../utils/set-input-filter"

export const accountTransferForm = () => {
  const account = el(
    "label.money-transfer-form__label",
    el("span.money-transfer-form__label-text", "Номер счёта получателя")
  )
  const accountInput = el(
    "input.money-transfer-form__input.money-transfer-form__input--account",
    {
      placeholder: "80304641174040315022502625",
      name: "account",
    }
  )

  mount(account, accountInput)

  // Добавляем фильтр на ввод только положительных чисел в сумму перевода
  setInputFilter(accountInput, value => /^\d*$/.test(value))

  if (localStorage.accounts) {
    // Если ранее уже сохраняли номера счетов, загружаем их
    try {
      const data = JSON.parse(localStorage.accounts).filter(val =>
        // Фильтруем только числовые строки на случай мусорных значений
        val.match(/^\d+$/)
      )

      // Активируем автодополнение для поля формы
      autocomplete(accountInput, data)
    } catch {
      // Если в свойстве localStorage был мусор, инициализируем его
      localStorage.accounts = "[]"
    }
  } else {
    // Иначе инициализируем свойство localStorage
    localStorage.accounts = "[]"
  }

  return account
}
