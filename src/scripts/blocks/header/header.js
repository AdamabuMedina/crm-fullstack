import { el, mount } from "redom"

import { createContainer } from "../createContainer"
import { headerLogo } from "./headerLogo"
import { createButton } from "../createButton"
import { headerMenu } from "./headerMenu"

import Burger from "../../../assets/images/burger.svg"

// Создание шапки страницы
export const createHeader = ({ menuItems } = {}) => {
  const header = el("header.header")
  const logo = headerLogo()

  const container = el(".container", logo)

  mount(header, container)

  if (menuItems) {
    const burger = createButton({
      icon: Burger,
      handler: () => {
        menu.classList.toggle("menu--visible")
      },
    })
    mount(container, burger)

    const menu = headerMenu(menuItems)

    mount(container, menu)

    burger.classList.add("button--burger")
  }

  return header
}
