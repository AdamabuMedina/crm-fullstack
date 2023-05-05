import { el, mount } from "redom"
import { createButton } from "../createButton"

// Создание блока меню
export const headerMenu = items => {
  const menu = el("nav.menu")

  const list = el(
    "ul.menu__list",
    items.map(item => {
      const button = createButton({
        className: "button--secondary",
        text: item.text,
        handler: item.handler,
      })

      if (item.disabled) {
        button.disabled = true
      }

      return el("li.menu__item", button)
    })
  )

  mount(menu, list)

  return menu
}
