import { GET_PRICE, GET_TICKERS, SET_PRICE } from '../../constants/ActionTypes'

const INIT_STATE = {
  tickers: {},
  price: '0.00000000'
}

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case GET_TICKERS:
      return {...state, tickers: action.data}
    case GET_PRICE:
      return state
    case SET_PRICE:
      return {...state, price: action.price}
    default:
      return state
  }
}
