import { el, setChildren } from "redom"

// Создание блока для отрисовки графика
export const balanceChart = name => {
  const div = el(".balance-chart")
  const title = el("p.balance-chart__title", name)
  const canvas = el(
    "canvas.balance-chart__canvas.balance-chart__canvas--skeleton"
  )

  setChildren(div, [title, canvas])

  return div
}
