import _ from 'lodash'
import { BigNumber } from 'bignumber.js'
import Moment from 'moment'
import { COINS, DEFAULT_PRECISION, EX_URL, QUOTE_SYMBOL } from '../constants/AppConfigs'

// main helper functions

export const removeDuplicates = (array) => {
  return (array === undefined || array.length === 0) ? [] : array.filter((v, i) => array.indexOf(v) === i)
}

export const matches = (array1, array2) => {
  if (array1.length !== array2.length) return false

  array1 = array1.filter(val => !_.some(array2, val))
  return _.isEmpty(array1)
}

export const getDecimal = (value) => {
  return isNaN(value) ? parseInt(value, 10) : value
}

export const getFeeSymbol = (symbol) => {
  try {
    return getCoinBySymbol(symbol).feeSymbol
  } catch (err) {
    return null
  }
}

export const getCoinBySymbol = (symbol) => {
  return COINS.find(coin => coin.symbol.toLowerCase() === symbol.toLowerCase())
}

export const getFixed = (value, precision = null) => {
  let fixed = precision > DEFAULT_PRECISION ? DEFAULT_PRECISION : precision
  return BigNumber(value).toFixed(fixed).toString()
}

export const getTableLocaleData = (intl) => {
  return {
    filterTitle: intl.formatMessage({id: 'filter'}),
    filterConfirm: intl.formatMessage({id: 'ok'}),
    filterReset: intl.formatMessage({id: 'reset'}),
    emptyText: intl.formatMessage({id: 'no.data'})
  }
}

export const getPrecise = (value, precision = null) => {
  let precise = precision > DEFAULT_PRECISION ? DEFAULT_PRECISION : precision
  return BigNumber(value).toPrecision(precise).toString()
}

export const getCoinFixed = (value, symbol) => {
  let precision = getCoinBySymbol(symbol).precision || 0
  return getFixed(value, precision)
}

export const getFiatFixed = (value) => {
  return getFixed(value, 2)
}

export const getPointFixed = (value) => {
  return getFixed(value, 2)
}

export const getBalance = (accounts, symbol) => {
  if (_.isEmpty(symbol)) {
    return 0
  }
  return Number(accounts[symbol.toLowerCase()]) || 0
}

export const getPrice = (prices, symbol) => {
  if (_.isEmpty(symbol) || _.isEmpty(prices)) {
    return 0
  }
  let priceSymbol = symbol.toUpperCase()
  if (priceSymbol === QUOTE_SYMBOL) {
    return 1
  }

  let price = getPairPrice(prices, `${priceSymbol}${QUOTE_SYMBOL}`)
  if (price <= 0) {
    let btcPrice = getPairPrice(prices, `BTC${QUOTE_SYMBOL}`)
    price = getPairPrice(prices, `${priceSymbol}BTC`) * btcPrice
  }
  return price
}

const getPairPrice = (prices, pair) => {
  return Number(prices[pair.toLowerCase()]) || 0
}

export const getDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString()
}

export const getDateTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString()
}

export const getTimeForTable = (timestamp) => {
  return Moment.utc(timestamp * 1000).format()
}

export const getYearMonth = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  const year = dateTime.getFullYear()
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2)
  return `${year}-${month}`
}

export const isThisMonth = (dateTimeString) => {
  const dateTime = new Date(dateTimeString)
  const now = new Date()
  return (dateTime.getFullYear() === now.getFullYear()) && (dateTime.getMonth() === now.getMonth())
}

export const gerRefLink = (refId) => {
  return _.isEmpty(refId) ?
    '' :
    `${EX_URL}/?refId=${refId}`
}

export const dataURItoFile = (dataURI, fileName) => {
  let u8Array = dataURItoU8Array(dataURI)
  return new File(u8Array[1], fileName, {type: u8Array[0]})
}

export const dataURItoBlob = (dataURI) => {
  let u8Array = dataURItoU8Array(dataURI)
  return new Blob(u8Array[1], {type: u8Array[0]})
}

export const dataURItoU8Array = (dataURI) => {
  let arr = dataURI.split(',')
  let bStr
  if (arr[0].indexOf('base64') >= 0) {
    bStr = atob(arr[1])
  } else {
    bStr = unescape(arr[1])
  }
  let mime = arr[0].split(':')[1].split(';')[0]
  // let bStr = atob(arr[1])
  // let mime = arr[0].match(/:(.*?);/)[1]

  let n = bStr.length
  let u8Arr = new Uint8Array(n)
  while (n--) {
    u8Arr[n] = bStr.charCodeAt(n)
  }
  return [mime, [u8Arr]]
}

export function numberFormat(inputNumber) {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
