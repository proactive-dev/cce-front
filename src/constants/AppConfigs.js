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


export const COINS = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    precision: 8,
    feeSymbol: 'BTC'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'XRP',
    name: 'XRP',
    precision: 6,
    feeSymbol: 'XRP'
  },
  {
    symbol: 'LTC',
    name: 'Litecoin',
    precision: 8,
    feeSymbol: 'LTC'
  },
  {
    symbol: 'BCH',
    name: 'Bitcoin Cash',
    precision: 8,
    feeSymbol: 'BCH'
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    precision: 6,
    feeSymbol: 'ADA'
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    precision: 6,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'PAX',
    name: 'Paxos Standard',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'DASH',
    name: 'DASH',
    precision: 8,
    feeSymbol: 'DASH'
  },
  {
    symbol: 'XMR',
    name: 'Monero',
    precision: 6,
    feeSymbol: 'XMR'
  },
  {
    symbol: 'NEO',
    name: 'NEO',
    precision: 1,
    feeSymbol: 'GAS'
  },
  {
    symbol: 'GAS',
    name: 'GAS',
    precision: 8,
    feeSymbol: 'GAS'
  },
  {
    symbol: 'ETC',
    name: 'Ethereum Classic',
    precision: 18,
    feeSymbol: 'ETC'
  },
  {
    symbol: 'XEM',
    name: 'NEM',
    precision: 6,
    feeSymbol: 'XEM'
  },
  {
    symbol: 'BAT',
    name: 'Basic Attention Token',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'OMG',
    name: 'OmiseGO',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'BTG',
    name: 'Bitcoin Gold',
    precision: 8,
    feeSymbol: 'BTG'
  },
  {
    symbol: 'REP',
    name: 'Bitcoin Gold',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'TUSD',
    name: 'TrueUSD',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'ZRX',
    name: '0X',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'BCD',
    name: 'Bitcoin Diamond',
    precision: 8,
    feeSymbol: 'BCD'
  },
  {
    symbol: 'DENT',
    name: 'Dent',
    precision: 8,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'MCO',
    name: 'Crypto.com',
    precision: 8,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'SNT',
    name: 'StatusNetwork',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'DGD',
    name: 'DGD',
    precision: 9,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'USDS',
    name: 'StableUSD',
    precision: 18,
    feeSymbol: 'ETH'
  },
  {
    symbol: 'MANA',
    name: 'Decentraland',
    precision: 18,
    feeSymbol: 'ETH'
  }
]

export const QUOTE_SYMBOL = 'USDT'

export const DEFAULT_PRECISION = 8

export const ALMOST_ZERO = 0.0000001