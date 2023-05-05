import { el } from "redom"

export const topRowSelect = data => {
  const select = el("select.top-row__select.js-sort")

  if (data) {
    // Если передали параметры сортировки, добавляем её
    data.forEach(option => {
      select.append(
        el("option.top-row__option", option.text, { value: option.value })
      )
    })
  }

  return select
}
