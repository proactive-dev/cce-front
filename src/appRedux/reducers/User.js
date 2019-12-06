import { GET_AUTH_STATUS, INIT_SETTINGS } from '../../constants/ActionTypes'

const INIT_STATE = {
  authStatus: false
}

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case INIT_SETTINGS:
      return INIT_STATE
    case GET_AUTH_STATUS:
      if (action.payload) {
        const {status} = action.payload
        return {...state, authStatus: status}
      } else {
        return state
      }
    default:
      return state
  }
}
