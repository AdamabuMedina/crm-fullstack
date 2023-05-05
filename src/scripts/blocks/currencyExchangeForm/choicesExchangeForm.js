import Choices from "choices.js"

export const choicesExchangeForm = select => {
  const choices = new Choices(select, {
    allowHTML: false,
    searchEnabled: false,
    itemSelectText: "",
  })

  return choices
}
