export const SITE_NAME = '365 Exchange'
export const COMPANY_NAME = 'NuROGIX, Inc.'
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
    code: 'ko',
    name: '한국어'
  }
]

// Notification constants
export const SUCCESS = 'success'
export const ERROR = 'error'
export const NOTIFICATION_TIMEOUT = 5 // seconds

export const PRODUCTION_URL = 'https://crypto.365-exchange.com'
export const HOST_URL = process.env.NODE_ENV === 'production' ? `${PRODUCTION_URL}:8443` : 'http://localhost:4000'
export const SOCKET_URL = process.env.NODE_ENV === 'production' ? 'wss://crypto.365-exchange.com:2096' : 'ws://localhost:8080'
export const EX_URL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : 'http://localhost:3000'
export const API_DOC_URL = `${HOST_URL}/api`
export const CC_LINK = process.env.NODE_ENV === 'production' ? 'https://cc.365-exchange.com' : 'http://localhost:3002'
export const PRIZE_CENTER_LINK = 'https://lend.365-exchange.com/orderlist/index.php'

export const SITE_CONTACT = 'support@365-exchange.com'

export const OTPAUTH_URL = 'otpauth://totp/'
export const G_AUTH_IOS_APP_URL = 'https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8'
export const G_AUTH_ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'

export const TICKER_INTERVAL = 1000
export const TICKER_GRAPH_INTERVAL = 3000
export const USER_TRADE_HISTORY_INTERVAL = 10000

export const BANNERS = [
  {
    img: 'intro.png',
    url: '/'
  },
  {
    img: 'tsf.jpg',
    url: '/'
  },
  {
    img: 'casting.jpg',
    url: '/'
  },
  {
    img: 'prize_center.jpg',
    url: '/'
  }
]

export const QUOTE_SYMBOL = 'USDT'
export const ESTIMATE_SYMBOL = 'BTC'
export const KEY_COIN_SYMBOL = 'BTC'
export const EX_COIN_SYMBOL = 'TSF'
export const HOME_SYMBOLS = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH']
export const STABLE_SYMBOL = 'Ⓢ'
export const BASE_PRICE_SYMBOL = '$'

export const DEFAULT_PRECISION = 8

export const ALMOST_ZERO = 0.0000001

export const ORDER_BUY = 'buy'
export const ORDER_SELL = 'sell'

export const HISTORY_TYPE_DEPOSIT = 'deposit'
export const HISTORY_TYPE_WITHDRAWAL = 'withdraw'

