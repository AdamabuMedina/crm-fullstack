import Choices from "choices.js"

export const topRowChoices = (topRow, accountsList) => {
  // Инициализируем Choices.js для вариантов сортировки счетов
  const select = topRow.querySelector(".js-sort")
  new Choices(select, {
    allowHTML: false,
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: "",
  })

  // Добавляем сортировку счетов
  select.addEventListener("change", event =>
    accountsList.sort(event.detail.value)
  )

  return select
}
