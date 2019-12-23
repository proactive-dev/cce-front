import { GET_PRICE, SET_PRICE } from '../../constants/ActionTypes'

export const GET_TICKERS = 'GET_TICKERS'

export const getPrice = () => {
  return {type: GET_PRICE}
}

export const setPrice = (price) => {
  return {type: SET_PRICE, price: price}
}

