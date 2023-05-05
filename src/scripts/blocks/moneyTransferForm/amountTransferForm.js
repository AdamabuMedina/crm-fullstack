import { el, mount } from "redom"
import { setInputFilter } from "../../utils/set-input-filter"

export const amountTransferForm = () => {
  const amount = el(
    "label.money-transfer-form__label",
    el("span.money-transfer-form__label-text", "Сумма перевода")
  )

  const amountInput = el(
    "input.money-transfer-form__input.money-transfer-form__input--amount",
    {
      placeholder: "1000 ₽",
      name: "amount",
    }
  )

  mount(amount, amountInput)

  // Добавляем фильтр на ввод только положительных чисел в сумму перевода
  setInputFilter(amountInput, value => /^\d*\.?\d*$/.test(value))

  return amount
}
