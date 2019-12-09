import { HOST_URL } from '../api/axiosConfig'

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
export const EX_URL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : 'http://localhost:3000'
export const API_DOC_URL = `${HOST_URL}/api`
export const CC_LINK = process.env.NODE_ENV === 'production' ? 'https://cc.365-exchange.com' : 'http://localhost:3002'
export const PRIZE_CENTER_LINK = 'https://lend.365-exchange.com/orderlist/index.php'

export const SITE_CONTACT = 'support@365-exchange.com'

export const TICKER_INTERVAL = 30000

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


export const COINS = [
  {
    symbol: 'BTC',
    precision: 8,
    feeSymbol: 'BTC'
  },
  {
    symbol: 'ETH',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'XRP',
    precision: 6,
    feeSymbol: 'XRP'
  },
  {
    symbol: 'LTC',
    precision: 8,
    feeSymbol: 'LTC'
  },
  {
    symbol: 'BCH',
    precision: 8,
    feeSymbol: 'BCH'
  },
  {
    symbol: 'ADA',
    precision: 6,
    feeSymbol: 'ADA'
  },
  {
    symbol: 'USDT',
    precision: 6,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'PAX',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'DASH',
    precision: 8,
    feeSymbol: 'DASH'
  },
  {
    symbol: 'XMR',
    precision: 6,
    feeSymbol: 'XMR'
  },
  {
    symbol: 'NEO',
    precision: 1,
    feeSymbol: 'GAS'
  },
  {
    symbol: 'GAS',
    precision: 8,
    feeSymbol: 'GAS'
  },
  {
    symbol: 'ETC',
    precision: 18,
    feeSymbol: 'ETC'
  },
  {
    symbol: 'XEM',
    precision: 6,
    feeSymbol: 'XEM'
  },
  {
    symbol: 'BAT',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'OMG',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'BTG',
    precision: 8,
    feeSymbol: 'BTG'
  },
  {
    symbol: 'REP',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'TUSD',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'LINK',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'ZRX',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'BCD',
    precision: 8,
    feeSymbol: 'BCD'
  },
  {
    symbol: 'DENT',
    precision: 8,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'MCO',
    precision: 8,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'SNT',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'USDC',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'DGD',
    precision: 9,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'USDS',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'MANA',
    precision: 18,
    feeSymbol: 'ETH'
  }
]

export const QUOTE_SYMBOL = 'USDT'

export const DEFAULT_PRECISION = 8

export const ALMOST_ZERO = 0.0000001