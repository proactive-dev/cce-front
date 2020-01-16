export const SITE_NAME = 'Whitelabel Coin Exchange'
export const COMPANY_NAME = 'Apollo IT.'
export const COPYRIGHT_COMPANY = `${COMPANY_NAME} All Rights Reserved.`

export const LANGUAGES = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'zh',
    name: '简体中文'
  },
  {
    code: 'ja',
    name: '日本語'
  }
]

// Notification constants
export const SUCCESS = 'success'
export const ERROR = 'error'
export const NOTIFICATION_TIMEOUT = 5 // seconds

export const PRODUCTION_URL = 'https://cce.apolloit.biz/'
export const HOST_URL = process.env.NODE_ENV === 'production' ? `${PRODUCTION_URL}:8443` : 'http://localhost:4000'
export const SOCKET_URL = process.env.NODE_ENV === 'production' ? 'wss://cce.apolloit.biz:2096' : 'ws://localhost:8080'
export const EX_URL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : 'http://localhost:3000'
export const ADMIN_URL = `${HOST_URL}/admin`
export const API_DOC_URL = `${HOST_URL}/api`

export const SITE_CONTACT = 'support@apolloit.biz'

export const OTPAUTH_URL = 'otpauth://totp/'
export const G_AUTH_IOS_APP_URL = 'https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8'
export const G_AUTH_ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'

export const TICKER_INTERVAL = 1000
export const TICKER_GRAPH_INTERVAL = 3000
export const USER_TRADE_HISTORY_INTERVAL = 10000

export const BANNERS = [
  {
    img: 'ad_wanted.jpg',
    url: '/'
  },
  {
    img: 'ad_wanted.jpg',
    url: '/'
  },
  {
    img: 'ad_wanted.jpg',
    url: '/'
  },
  {
    img: 'ad_wanted.jpg',
    url: '/'
  }
]

export const QUOTE_SYMBOL = 'USDT'
export const ESTIMATE_SYMBOL = 'BTC'
export const KEY_COIN_SYMBOL = 'BTC'
export const EX_COIN_SYMBOL = 'BNB'
export const HOME_SYMBOLS = ['BTC', 'ETH', 'LTC', 'BCH']
export const STABLE_SYMBOL = 'Ⓢ'
export const BASE_PRICE_SYMBOL = '$'

export const DEFAULT_PRECISION = 8

export const ALMOST_ZERO = 0.0000001

export const ORDER_BUY = 'buy'
export const ORDER_SELL = 'sell'

export const HISTORY_TYPE_DEPOSIT = 'deposit'
export const HISTORY_TYPE_WITHDRAWAL = 'withdraw'
