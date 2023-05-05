import { el } from "redom"

// Создание логотипа
export const headerLogo = () => {
  const logo = el(".logo", el("img", { src: "../../../assets/logo.svg" }))
  return logo
}
