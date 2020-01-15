export const MARKETS = [
  {
    id: 'ethbtc',
    code: 1,
    name: 'ETH/BTC',
    baseUnit: 'eth',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'eth',
      fixed: 3,
      min: 0.001
    },
    margin: false,
    visible: true
  },
  {
    id: 'xrpbtc',
    code: 2,
    name: 'XRP/BTC',
    baseUnit: 'xrp',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 8,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'xrp',
      fixed: 1,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'ltcbtc',
    code: 3,
    name: 'LTC/BTC',
    baseUnit: 'ltc',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'ltc',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'bchbtc',
    code: 4,
    name: 'BCH/BTC',
    baseUnit: 'bch',
    quoteUnit: 'btc',
    bid: {
      fee: 0,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0,
      currency: 'bch',
      fixed: 3,
      min: 0.001
    },
    margin: false,
    visible: true
  },
  {
    id: 'adabtc',
    code: 6,
    name: 'ADA/BTC',
    baseUnit: 'ada',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 8,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'ada',
      fixed: 1,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'btcpax',
    code: 7,
    name: 'BTC/PAX',
    baseUnit: 'btc',
    quoteUnit: 'pax',
    bid: {
      fee: 0,
      currency: 'pax',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'btc',
      fixed: 6,
      min: 0.000001
    },
    margin: false,
    visible: true
  },
  {
    id: 'dashbtc',
    code: 8,
    name: 'DASH/BTC',
    baseUnit: 'dash',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'dash',
      fixed: 3,
      min: 0.001
    },
    margin: false,
    visible: true
  },
  {
    id: 'xmrbtc',
    code: 9,
    name: 'XMR/BTC',
    baseUnit: 'xmr',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'xmr',
      fixed: 3,
      min: 0.001
    },
    margin: false,
    visible: true
  },
  {
    id: 'neobtc',
    code: 10,
    name: 'NEO/BTC',
    baseUnit: 'neo',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'neo',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'etcbtc',
    code: 11,
    name: 'ETC/BTC',
    baseUnit: 'etc',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'etc',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'xembtc',
    code: 12,
    name: 'XEM/BTC',
    baseUnit: 'xem',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 8,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'xem',
      fixed: 1,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'dentbtc',
    code: 13,
    name: 'DENT/BTC',
    baseUnit: 'dent',
    quoteUnit: 'btc',
    bid: {
      fee: 0,
      currency: 'btc',
      fixed: 8,
      min: 0
    },
    ask: {
      fee: 0,
      currency: 'dent',
      fixed: 1,
      min: 0
    },
    margin: false,
    visible: false
  },
  {
    id: 'batbtc',
    code: 14,
    name: 'BAT/BTC',
    baseUnit: 'bat',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 8,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'bat',
      fixed: 1,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'omgbtc',
    code: 15,
    name: 'OMG/BTC',
    baseUnit: 'omg',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'omg',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'btgbtc',
    code: 16,
    name: 'BTG/BTC',
    baseUnit: 'btg',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'btg',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'repbtc',
    code: 17,
    name: 'REP/BTC',
    baseUnit: 'rep',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'rep',
      fixed: 3,
      min: 0.001
    },
    margin: false,
    visible: true
  },
  {
    id: 'btctusd',
    code: 18,
    name: 'BTC/TUSD',
    baseUnit: 'btc',
    quoteUnit: 'tusd',
    bid: {
      fee: 0,
      currency: 'tusd',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'btc',
      fixed: 6,
      min: 0.000001
    },
    margin: false,
    visible: true
  },
  {
    id: 'linkbtc',
    code: 19,
    name: 'LINK/BTC',
    baseUnit: 'link',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 8,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'link',
      fixed: 1,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'zrxbtc',
    code: 20,
    name: 'ZRX/BTC',
    baseUnit: 'zrx',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 8,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'zrx',
      fixed: 1,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'bcdbtc',
    code: 21,
    name: 'BCD/BTC',
    baseUnit: 'bcd',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'bcd',
      fixed: 3,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'mcobtc',
    code: 22,
    name: 'MCO/BTC',
    baseUnit: 'mco',
    quoteUnit: 'btc',
    bid: {
      fee: 0,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0,
      currency: 'mco',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'sntbtc',
    code: 23,
    name: 'SNT/BTC',
    baseUnit: 'snt',
    quoteUnit: 'btc',
    bid: {
      fee: 0,
      currency: 'btc',
      fixed: 8,
      min: 0.0001
    },
    ask: {
      fee: 0,
      currency: 'snt',
      fixed: 1,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'dgdbtc',
    code: 24,
    name: 'DGD/BTC',
    baseUnit: 'dgd',
    quoteUnit: 'btc',
    bid: {
      fee: 0,
      currency: 'btc',
      fixed: 6,
      min: 0.000001
    },
    ask: {
      fee: 0,
      currency: 'dgd',
      fixed: 3,
      min: 0.001
    },
    margin: false,
    visible: true
  },
  {
    id: 'btcusdc',
    code: 25,
    name: 'BTC/USDC',
    baseUnit: 'btc',
    quoteUnit: 'usdc',
    bid: {
      fee: 0,
      currency: 'usdc',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'btc',
      fixed: 6,
      min: 0.000001
    },
    margin: false,
    visible: true
  },
  {
    id: 'manabtc',
    code: 26,
    name: 'MANA/BTC',
    baseUnit: 'mana',
    quoteUnit: 'btc',
    bid: {
      fee: 0,
      currency: 'btc',
      fixed: 8,
      min: 0.0001
    },
    ask: {
      fee: 0,
      currency: 'mana',
      fixed: 1,
      min: 1
    },
    margin: false,
    visible: true
  },
  {
    id: 'btcusds',
    code: 27,
    name: 'BTC/USDS',
    baseUnit: 'btc',
    quoteUnit: 'usds',
    bid: {
      fee: 0,
      currency: 'usds',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'btc',
      fixed: 6,
      min: 0.000001
    },
    margin: false,
    visible: true
  },
  {
    id: 'gasbtc',
    code: 28,
    name: 'GAS/BTC',
    baseUnit: 'gas',
    quoteUnit: 'btc',
    bid: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.0001
    },
    ask: {
      fee: 0.001,
      currency: 'gas',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'ngobtc',
    code: 29,
    name: 'NGO/BTC',
    baseUnit: 'ngo',
    quoteUnit: 'btc',
    bid: {
      fee: 0,
      currency: 'btc',
      fixed: 8,
      min: 0
    },
    ask: {
      fee: 0,
      currency: 'ngo',
      fixed: 2,
      min: 0
    },
    margin: false,
    visible: false
  },
  {
    id: 'btcusdt',
    code: 30,
    name: 'BTC/USDT',
    baseUnit: 'btc',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'btc',
      fixed: 6,
      min: 0.000001
    },
    margin: false,
    visible: true
  },
  {
    id: 'ethusdt',
    code: 31,
    name: 'ETH/USDT',
    baseUnit: 'eth',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'eth',
      fixed: 6,
      min: 0.00001
    },
    margin: false,
    visible: true
  },
  {
    id: 'xrpusdt',
    code: 32,
    name: 'XRP/USDT',
    baseUnit: 'xrp',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 6,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'xrp',
      fixed: 1,
      min: 0.1
    },
    margin: false,
    visible: true
  },
  {
    id: 'ltcusdt',
    code: 33,
    name: 'LTC/USDT',
    baseUnit: 'ltc',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'ltc',
      fixed: 6,
      min: 0.00001
    },
    margin: false,
    visible: true
  },
  {
    id: 'bchusdt',
    code: 34,
    name: 'BCH/USDT',
    baseUnit: 'bch',
    quoteUnit: 'usdt',
    bid: {
      fee: 0,
      currency: 'usdt',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'bch',
      fixed: 5,
      min: 0.00001
    },
    margin: false,
    visible: true
  },
  {
    id: 'adausdt',
    code: 36,
    name: 'ADA/USDT',
    baseUnit: 'ada',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 5,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'ada',
      fixed: 1,
      min: 0.1
    },
    margin: false,
    visible: true
  },
  {
    id: 'paxusdt',
    code: 37,
    name: 'PAX/USDT',
    baseUnit: 'pax',
    quoteUnit: 'usdt',
    bid: {
      fee: 0,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'pax',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'dashusdt',
    code: 38,
    name: 'DASH/USDT',
    baseUnit: 'dash',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'dash',
      fixed: 5,
      min: 0.00001
    },
    margin: false,
    visible: true
  },
  {
    id: 'xmrusdt',
    code: 39,
    name: 'XMR/USDT',
    baseUnit: 'xmr',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 2,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'xmr',
      fixed: 5,
      min: 0.00001
    },
    margin: false,
    visible: true
  },
  {
    id: 'neousdt',
    code: 40,
    name: 'NEO/USDT',
    baseUnit: 'neo',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 3,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'neo',
      fixed: 3,
      min: 0.001
    },
    margin: false,
    visible: true
  },
  {
    id: 'etcusdt',
    code: 41,
    name: 'ETC/USDT',
    baseUnit: 'etc',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'etc',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'batusdt',
    code: 44,
    name: 'BAT/USDT',
    baseUnit: 'bat',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'bat',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'omgusdt',
    code: 45,
    name: 'OMG/USDT',
    baseUnit: 'omg',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'omg',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'tusdusdt',
    code: 48,
    name: 'TUSD/USDT',
    baseUnit: 'tusd',
    quoteUnit: 'usdt',
    bid: {
      fee: 0,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'tusd',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'linkusdt',
    code: 49,
    name: 'LINK/USDT',
    baseUnit: 'link',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'link',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'zrxusdt',
    code: 50,
    name: 'ZRX/USDT',
    baseUnit: 'zrx',
    quoteUnit: 'usdt',
    bid: {
      fee: 0.001,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0.001,
      currency: 'zrx',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'usdcusdt',
    code: 55,
    name: 'USDC/USDT',
    baseUnit: 'usdc',
    quoteUnit: 'usdt',
    bid: {
      fee: 0,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'usdc',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  },
  {
    id: 'usdsusdt',
    code: 57,
    name: 'USDS/USDT',
    baseUnit: 'usds',
    quoteUnit: 'usdt',
    bid: {
      fee: 0,
      currency: 'usdt',
      fixed: 4,
      min: 10
    },
    ask: {
      fee: 0,
      currency: 'usds',
      fixed: 2,
      min: 0.01
    },
    margin: false,
    visible: true
  }
]
