import { GET_ACCOUNTS, INIT_ACCOUNTS } from '../../constants/ActionTypes'

export const initAccounts = () => {
  return {type: INIT_ACCOUNTS}
}

export const getAccounts = () => {
  return {type: GET_ACCOUNTS}
}
