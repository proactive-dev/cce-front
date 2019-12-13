import { GET_ACCOUNTS, INIT_ACCOUNTS } from '../../constants/ActionTypes'

const INIT_STATE = {
  accounts: []
}

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case INIT_ACCOUNTS:
      return INIT_STATE
    case GET_ACCOUNTS:
      if (!!action.payload) {
        const {accounts} = action.payload
        return {...state, accounts: accounts}
      } else {
        return state
      }
    default:
      return state
  }
}
