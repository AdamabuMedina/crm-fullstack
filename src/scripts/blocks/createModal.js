import { el, mount } from "redom"
import { createButton } from "./createButton"

// Создание модального окна
export const createModal = data => {
  const element = el(".modal")
  const modal = el(".modal__card")

  mount(element, modal)

  if (data.title) {
    const title = el("p.modal__title")
    title.textContent = data.title

    mount(modal, title)
  }

  if (data.text) {
    const text = el("span.modal__text", data.text)

    mount(modal, text)
  }

  const buttons = el(".modal__buttons")

  mount(modal, buttons)

  if (data.button) {
    // Если передали данные основной кнопки, добавляем её
    const primaryButton = createButton(data.button)
    mount(buttons, primaryButton)

    const closeButton = createButton({
      className: "button--secondary",
      text: "Закрыть",
      handler: () => close(),
    })
    mount(buttons, closeButton)
  } else {
    // Иначе делаем кнопку "Закрыть" основной
    const closeButton = createButton({
      className: "button--primary",
      text: "Закрыть",
      handler: () => close(),
    })
    mount(buttons, closeButton)
  }

  function open() {
    mount(document.body, element)
    document.body.style.overflow = "hidden"
  }

  function close() {
    element.remove()
    document.body.style.removeProperty("overflow")
  }

  return {
    open,
    close,
  }
}
