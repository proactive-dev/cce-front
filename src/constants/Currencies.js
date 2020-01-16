export const CURRENCIES = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'btc',
    feeSymbol: 'btc',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/bitcoin',
    txLink: 'https://blockchain.com/btc/tx/#{txid}',
    addressLink: 'https://blockchain.com/btc/address/#{address}',
    caseSensitive: true,
    visible: true,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.0005,
      minAmount: 0.002
    }
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'eth',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/ethereum',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/address/#{address}',
    caseSensitive: false,
    visible: true,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.01,
      minAmount: 0.02
    }
  },
  {
    id: 3,
    name: 'XRP',
    symbol: 'xrp',
    feeSymbol: 'xrp',
    type: 'coin',
    precision: 6,
    baseFactor: 1000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/ripple',
    txLink: 'https://bithomp.com/explorer/#{txid}',
    addressLink: 'https://bithomp.com/explorer/#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.25,
      minAmount: 22
    }
  },
  {
    id: 4,
    name: 'Litecoin',
    symbol: 'ltc',
    feeSymbol: 'ltc',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/litecoin',
    txLink: 'http://explorer.litecoin.net/tx/#{txid}',
    addressLink: 'http://explorer.litecoin.net/address/#{address}',
    caseSensitive: true,
    visible: true,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.001,
      minAmount: 0.002
    }
  },
  {
    id: 5,
    name: 'Bitcoin Cash',
    symbol: 'bch',
    feeSymbol: 'bch',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/bitcoin-cash',
    txLink: 'https://explorer.bitcoin.com/bch/tx/#{txid}',
    addressLink: 'https://explorer.bitcoin.com/bch/address/#{address}',
    caseSensitive: true,
    visible: true,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.001,
      minAmount: 0.002
    }
  },
  {
    id: 8,
    name: 'Cardano',
    symbol: 'ada',
    feeSymbol: 'ada',
    type: 'coin',
    precision: 6,
    baseFactor: 1000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/cardano',
    txLink: 'https://cardanoexplorer.com/tx/#{txid}',
    addressLink: 'https://cardanoexplorer.com/address/#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 1,
      minAmount: 4
    }
  },
  {
    id: 9,
    name: 'Tether USD',
    symbol: 'usdt',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 6,
    baseFactor: 1000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/tether',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7?a={address}',
    caseSensitive: false,
    visible: true,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 6.6,
      minAmount: 13.2
    }
  },
  {
    id: 10,
    name: 'Paxos Standard',
    symbol: 'pax',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    rpc: 'http://172.31.46.110:8555',
    infoLink: 'https://coinmarketcap.com/currencies/paxos-standard-token',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0x8e870d67f660d95d5be530380d0ec0bd388289e1?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 1.8,
      minAmount: 3.6
    }
  },
  {
    id: 11,
    name: 'Dash',
    symbol: 'dash',
    feeSymbol: 'dash',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/dash',
    txLink: 'https://explorer.dash.org/tx/#{txid}',
    addressLink: 'https://explorer.dash.org/address/#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.002,
      minAmount: 0.004
    }
  },
  {
    id: 12,
    name: 'Monero',
    symbol: 'xmr',
    feeSymbol: 'xmr',
    type: 'coin',
    precision: 6,
    baseFactor: 1000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/monero',
    txLink: 'https://moneroblocks.info/tx/#{txid}',
    addressLink: 'https://moneroblocks.info/#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.0001,
      minAmount: 0.01
    }
  },
  {
    id: 13,
    name: 'NEO',
    symbol: 'neo',
    feeSymbol: 'gas',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    assetId: '0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
    infoLink: 'https://coinmarketcap.com/currencies/neo',
    txLink: 'https://neoscan.io/transaction/#{txid}',
    addressLink: 'https://neoscan.io/address/#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0,
      minAmount: 1
    }
  },
  {
    id: 14,
    name: 'Ethereum Classic',
    symbol: 'etc',
    feeSymbol: 'etc',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/ethereum-classic',
    txLink: 'http://etherhub.io/tx/#{txid}',
    addressLink: 'http://etherhub.io/addr/#{address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.01,
      minAmount: 0.02
    }
  },
  {
    id: 15,
    name: 'NEM',
    symbol: 'xem',
    feeSymbol: 'xem',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/nem',
    txLink: 'http://chain.nem.ninja/#/transfer/#{txid}',
    addressLink: 'http://chain.nem.ninja/#/account/#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 4,
      minAmount: 8
    }
  },
  {
    id: 16,
    name: 'GAS',
    symbol: 'gas',
    feeSymbol: 'gas',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    assetId: '0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
    infoLink: 'https://coinmarketcap.com/currencies/neo',
    txLink: 'https://neoscan.io/transaction/#{txid}',
    addressLink: 'https://neoscan.io/address/#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0,
      minAmount: 0.001
    }
  },
  {
    id: 17,
    name: 'Basic Attention Token',
    symbol: 'bat',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/basic-attention-token',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0x0d8775f648430679a709e98d2b0cb6250d2887ef?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 6,
      minAmount: 12
    }
  },
  {
    id: 18,
    name: 'OmiseGO',
    symbol: 'omg',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/omisego',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0xd26114cd6EE289AccF82350c8d8487fedB8A0C07?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.71,
      minAmount: 1.42
    }
  },
  {
    id: 19,
    name: 'Bitcoin Gold',
    symbol: 'btg',
    feeSymbol: 'btg',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/bitcoin-gold',
    txLink: 'https://explorer.bitcoingold.org/insight/tx/#{txid}',
    addressLink: 'https://explorer.bitcoingold.org/insight/address/#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.001,
      minAmount: 0.002
    }
  },
  {
    id: 20,
    name: 'Augur',
    symbol: 'rep',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/augur',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0x1985365e9f78359a9B6AD760e32412f4a445E862?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.2,
      minAmount: 0.4
    }
  },
  {
    id: 21,
    name: 'TrueUSD',
    symbol: 'tusd',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/trueusd',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0x0000000000085d4780B73119b644AE5ecd22b376?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 1.74,
      minAmount: 3.48
    }
  },
  {
    id: 22,
    name: 'Chainlink',
    symbol: 'link',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/chainlink',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.6,
      minAmount: 1.2
    }
  },
  {
    id: 23,
    name: '0X',
    symbol: 'zrx',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/0x',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0xe41d2489571d322189246dafa5ebde1f4699f498?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 5.9,
      minAmount: 11.8
    }
  },
  {
    id: 24,
    name: 'Bitcoin Diamond',
    symbol: 'bcd',
    feeSymbol: 'bcd',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/bitcoin-diamond',
    txLink: 'http://explorer.btcd.io/#/TX?TX=#{txid}',
    addressLink: 'http://explorer.btcd.io/#/address?address=#{address}',
    caseSensitive: true,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.01,
      minAmount: 0.02
    }
  },
  {
    id: 25,
    name: 'Dent',
    symbol: 'dent',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/dent',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0x3597bfd533a99c9aa083587b074434e61eb0a258?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 1200,
      minAmount: 2400
    }
  },
  {
    id: 26,
    name: 'Crypto.com',
    symbol: 'mco',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 100000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/crypto-com',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0xb63b606ac810a52cca15e44bb630fd42d8d1d83d?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.31,
      minAmount: 0.62
    }
  },
  {
    id: 27,
    name: 'StatusNetwork',
    symbol: 'snt',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/status',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0x744d70fdbe2ba4cf95131626614a1763df805b9e?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 65,
      minAmount: 130
    }
  },
  {
    id: 28,
    name: 'USD Coin',
    symbol: 'usdc',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 6,
    baseFactor: 1000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/usd-coin',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 1.75,
      minAmount: 3.5
    }
  },
  {
    id: 29,
    name: 'DGD',
    symbol: 'dgd',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/digixdao',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0xe0b7927c4af23765cb51314a0e0521a9645f0e2a?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.07,
      minAmount: 0.14
    }
  },
  {
    id: 30,
    name: 'StableUSD',
    symbol: 'usds',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 6,
    baseFactor: 1000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/stableusd',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0xa4bdb11dc0a2bec88d24a3aa1e6bb17201112ebe?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0.64,
      minAmount: 1.28
    }
  },
  {
    id: 31,
    name: 'Decentraland',
    symbol: 'mana',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://coinmarketcap.com/currencies/decentraland',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0x0f5d2fb29fb7d3cfee444a200298f468908cc942?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 36,
      minAmount: 72
    }
  },
  {
    id: 32,
    name: 'Binance Coin',
    symbol: 'bnb',
    feeSymbol: 'eth',
    type: 'coin',
    precision: 8,
    baseFactor: 1000000000000000000,
    minConfirm: 1,
    maxConfirm: 3,
    infoLink: 'https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    txLink: 'https://etherscan.io/tx/#{txid}',
    addressLink: 'https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52?a={address}',
    caseSensitive: false,
    visible: false,
    deposit: {
      fee: 0,
      minAmount: 0
    },
    withdraw: {
      fee: 0,
      minAmount: 0
    }
  }
]
