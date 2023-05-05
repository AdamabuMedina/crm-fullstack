import { el, mount } from "redom"
import { allCurrencies } from "../../api/all-currencies"
import { handleError } from "../../utils/handle-error"
import { currencyFromSelect, currencyToSelect } from "./currencySelects"
import { validationExchangeForm } from "./validationExchangeForm"

export const requestCurrencies = (form, onSubmit) => {
  allCurrencies()
    .then(res => {
      if (res.error) {
        throw new Error(res.error)
      }
      return res.payload
    })
    .then(currencies => {
      currencies.forEach(currency => {
        // Добавляем каждую валюту как опцию для select-ов
        mount(
          currencyFromSelect,
          el("option.currency-exchange-form__option", currency, {
            value: currency,
          })
        )
        mount(
          currencyToSelect,
          el("option.currency-exchange-form__option", currency, {
            value: currency,
          })
        )
      })

      validationExchangeForm(form, onSubmit)
    })
    .catch(error => handleError(error))
}
