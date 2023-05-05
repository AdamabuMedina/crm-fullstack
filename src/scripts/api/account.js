import { HOST } from './config'

// Запрос данных счёта
export const account = async (id, token) => {
  const response = await fetch(`http://${HOST}/account/${id}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  })

  return await response.json()
}
