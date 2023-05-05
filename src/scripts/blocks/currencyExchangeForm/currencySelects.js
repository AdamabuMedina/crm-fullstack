import { el } from "redom"

export const currencyFrom = el(
  "label.currency-exchange-form__label",
  el("span.currency-exchange-form__label-text", "Из")
)

export const currencyFromSelect = el(
  "select.currency-exchange-form__select.currency-exchange-form__select--skeleton.js-exchange-from"
)

export const currencyTo = el(
  "label.currency-exchange-form__label",
  el("span.currency-exchange-form__label-text", "в")
)

export const currencyToSelect = el(
  "select.currency-exchange-form__select.currency-exchange-form__select--skeleton.js-exchange-to"
)
