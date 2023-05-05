// Libraries
import { el, mount, setChildren } from "redom"

import { createButton } from "../createButton"

import {
  currencyFrom,
  currencyFromSelect,
  currencyTo,
  currencyToSelect,
} from "./currencySelects"
import { currencyAmount } from "./currencyAmount"
import { requestCurrencies } from "./requestCurrencies"

// Создание формы обмена валюты
export const createCurrencyExchangeForm = ({ onSubmit }) => {
  const form = el("form.currency-exchange-form")
  const title = el("p.currency-exchange-form__title", "Обмен валюты")
  const options = el(".currency-exchange-form__options")

  const from = currencyFrom
  const fromSelect = currencyFromSelect
  const to = currencyTo
  const toSelect = currencyToSelect

  const amount = currencyAmount()

  const button = createButton({
    className: "button--primary",
    text: "Обменять",
  })
  button.type = "submit"
  button.name = "submit"

  mount(from, fromSelect)
  mount(to, toSelect)

  setChildren(options, [from, to, amount])
  setChildren(form, [title, options, button])

  form.addEventListener("submit", e => {
    e.preventDefault()
  })

  requestCurrencies(form, onSubmit)

  return form
}
