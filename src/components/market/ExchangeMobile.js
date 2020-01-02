import React from 'react'
import { connect } from 'react-redux'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Col, Input, Radio, Row, Spin, Tabs } from 'antd'
import _ from 'lodash'
import { getAuthStatus } from '../../appRedux/actions/User'
import { MARKETS } from '../../constants/Markets'
import MarketBoardMobile from '../../components/market/MarketBoardMobile'
import TradeChart from '../../components/market/TradeChart'
import TradeDepth from '../../components/market/TradeDepth'
import OrderEntry from '../../components/market/OrderEntry'
import { convertToDate, getQuoteUnits, isStableCoin } from '../../util/helpers'
import { ORDER_BUY, ORDER_SELL, SOCKET_URL, STABLE_SYMBOL } from '../../constants/AppConfigs'
import { getOrderHistory } from '../../api/axiosAPIs'
import OrderBook from './OrderBook'
import SimpleTradeHistory from './SimpleTradeHistory'
import OpenOrdersTable from './OpenOrdersTable'

const Search = Input.Search
const TabPane = Tabs.TabPane

class ExchangeMobile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      trades: [],
      lastTrade: 0,
      lastPrice: 0,
      asks: [],
      bids: [],
      openOrders: [],
      orders24h: [],
      marketId: null,
      market: null,
      tickers: {},
      filter: '',
      yours: false,
      term: '',
      chartMode: true,
      yoursMode: false,
      myOrdersTabKey: 'open.order',
      authStatus: false,
      mobileTab: 'charts',
      orderMode: 'buy'
    }
    // Get Quote Units
    this.quoteUnits = getQuoteUnits(true)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, authStatus, tickers} = nextProps
    if ((authStatus !== prevState.authStatus)
      || (loader !== prevState.loader)
      || (!_.isEmpty(tickers) && tickers !== prevState.tickers)) {
      return {authStatus, loader, tickers}
    }
    return null
  }

  componentDidMount() {
    let marketId = this.props.marketId
    if (!_.isEmpty(marketId) && !_.isUndefined(marketId)) {
      this.initMarket(marketId)
    }
    this.fetchOpenOrders()
    this.fetch24hOrders()
  }

  initMarket = (marketId) => {
    let market = MARKETS.find(market => market.id === marketId)
    this.setState({market, marketId, asks: [], bids: [], trades: [], lastTrade: 0, lastPrice: 0})
    const wsClient = new ReconnectingWebSocket(`${SOCKET_URL}/${marketId}`)
    wsClient.onmessage = event => {
      this.handleSocketEvent(event)
    }
  }

  onChangeMobileTab = (value) => {
    this.setState({
      mobileTab: value
    })
  }

  handleOrderMode = (e) => {
    this.setState({
      orderMode: e.target.value
    })
  }

  onSelectMarket = (market) => {
    this.initMarket(market)
    this.props.onSelectMarket(market)
  }

  handleSocketEvent(event) {
    if (_.isEmpty(event) || _.isEmpty(event.data)) {
      return
    }

    const message = JSON.parse(event.data)
    if (message.market.toLowerCase() !== this.state.marketId.toLowerCase()) {
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

  handleFilterMarket = e => {
    this.setState({filter: e.target.value})
  }

  handleMarketSearch = value => {
    this.setState({term: value})
  }

  handleChartMode = e => {
    this.setState({chartMode: e.target.value})
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

  render() {
    const {intl} = this.props
    const {loader, authStatus, tickers, market, marketId, asks, bids, trades, userTrades, openOrders, orders24h, filter, term, chartMode, yoursMode, myOrdersTabKey} = this.state

    let ticker = {}
    if (!_.isEmpty(tickers) && market) {
      if (tickers.hasOwnProperty(market.id))
        ticker = tickers[market.id].ticker
    }

    let filteredMarkets = MARKETS
    if (!_.isEmpty(filter)) {
      filteredMarkets = filteredMarkets.filter(market => {
        const quoteUnit = market.quoteUnit
        if (filter.includes(STABLE_SYMBOL)) {
          return isStableCoin(quoteUnit)
        } else {
          return quoteUnit.toLowerCase().includes(filter.toLowerCase())
        }
      })
    }

    if (term !== undefined && term.length) {
      filteredMarkets = filteredMarkets.filter(market => {
        return market.name.toLowerCase().includes(term.toLowerCase())
      })
    }

    const curMarket = MARKETS.find(market => market.id === marketId)
    if (_.isEmpty(curMarket)) {
      return ''
    }

    return (
      <Spin spinning={loader} size="large">
        <MarketBoardMobile
          onSelectMarket={this.onSelectMarket}
          market={market}
          ticker={ticker}
        />
        <Tabs className="gx-mt-2 gx-mb-4"
              size='small'
              onChange={this.onChangeMobileTab}
              activeKey={this.state.mobileTab}>
          <TabPane
            key={'charts'}
            tab='Chart'>
            <Radio.Group size='small' value={chartMode} onChange={this.handleChartMode}>
              <Radio.Button value={true}>Original</Radio.Button>
              <Radio.Button value={false}>Depth</Radio.Button>
            </Radio.Group>
            {chartMode ?
              <TradeChart
                market={market}
              />
              :
              <TradeDepth
                market={market}
                asks={asks}
                bids={bids}
              />
            }
          </TabPane>
          <TabPane
            key={'trade'}
            tab={intl.formatMessage({id: 'trade'})}>
            <Row type='flex' gutter={3} className='gx-mt-3'>
              <Col span={12}>
                <Radio.Group size='small' value={this.state.orderMode} onChange={this.handleOrderMode}>
                  <Radio.Button value={'buy'}><FormattedMessage id='buy'/> {market.baseUnit.toUpperCase()}
                  </Radio.Button>
                  <Radio.Button value={'sell'}><FormattedMessage id='sell'/> {market.baseUnit.toUpperCase()}
                  </Radio.Button>
                </Radio.Group>
                {this.state.orderMode === 'buy' ?
                  <OrderEntry
                    kind={ORDER_BUY}
                    authStatus={authStatus}
                    market={market}
                    small={true}
                    lastPrice={_.isEmpty(ticker) ? 0 : ticker.last}
                  />
                  :
                  <OrderEntry
                    kind={ORDER_SELL}
                    authStatus={authStatus}
                    market={market}
                    small={true}
                    lastPrice={_.isEmpty(ticker) ? 0 : ticker.last}
                  />
                }
              </Col>
              <Col span={12}>
                <OrderBook
                  asks={asks}
                  bids={bids}
                  ticker={ticker}
                  market={market}
                  small={true}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane
            key={'orders'}
            tab={intl.formatMessage({id: 'open.orders'})}>
            <OpenOrdersTable
              dataSource={openOrders}
              pagination={false}
              marketId={marketId}
            />
          </TabPane>

          <TabPane
            key={'history'}
            tab={intl.formatMessage({id: 'trade.history'})}>
            <SimpleTradeHistory
              trades={trades}
              market={market}
              yours={false}
            />
          </TabPane>
        </Tabs>

      </Spin>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ExchangeMobile))
