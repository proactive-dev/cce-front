import { GET_TICKERS } from '../actions'

const INIT_STATE = {
  tickers: {}
}

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_TICKERS:
      return {...state, tickers: action.data}
    default:
      return state
  }
}
