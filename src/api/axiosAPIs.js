import axios from 'axios'
import * as axiosConfig from './axiosConfig'
import { HOST_URL } from '../constants/AppConfigs'

const getHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8'
}

const formDataHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'multipart/form-data'
}

const jsonHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}

export const axiosRequest = (method, url, reqData = null, needLoader = true) => {
  let reqConfig = {
    url: url,
    method: method,
    baseURL: HOST_URL,
    withCredentials: true,
    needLoader: needLoader, // custom config for show loader
    headers: getHeaders // default: get
  }
  if (method === 'post' || method === 'put' || method === 'patch') {
    const headers = reqData instanceof FormData ? formDataHeaders : jsonHeaders
    reqConfig['data'] = reqData
    reqConfig['headers'] = headers
  } else { // 'get', 'delete', 'head'
    reqConfig['params'] = reqData
  }
  return axios.request(reqConfig)
}

export const register = (data) => {
  return axiosRequest('post', axiosConfig.REGISTER_URL, data)
}

export const login = (data) => {
  return axiosRequest('post', axiosConfig.LOGIN_URL, data)
}

export const logout = () => {
  return axiosRequest('get', axiosConfig.LOGOUT_URL)
}

export const verifyTFA = (data) => {
  return axiosRequest('post', axiosConfig.TFA_VERIFY_URL, data)
}

export const forgotPassword = (data) => {
  return axiosRequest('post', axiosConfig.RESET_PWD_URL, data)
}

export const validatePwdToken = (token) => {
  return axiosRequest('get', `${axiosConfig.RESET_PWD_URL}/${token}`)
}

export const resetPassword = (token, data) => {
  return axiosRequest('put', `${axiosConfig.RESET_PWD_URL}/${token}`, data)
}

export const changePassword = (data) => {
  return axiosRequest('post', axiosConfig.CHANGE_PWD_URL, data)
}

export const getAuthStatus = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.AUTH_STATUS_URL, null, needLoader)
}

export const postTfa = (data) => {
  return axiosRequest('put', axiosConfig.TFA_URL, data)
}

export const getCurrencies = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.CURRENCIES_URL, null, needLoader)
}

export const getLevels = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.LEVELS_URL, null, needLoader)
}

export const getMarketConfigs = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.MARKET_CONFIGS_URL, null, needLoader)
}

export const getMarkets = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.MARKETS_URL, null, needLoader)
}

export const getTickers = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.TICKERS_URL, null, needLoader)
}

export const getTicker = (market, needLoader = false) => {
  return axiosRequest('get', `${axiosConfig.TICKERS_URL}/${market}`, null, needLoader)
}

export const getOHLC = (market, period = 60, limit = 768, needLoader = false) => {
  return axiosRequest('get', `${axiosConfig.OHLC_URL}?market=${market}&period=${period}&limit=${limit}`, null, needLoader)
}

export const newOrderBid = (market, data) => {
  return axiosRequest('post', `${axiosConfig.MARKETS_URL}/${market}/order_bids`, data)
}

export const newOrderAsk = (market, data) => {
  return axiosRequest('post', `${axiosConfig.MARKETS_URL}/${market}/order_asks`, data)
}

export const clearOrderBids = (market, data) => {
  return axiosRequest('post', `${axiosConfig.MARKETS_URL}/${market}/order_bids/clear`, data)
}

export const clearOrderAsks = (market, data) => {
  return axiosRequest('post', `${axiosConfig.MARKETS_URL}/${market}/order_asks/clear`, data)
}

export const clearOrders = (market) => {
  return axiosRequest('post', `${axiosConfig.MARKETS_URL}/${market}/orders/clear`)
}

export const clearOrder = (market, order) => {
  return axiosRequest('delete', `${axiosConfig.MARKETS_URL}/${market}/orders/${order}`)
}

export const getAllAccounts = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.ALL_ACCOUNTS_URL, null, needLoader)
}

export const getAccounts = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.ACCOUNTS_URL, null, needLoader)
}

export const getMainAccounts = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.MAIN_ACCOUNTS_URL, null, needLoader)
}

export const getMember = (needLoader = false) => {
  return axiosRequest('get', axiosConfig.MEMBER_URL, null, needLoader)
}

