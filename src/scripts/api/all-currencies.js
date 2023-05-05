import { HOST } from './config'

// Запрос списка всех валют
export const allCurrencies = async () => {
  const response = await fetch(`http://${HOST}/all-currencies`)

  return await response.json()
}
