import { GET_AUTH_STATUS, GET_PROFILE, INIT_SETTINGS, SET_AUTH_STATUS } from '../../constants/ActionTypes'
import { LOGGED_IN } from '../../constants/ResponseCode'
import { keysToCamelcase } from '../../util/helpers'

const INIT_STATE = {
  authStatus: false,
  profile: {}
}

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case INIT_SETTINGS:
      return INIT_STATE
    case GET_AUTH_STATUS:
      if (action.payload) {
        const {code} = action.payload
        return {...state, authStatus: code === LOGGED_IN}
      } else {
        return state
      }
    case SET_AUTH_STATUS:
      return {...state, authStatus: !!action.status}
    case GET_PROFILE:
      if (action.payload) {
        return {...state, profile: keysToCamelcase(action.payload)}
      } else {
        return state
      }
    default:
      return state
  }
}
