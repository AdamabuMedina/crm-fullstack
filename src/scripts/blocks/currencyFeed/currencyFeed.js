import { el, setChildren } from "redom"
import { currencyFeed } from "../../api/currency-feed"
import { handleError } from "../../utils/handle-error"

// Создание блока с курсами валют в реальном времени
export const createCurrencyFeed = () => {
  let feed = []

  try {
    feed = JSON.parse(localStorage.currencyFeed) || []
  } catch {
    localStorage.currencyFeed = "[]"
  }

  const rows = 12

  const element = el(".currency-feed")
  const title = el(
    "p.currency-feed__title",
    "Изменение курсов в реальном времени"
  )
  const list = el("ul.currency-feed__list")

  setChildren(element, [title, list])

  // Отображение данных
  const reload = () => {
    if (feed) {
      list.innerHTML = ""
      feed.slice(-rows).forEach(entry => add(entry))
    }
  }

  // Добавление строки в начало списка
  const add = data => {
    const li = el("li.currency-feed__item")
    const code = el("span.currency-feed__code", `${data.from}/${data.to}`)
    const rate = el(
      "span.currency-feed__rate",
      data.rate
        .toLocaleString("ru-RU", { maximumFractionDigits: 10 })
        .replace(",", ".")
    )

    if (data.change === 1) {
      code.classList.add("currency-feed__code--positive")
      rate.classList.add("currency-feed__rate--positive")
    } else if (data.change === -1) {
      code.classList.add("currency-feed__code--negative")
      rate.classList.add("currency-feed__rate--negative")
    }

    while (list.childElementCount >= rows) {
      list.lastChild.remove()
    }

    li.append(code, rate)
    list.prepend(li)
  }

  currencyFeed()
    .then(
      socket =>
        (socket.onmessage = event => {
          try {
            const data = JSON.parse(event.data)
            if (data.type === "EXCHANGE_RATE_CHANGE") {
              add(data)
              feed.push(data)
              localStorage.currencyFeed = JSON.stringify(feed.slice(-100))
            }
          } catch (error) {
            throw new Error(error)
          }
        })
    )
    .catch(error => handleError(error))

  return { element, reload }
}