export const updateMember = (data) => {
  return axiosRequest('post', axiosConfig.MEMBER_URL, data)
}

export const getAllOrderHistory = () => {
  return axiosRequest('get', axiosConfig.HISTORY_ORDER_URL)
}

export const getAllTradeHistory = () => {
  return axiosRequest('get', axiosConfig.HISTORY_TRADE_URL)
}

export const getOrderHistory = (params) => {
  return axiosRequest('get', `${axiosConfig.HISTORY_ORDER_URL}?page=${params.page}&perPage=${params.perPage}&search=${params.search}`)
}

export const getTradeHistory = (params) => {
  return axiosRequest('get', `${axiosConfig.HISTORY_TRADE_URL}?page=${params.page}&perPage=${params.perPage}&search=${params.search}`)
}

export const getAddresses = () => {
  return axiosRequest('get', axiosConfig.ADDR_MNG_URL)
}

export const newAddress = (data) => {
  return axiosRequest('post', axiosConfig.ADDR_MNG_URL, data)
}

export const deleteAddress = (id) => {
  return axiosRequest('delete', `${axiosConfig.ADDR_MNG_URL}/${id}`)
}

export const getDeposits = (currency) => {
  if (!!currency) {
    return axiosRequest('get', `${axiosConfig.DEPOSITS_URL}?currency=${currency}`)
  } else {
    return axiosRequest('get', axiosConfig.DEPOSITS_URL)
  }
}

export const getWithdraws = (currency) => {
  if (!!currency) {
    return axiosRequest('get', `${axiosConfig.WITHDRAWS_URL}?currency=${currency}`)
  } else {
    return axiosRequest('get', axiosConfig.WITHDRAWS_URL)
  }
}

export const newWithdraw = (currency, data) => {
  return axiosRequest('post', `${axiosConfig.WITHDRAW_URL}/${currency}`, data)
}

export const cancelWithdraw = (currency, id) => {
  return axiosRequest('delete', `${axiosConfig.WITHDRAW_URL}/${currency}/${id}`)
}

export const getTickets = (params) => {
  return axiosRequest('get', `${axiosConfig.TICKETS_URL}?page=${params.page}&perPage=${params.perPage}`)
}

export const newTicket = (data) => {
  return axiosRequest('post', axiosConfig.TICKETS_URL, data)
}

export const getTicket = (id) => {
  return axiosRequest('get', `${axiosConfig.TICKETS_URL}/${id}`)
}

export const closeTicket = (id) => {
  return axiosRequest('delete', `${axiosConfig.TICKETS_URL}/${id}`)
}

export const newTicketComment = (id, data) => {
  return axiosRequest('post', `${axiosConfig.TICKETS_URL}/${id}/comments`, data)
}

export const activate = () => {
  return axiosRequest('get', axiosConfig.ACTIVATION_URL)
}

export const updateIdDocument = (data) => {
  return axiosRequest('put', axiosConfig.ID_DOCUMENT_URL, data)
}

export const getGoogleAuth = () => {
  return axiosRequest('get', axiosConfig.GOOGLE_AUTH_URL)
}

export const enableGoogleAuth = (data) => {
  return axiosRequest('put', axiosConfig.GOOGLE_AUTH_URL, data)
}

export const disableGoogleAuth = (data) => {
  return axiosRequest('post', axiosConfig.GOOGLE_AUTH_URL, data)
}

export const getApiTokens = () => {
  return axiosRequest('get', axiosConfig.API_TOKENS_URL)
}

export const newApiToken = (data) => {
  return axiosRequest('post', axiosConfig.API_TOKENS_URL, data)
}

export const updateApiToken = (id, data) => {
  return axiosRequest('put', `${axiosConfig.API_TOKENS_URL}/${id}`, data)
}

export const deleteApiToken = (id) => {
  return axiosRequest('delete', `${axiosConfig.API_TOKENS_URL}/${id}`)
}

export const moveFunds = (data) => {
  return axiosRequest('post', axiosConfig.MOVE_FUNDS_URL, data)
}

export const getRefData = (data = null, needLoader = false) => {
  return axiosRequest('get', axiosConfig.REF_DATA_URL, data, needLoader)
}
