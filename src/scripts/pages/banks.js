import { mount, setChildren } from "redom"

// Blocks
import { createHeader } from "../blocks/header/header"
import { createMain } from "../blocks/main"
import { createContainer } from "../blocks/createContainer"
import { createMap } from "../blocks/map/map"
import { headerBanksPage } from "../blocks/header/headerConfig"
import { topRowBankPage } from "../blocks/topRow/topRowConfig"

// Отрисовка страницы с картой банков
export const renderBanksPage = async body => {
  // Создаём шапку страницы
  const header = createHeader(headerBanksPage)
  const main = createMain()
  const mainContainer = createContainer()

  // Создаем верхний блок
  const topRow = topRowBankPage()

  // Создаем блок карты
  const map = createMap()

  setChildren(mainContainer, [topRow, map])
  mount(main, mainContainer)

  // Очищаем страницу для перерисовки
  body.innerHTML = ""
  setChildren(body, [header, main])

  // Устанавливаем минимальную высоту страницы для отображения карты во весь экран
  main.style.minHeight = `calc(100vh - ${header.offsetHeight}px)`
}
