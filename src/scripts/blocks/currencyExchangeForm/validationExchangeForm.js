import JustValidate from "just-validate"
import { currencyBuy } from "../../api/currency-buy"
import { handleError } from "../../utils/handle-error"
import { createModal } from "../createModal"
import { choicesExchangeForm } from "./choicesExchangeForm"
import { currencyFromSelect, currencyToSelect } from "./currencySelects"

export const validationExchangeForm = (form, onSubmit) => {
  // Инициализируем Choices.js для select-ов
  const fromChoices = choicesExchangeForm(currencyFromSelect)
  const toChoices = choicesExchangeForm(currencyToSelect)

  // Задаем выставленные по умолчанию значения
  fromChoices.setChoiceByValue("BTC")
  toChoices.setChoiceByValue("ETH")

  const validation = new JustValidate(form, {
    errorLabelStyle: {},
    errorLabelCssClass: "currency-exchange-form__label-text--invalid",
    errorFieldCssClass: "currency-exchange-form__input--invalid",
  })

  validation
    .addField(".currency-exchange-form__input--amount", [
      {
        rule: "required",
        errorMessage: "Введите сумму перевода",
      },
      {
        validator: value => {
          return value > 0
        },
        errorMessage: "Сумма не должна быть 0",
      },
    ])
    .onSuccess(async () => {
      try {
        // Запрос обмена валюты на сервер
        const response = await currencyBuy(
          {
            from: fromChoices.getValue().value,
            to: toChoices.getValue().value,
            amount: form.amount.value,
          },
          localStorage.token
        )
        if (response.error) {
          throw new Error(response.error)
        }

        onSubmit()

        // Открываем модальное окно в случае успеха
        const modal = createModal({
          title: "Обмен завершён",
          text: `Вы обменяли ${form.amount.value} ${
            fromChoices.getValue().value
          } на ${toChoices.getValue().value}`,
        })
        modal.open()

        // Сбрасываем значение в поле формы
        form.amount.value = ""
      } catch (error) {
        handleError(error)
      }
    })
}
