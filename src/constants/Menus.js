import {
  API_TOKENS,
  BALANCES,
  CHANGE_PWD,
  DEPOSIT,
  OPEN_ORDERS,
  ORDER_HISTORY,
  REFERRAL,
  TRADE_HISTORY,
  TRANSACTIONS,
  USER,
  WITHDRAWAL
} from './Paths'

export const WALLET_MENUS = [
  {
    path: BALANCES,
    title: 'balances'
  },
  {
    path: DEPOSIT,
    title: 'deposit'
  },
  {
    path: WITHDRAWAL,
    title: 'withdrawal'
  },
  {
    path: TRANSACTIONS,
    title: 'transaction.history'
  }
]

export const ORDER_MENUS = [
  {
    path: OPEN_ORDERS,
    title: 'open.orders'
  },
  {
    path: ORDER_HISTORY,
    title: 'order.history'
  },
  {
    path: TRADE_HISTORY,
    title: 'trade.history'
  }
]

export const USER_MENUS = [
  {
    path: USER,
    title: 'overview'
  },
  {
    path: CHANGE_PWD,
    title: 'password.change'
  },
  {
    path: API_TOKENS,
    title: 'api.tokens'
  },
  {
    path: REFERRAL,
    title: 'referral'
  }
]
