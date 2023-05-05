import { createButton } from "../createButton"

export const topRowButton = data => {
  if (data) {
    // Если передали кнопку, добавляем её
    const button = createButton(data)

    return button
  }
}
