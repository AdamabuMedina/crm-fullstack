import { el } from "redom"

const createInput = data => {
  return el(
    "label.login-form__label",
    el("span.login-form__label-text", data.text),
    el(`input.login-form__input.login-form__input--${data.className}`, {
      placeholder: data.placeholder,
      type: data.type,
      name: data.name,
      "aria-label": data.text,
    })
  )
}

export const usernameInput = createInput({
  text: "Логин",
  className: "login",
  placeholder: "Введите логин",
  type: "text",
  name: "login",
})

export const passwordInput = createInput({
  text: "Пароль",
  className: "password",
  placeholder: "Введите пароль",
  type: "password",
  name: "password",
})
