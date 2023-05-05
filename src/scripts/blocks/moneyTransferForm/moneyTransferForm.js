// Libraries
import { el, setChildren } from "redom"
import { createButton } from "../createButton"
import { amountTransferForm } from "./amountTransferForm"
import { accountTransferForm } from "./accountTransferForm"
import { validationTransferForm } from "./validationTransferForm"

import Envelope from "../../../assets/images/envelope.svg"

// Создание формы перевода средств
export const createMoneyTransferForm = id => {
  // Выключаем автодополнение, т.к. ниже есть своя реализация
  const form = el("form.money-transfer-form", { autocomplete: "off" })
  const title = el("p.money-transfer-form__title", "Новый перевод")

  const account = accountTransferForm()
  const amount = amountTransferForm()

  const button = createButton({
    className: "button--primary",
    text: "Отправить",
    icon: Envelope,
  })
  button.type = "submit"

  form.addEventListener("submit", e => {
    e.preventDefault()
  })

  setChildren(form, [title, account, amount, button])

  validationTransferForm(form, id)

  return form
}
