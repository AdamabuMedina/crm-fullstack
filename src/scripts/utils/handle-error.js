import { createModal } from "../blocks/createModal"
import { errorMessage } from "./errorMessage"

// Объект перевода кодов ошибок в их текстовые варианты

export const handleError = error => {
  const modal = createModal({
    title: "Ошибка",
    // Если код ошибки отсутствует в объекте, выводим текст ошибки как есть
    text: errorMessage[error.message]
      ? errorMessage[error.message]
      : error.message,
  })
  modal.open()
}
