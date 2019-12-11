import { GET_AUTH_STATUS, INIT_SETTINGS, SET_AUTH_STATUS } from '../../constants/ActionTypes'
import { LOGGED_IN } from '../../constants/ResponseCode'

const INIT_STATE = {
  authStatus: false
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
    default:
      return state
  }
}
