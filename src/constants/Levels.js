import {KEY_COIN_SYMBOL, EX_COIN_SYMBOL} from './AppConfigs'

export const LEVELS = [
  {
    id: 0,
    key: 'General',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 0
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.24,
      holding: 0.24
    },
    taker: {
      normal: 0.24,
      holding: 0.24
    }
  },
  {
    id: 1,
    key: 'VIP 1',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 50
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.21,
      holding: 0.21
    },
    taker: {
      normal: 0.21,
      holding: 0.21
    }
  },
  {
    id: 2,
    key: 'VIP 2',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 250
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.19,
      holding: 0.19
    },
    taker: {
      normal: 0.2,
      holding: 0.2
    }
  },
  {
    id: 3,
    key: 'VIP 3',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 2250
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.18,
      holding: 0.18
    },
    taker: {
      normal: 0.19,
      holding: 0.19
    }
  },
  {
    id: 4,
    key: 'VIP 4',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 5000
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.17,
      holding: 0.17
    },
    taker: {
      normal: 0.19,
      holding: 0.19
    }
  },
  {
    id: 5,
    key: 'VIP 5',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 10000
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.16,
      holding: 0.16
    },
    taker: {
      normal: 0.18,
      holding: 0.18
    }
  },
  {
    id: 6,
    key: 'VIP 6',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 20000
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.15,
      holding: 0.15
    },
    taker: {
      normal: 0.17,
      holding: 0.17
    }
  },
  {
    id: 7,
    key: 'VIP 7',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 40000
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.14,
      holding: 0.14
    },
    taker: {
      normal: 0.16,
      holding: 0.16
    }
  },
  {
    id: 8,
    key: 'VIP 8',
    trade: {
      currency: KEY_COIN_SYMBOL,
      amount: 75000
    },
    holding: {
      currency: EX_COIN_SYMBOL,
      amount: 0
    },
    maker: {
      normal: 0.13,
      holding: 0.13
    },
    taker: {
      normal: 0.15,
      holding: 0.15
    }
  }
]
