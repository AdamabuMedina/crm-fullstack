import JustValidate from "just-validate"
import { render } from "../.."
import { login } from "../../api/login"
import { handleError } from "../../utils/handle-error"

export const validationForm = form => {
  // Инициализируем JustValidate для валидации формы
  const validation = new JustValidate(form, {
    errorLabelStyle: {},
    errorLabelCssClass: "login-form__label-text--invalid",
    errorFieldCssClass: "login-form__input--invalid",
  })

  // Настраиваем параметры валидации
  validation
    .addField(".login-form__input--login", [
      {
        rule: "required",
        errorMessage: "Введите логин",
      },
      {
        rule: "customRegexp",
        value: /^\S*$/,
        errorMessage: "Логин не должен содержать пробелы",
      },
      {
        rule: "minLength",
        value: 6,
        errorMessage: "Логин не должен быть короче 6 символов",
      },
    ])
    .addField(".login-form__input--password", [
      {
        rule: "required",
        errorMessage: "Введите пароль",
      },
      {
        rule: "customRegexp",
        value: /^\S*$/,
        errorMessage: "Пароль не должен содержать пробелы",
      },
      {
        rule: "minLength",
        value: 6,
        errorMessage: "Пароль не должен быть короче 6 символов",
      },
    ])
    .onSuccess(async () => {
      login(form.login.value, form.password.value)
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          } else if (!data.payload.token) {
            throw new Error("No token")
          }

          localStorage.setItem("token", data.payload.token)

          render("/accounts")
        })
        .catch(handleError)
    })
}
