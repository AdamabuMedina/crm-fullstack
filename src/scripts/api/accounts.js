import { HOST } from './config'

// Запрос списка счетов
export const accounts = async (token) => {
  const response = await fetch(`http://${HOST}/accounts`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  })

  return await response.json()
}
