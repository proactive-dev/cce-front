import {
  API_TOKENS,
  BALANCES,
  CHANGE_PWD,
  DEPOSIT,
  LOGIN,
  OPEN_ORDERS,
  ORDER_HISTORY,
  PLD_AFFILIATE_HISTORY,
  PLD_PRESALE_HISTORY,
  PLD_PROFIT_HISTORY,
  REFERRAL,
  REGISTER,
  TRADE_HISTORY,
  TRANSACTIONS,
  TSF_EXCHANGE,
  TSF_PROFIT,
  TSF_PURCHASE,
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

export const AUTH_MENUS = [
  {
    path: LOGIN,
    title: 'auth.login'
  },
  {
    path: REGISTER,
    title: 'auth.register'
  }
]

export const TSF_MENUS = [
  {
    path: TSF_PURCHASE,
    title: 'purchase'
  },
  {
    path: TSF_PROFIT,
    title: 'profit.program'
  },
  {
    path: TSF_EXCHANGE,
    title: 'exchange'
  }
]

export const PLD_MENUS = [
  {
    path: PLD_PRESALE_HISTORY,
    title: 'purchase.history'
  },
  {
    path: PLD_PROFIT_HISTORY,
    title: 'profits'
  },
  {
    path: PLD_AFFILIATE_HISTORY,
    title: 'affiliate.history'
  }
]
