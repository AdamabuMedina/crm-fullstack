import { HOST } from './config'

// Запрос авторизации пользователя
export const login = async (login, password) => {
  const data = { login: login, password: password }
  const response = await fetch(`http://${HOST}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}
