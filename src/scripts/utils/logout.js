import { render } from ".."

// Выход пользователя из системы
export const logout = () => {
  localStorage.removeItem("token")
  render()
}
