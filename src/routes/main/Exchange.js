import React from 'react'
import { connect } from 'react-redux'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { injectIntl } from 'react-intl'
import _ from 'lodash'
import { isMobile } from 'react-device-detect'
import { convertToDate } from '../../util/helpers'
import { SOCKET_URL } from '../../constants/AppConfigs'
import { EXCHANGE } from '../../constants/Paths'
import { MARKETS } from '../../constants/Markets'
import { getOrderHistory } from '../../api/axiosAPIs'
import { getAuthStatus } from '../../appRedux/actions/User'
import ExchangeDesktop from '../../components/market/ExchangeDesktop'
import ExchangeMobile from '../../components/market/ExchangeMobile'

class Exchange extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      authStatus: false,
      trades: [],
      lastTrade: 0,
      lastPrice: 0,
      asks: [],
      bids: [],
      openOrders: [],
      orders24h: [],
      market: null,
      tickers: {},
      yours: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, authStatus, tickers} = nextProps
    if ((authStatus !== prevState.authStatus)
      || (loader !== prevState.loader)
      || (!_.isEmpty(tickers) && (tickers !== prevState.tickers))) {
      return {authStatus, loader, tickers}
    }
    return null
  }

  componentDidMount() {
    let marketId = this.props.match.params.market
    if (!_.isEmpty(marketId) && !_.isUndefined(marketId)) {
      this.initMarket(marketId)
    }
    this.refreshOrders()
  }

  initMarket = (marketId) => {
    let market = MARKETS.find(market => market.id === marketId)
    this.setState({market, asks: [], bids: [], trades: [], lastTrade: 0, lastPrice: 0})
    const wsClient = new ReconnectingWebSocket(`${SOCKET_URL}/${marketId}`)
    wsClient.onmessage = event => {
      this.handleSocketEvent(event)
    }
  }

  onSelectMarket = (market) => {
    this.initMarket(market)
    this.props.history.push(`/${EXCHANGE}/${market}`)
  }

  handleSocketEvent(event) {
    if (_.isEmpty(event) || _.isEmpty(event.data)) {
      return
    }

    const message = JSON.parse(event.data)
    if (message.market.toLowerCase() !== this.state.market.id.toLowerCase()) {
      return
    }

    if ('trade' in message) {
      // Process trade
      const record = message.trade
      const {trades, lastTrade} = this.state
      if (record.tid <= lastTrade) {
        return
      }
      trades.unshift(record)
      if (trades.length >= 50) {
        trades.pop()
      }
      this.setState({trades: trades, lastPrice: record.price, lastTrade: record.tid})
    } else if ('trades' in message) {
      // process trades
      const trades = message.trades
      if (!_.isEmpty(trades)) {
        this.setState({trades: trades, lastPrice: trades[0].price, lastTrade: trades[0].tid})
      }
    } else if ('asks' in message) {
      // process asks
      this.setState({asks: message.asks})
    } else if ('bids' in message) {
      // process bids
      this.setState({bids: message.bids})
    } else {
    }
  }

  fetchOrders = (search, isOpenOrders = true) => {
    getOrderHistory({page: 1, perPage: 5, search})
      .then(response => {
        const {orders} = response.data
        let orderData = []
        for (let i = 0; i < orders.length; i++) {
          let order = orders[i]
          let market = MARKETS.find(item => item.id === order.market)
          if (market) {
            order.marketName = market.name
            order.priceFixed = market.bid.fixed
            order.amountFixed = market.ask.fixed
          }
          orderData.push(order)
        }
        if (isOpenOrders) {
          this.setState({openOrders: orderData})
        } else {
          this.setState({orders24h: orderData})
        }
      })
  }

  fetchOpenOrders = () => {
    let search = 'state=100'
    this.fetchOrders(search)
  }

  fetch24hOrders = (market = null) => {
    let to = new Date()
    let from = new Date(to.getTime() - (24 * 60 * 60 * 1000))// 1 day ago
    from = convertToDate(from)
    to = convertToDate(to)

    let search = `created_at >= "${from} 00:00:00" AND created_at <= "${to} 23:59:59"`
    if (market) {
      search = `${search} AND currency=${market}`
    }
    this.fetchOrders(search)
  }

  refreshOrders = () => {
    this.fetchOpenOrders()
    this.fetch24hOrders()
  }

  render() {
    const {loader, authStatus, tickers, market, asks, bids, trades, openOrders, orders24h} = this.state

    let ticker = {}
    if (!_.isEmpty(tickers) && market) {
      if (tickers.hasOwnProperty(market.id))
        ticker = tickers[market.id].ticker
    }

    if (_.isEmpty(market)) {
      return ''
    }

    return isMobile ?
      <ExchangeMobile
        market={market}
        loader={loader}
        authStatus={authStatus}
        ticker={ticker}
        asks={asks}
        bids={bids}
        trades={trades}
        openOrders={openOrders}
        onSelectMarket={this.onSelectMarket}
        onRefresh={this.refreshOrders}
      />
      :
      <ExchangeDesktop
        market={market}
        loader={loader}
        authStatus={authStatus}
        tickers={tickers}
        ticker={ticker}
        asks={asks}
        bids={bids}
        trades={trades}
        openOrders={openOrders}
        orders24h={orders24h}
        onSelectMarket={this.onSelectMarket}
        onRefresh={this.refreshOrders}
      />
  }
}

const mapDispatchToProps = dispatch => ({
  getAuthStatus
})

const mapStateToProps = ({progress, user, markets}) => {
  return {
    loader: progress.loader,
    authStatus: user.authStatus,
    tickers: markets.tickers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Exchange))
