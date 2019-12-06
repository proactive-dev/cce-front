import { GET_AUTH_STATUS, INIT_SETTINGS } from '../../constants/ActionTypes'

export const initSettings = () => {
  return {type: INIT_SETTINGS}
}

export const getAuthStatus = () => {
  return {type: GET_AUTH_STATUS}
}

