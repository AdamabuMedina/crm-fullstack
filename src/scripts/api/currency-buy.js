import { HOST } from './config'

// Запрос на обмен валюты
export const currencyBuy = async (data, token) => {
  const response = await fetch(`http://${HOST}/currency-buy`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}
