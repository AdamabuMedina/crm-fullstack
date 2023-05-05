import { render } from "../../index"
import { logout } from "../../utils/logout"

export const headerAccountPage = {
  menuItems: [
    { text: "Банкоматы", disabled: false, handler: () => render("/banks") },
    { text: "Счета", disabled: false, handler: () => render("/accounts") },
    {
      text: "Валюта",
      disabled: false,
      handler: () => render("/currency"),
    },
    { text: "Выйти", disabled: false, handler: logout },
  ],
}

export const headerAccountsPage = {
  menuItems: [
    { text: "Банкоматы", disabled: false, handler: () => render("/banks") },
    { text: "Счета", disabled: true, handler: () => render("/accounts") },
    {
      text: "Валюта",
      disabled: false,
      handler: () => render("/currency"),
    },
    { text: "Выйти", disabled: false, handler: logout },
  ],
}

export const headerHistory = {
  menuItems: [
    { text: "Банкоматы", disabled: false, handler: () => render("/banks") },
    { text: "Счета", disabled: false, handler: () => render("/accounts") },
    {
      text: "Валюта",
      disabled: false,
      handler: () => render("/currency"),
    },
    { text: "Выйти", disabled: false, handler: logout },
  ],
}

export const headerCurrencyPage = {
  menuItems: [
    { text: "Банкоматы", disabled: false, handler: () => render("/banks") },
    { text: "Счета", disabled: false, handler: () => render("/accounts") },
    {
      text: "Валюта",
      disabled: true,
      handler: () => render("/currency"),
    },
    { text: "Выйти", disabled: false, handler: logout },
  ],
}

export const headerBanksPage = {
  menuItems: [
    { text: "Банкоматы", disabled: true, handler: () => render("/banks") },
    { text: "Счета", disabled: false, handler: () => render("/accounts") },
    {
      text: "Валюта",
      disabled: false,
      handler: () => render("/currency"),
    },
    { text: "Выйти", disabled: false, handler: logout },
  ],
}
