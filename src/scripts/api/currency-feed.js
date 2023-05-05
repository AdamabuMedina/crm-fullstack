import { HOST } from './config'

// Запрос соединения через веб-сокет для получения данных по курсам валют
export const currencyFeed = async () => {
  return new WebSocket(`ws://${HOST}/currency-feed`)
}
