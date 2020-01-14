import { GET_AUTH_STATUS, GET_PROFILE, INIT_SETTINGS, SET_AUTH_STATUS } from '../../constants/ActionTypes'

export const initSettings = () => {
  return {type: INIT_SETTINGS}
}

export const getAuthStatus = () => {
  return {type: GET_AUTH_STATUS}
}

export const setAuthStatus = (status) => {
  return {type: SET_AUTH_STATUS, status: status}
}

export const getProfile = () => {
  return {type: GET_PROFILE}
}
