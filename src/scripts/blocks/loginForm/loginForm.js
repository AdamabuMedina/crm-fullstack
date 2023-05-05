// Libraries
import { el, setChildren } from "redom"

import { createButton } from "../createButton"
import { passwordInput, usernameInput } from "./createInput"
import { validationForm } from "./validationForm"

// Создание формы логина
export const loginForm = () => {
  const form = el("form.login-form")
  const title = el("p.login-form__title", "Вход в аккаунт")
  const username = usernameInput
  const password = passwordInput

  const button = createButton({
    className: "button--primary",
    text: "Войти",
  })

  button.type = "submit"

  form.addEventListener("submit", e => {
    e.preventDefault()
  })

  setChildren(form, [title, username, password, button])

  validationForm(form)

  return form
}
