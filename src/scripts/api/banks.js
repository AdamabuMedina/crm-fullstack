import { HOST } from './config'

// Запрос списка координат банков
export const banks = async () => {
  const response = await fetch(`http://${HOST}/banks`)

  return await response.json()
}
