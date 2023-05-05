import { el, mount } from "redom"

// Создание кнопки
export const createButton = data => {
  const button = el(`button.button.${data.className}`)

  if (data.icon) {
    const icon = el(".button__icon")
    icon.innerHTML = data.icon
    mount(button, icon)
  }

  if (data.text) {
    const span = el("span.button__text")
    span.textContent = data.text
    mount(button, span)
  }

  if (data.handler) {
    button.addEventListener("click", data.handler)
  }

  return button
}
