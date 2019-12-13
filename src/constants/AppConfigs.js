export const SITE_NAME = '365 Exchange'
export const COPYRIGHT_COMPANY = 'NuROGIX, Inc. All Rights Reserved.'

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
export const EX_URL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : 'http://localhost:3000'
export const API_DOC_URL = `${HOST_URL}/api`
export const CC_LINK = process.env.NODE_ENV === 'production' ? 'https://cc.365-exchange.com' : 'http://localhost:3002'
export const PRIZE_CENTER_LINK = 'https://lend.365-exchange.com/orderlist/index.php'

export const SITE_CONTACT = 'support@365-exchange.com'

export const TICKER_INTERVAL = 1000

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
export const HOME_SYMBOLS = ['BTC', 'ETH', 'XRP', 'LTC', 'BCH']
export const STABLE_SYMBOL = 'Ⓢ'
export const BASE_PRICE_SYMBOL = '$'

export const DEFAULT_PRECISION = 8

export const ALMOST_ZERO = 0.0000001