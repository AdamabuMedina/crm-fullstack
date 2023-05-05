// Blocks
import { createHeader } from "../blocks/header/header"
import { createMain } from "../blocks/main"
import { createContainer } from "../blocks/createContainer"
import { loginForm } from "../blocks/loginForm/loginForm"
import { mount, setChildren } from "redom"

export const renderLoginPage = body => {
  const header = createHeader()
  const main = createMain()
  const container = createContainer()
  const form = loginForm()

  mount(container, form)
  mount(main, container)

  body.innerHTML = ""

  setChildren(body, [header, main])

  main.style.minHeight = `calc(100vh - ${header.offsetHeight}px)`
}
