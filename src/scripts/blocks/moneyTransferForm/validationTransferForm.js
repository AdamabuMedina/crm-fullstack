import JustValidate from "just-validate"
import { transferFunds } from "../../api/transfer-funds"
import { handleError } from "../../utils/handle-error"
import { createModal } from "../createModal"

export const validationTransferForm = (form, id) => {
  // Инициализируем JustValidate для валидации формы
  const validation = new JustValidate(form, {
    errorLabelStyle: {},
    errorLabelCssClass: "money-transfer-form__label-text--invalid",
    errorFieldCssClass: "money-transfer-form__input--invalid",
  })

  // Настраиваем параметры валидации
  validation
    .addField(".money-transfer-form__input--account", [
      {
        rule: "required",
        errorMessage: "Введите номер счёта",
      },
      {
        validator: value => {
          return id !== value
        },
        errorMessage: "Перевод самому себе невозможен",
      },
    ])
    .addField(".money-transfer-form__input--amount", [
      {
        rule: "required",
        errorMessage: "Введите сумму перевода",
      },
      {
        validator: value => {
          return value > 0
        },
        errorMessage: "Сумма перевода должна быть больше 0",
      },
    ])
    .onSuccess(async () => {
      try {
        // Запрос перевода средств на сервер
        const response = await transferFunds(
          {
            from: id,
            to: form.account.value,
            amount: form.amount.value,
          },
          localStorage.token
        )
        if (response.error) {
          throw new Error(response.error)
        }
        // Открываем модальное окно в случае успеха
        const modal = createModal({
          title: "Перевод завершён",
          text: `Вы перевели ${form.amount.value}₽ на счёт №${form.account.value}`,
        })
        modal.open()

        // Сбрасываем значения в полях формы
        form.account.value = ""
        form.amount.value = ""

        if (localStorage.accounts) {
          // Если ранее уже сохраняли номера счетов, добавляем к ним новый
          try {
            const data = JSON.parse(localStorage.accounts).filter(val =>
              val.match(/^\d+$/)
            )
            if (!data.includes(accountInput.value)) {
              // Проверяем список счетов на дубликаты
              data.push(accountInput.value)
            }
            localStorage.accounts = JSON.stringify(data)
          } catch {
            // Если в свойстве localStorage был мусор, записываем в него номер счёта
            localStorage.accounts = `[${accountInput.value}]`
          }
        } else {
          // Иначе инициализируем свойство номером счёта
          localStorage.accounts = `[${accountInput.value}]`
        }
      } catch (error) {
        handleError(error)
      }
    })
}
