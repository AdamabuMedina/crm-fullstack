import { el, mount } from "redom"
import { setInputFilter } from "../../utils/set-input-filter"

export const currencyAmount = () => {
  const amount = el("label.currency-exchange-form__label", "Сумма")
  const amountInput = el(
    "input.currency-exchange-form__input.currency-exchange-form__input--amount",
    {
      placeholder: "0.1235421",
      name: "amount",
    }
  )

  mount(amount, amountInput)

  // Добавляем фильтр на ввод только положительных чисел
  setInputFilter(amountInput, value => /^\d*\.?\d*$/.test(value))

  return amount
}
