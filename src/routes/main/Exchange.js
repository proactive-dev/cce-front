import React from 'react'
import { connect } from 'react-redux'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Card, Col, Input, Radio, Row, Spin, Tabs } from 'antd'
import _ from 'lodash'
import { getAuthStatus } from '../../appRedux/actions/User'
import { MARKETS } from '../../constants/Markets'
import MarketBoard from '../../components/market/MarketBoard'
import MarketOverview from '../../components/market/MarketOverview'
import OrderBook from '../../components/market/OrderBook'
import TradeChart from '../../components/market/TradeChart'
import TradeDepth from '../../components/market/TradeDepth'
import OrderEntry from '../../components/market/OrderEntry'
import { convertToDate, getQuoteUnits, isStableCoin } from '../../util/helpers'
import SimpleTradeHistory from '../../components/market/SimpleTradeHistory'
import OpenOrdersTable from '../../components/market/OpenOrdersTable'
import OrderHistoryTable from '../../components/market/OrderHistoryTable'
import { ORDER_BUY, ORDER_SELL, SOCKET_URL, STABLE_SYMBOL } from '../../constants/AppConfigs'
import { EXCHANGE } from '../../constants/Paths'
import { getOrderHistory } from '../../api/axiosAPIs'

const Search = Input.Search
const TabPane = Tabs.TabPane

class Exchange extends React.Component {
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
      authStatus: false
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
    let marketId = this.props.match.params.market
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

  onSelectMarket = (market) => {
    this.initMarket(market)
    this.props.history.push(`/${EXCHANGE}/${market}`)
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

  handleYoursMode = e => {
    this.setState({yoursMode: e.target.value})
  }

  handleMarketSearch = value => {
    this.setState({term: value})
  }

  handleChartMode = e => {
    this.setState({chartMode: e.target.value})
  }

  onChangeKind = activeKey => {
    this.setState({myOrdersTabKey: activeKey})
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
        <Row type='flex' gutter={3}>
          <Col span={18}>
            <MarketBoard
              market={market}
              ticker={ticker}
            />
            <Row type='flex' gutter={3} className='gx-mt-3'>
              <Col span={8}>
                <Card size="small" className="gx-h-100">
                  <OrderBook
                    asks={asks}
                    bids={bids}
                    ticker={ticker}
                    market={market}
                  />
                </Card>
              </Col>
              <Col span={16}>
                <Card size='small'>
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
                </Card>
                <Row type='flex' gutter={3}>
                  <Col span={12}>
                    <Card size='small'>
                      <OrderEntry
                        kind={ORDER_BUY}
                        authStatus={authStatus}
                        market={market}
                        lastPrice={_.isEmpty(ticker) ? 0 : ticker.last}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size='small'>
                      <OrderEntry
                        kind={ORDER_SELL}
                        authStatus={authStatus}
                        market={market}
                        lastPrice={_.isEmpty(ticker) ? 0 : ticker.last}
                      />
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={6} style={{display: 'flex', flexDirection: 'column'}}>
            <Card size="small">
              <div>
                <Radio.Group size='small' value={filter} onChange={this.handleFilterMarket}>
                  {
                    this.quoteUnits.map(quoteUnit => {
                      return (
                        <Radio.Button key={quoteUnit} value={quoteUnit}>
                          {_.isEmpty(quoteUnit) ? intl.formatMessage({id: 'all'}) : quoteUnit.toUpperCase()}
                        </Radio.Button>
                      )
                    })
                  }
                </Radio.Group>
                <Search
                  size='small'
                  className="gx-float-right"
                  placeholder={intl.formatMessage({id: 'search'})}
                  onSearch={this.handleMarketSearch}
                  style={{maxWidth: 120}}/>
              </div>
              <MarketOverview
                tickers={tickers}
                markets={filteredMarkets}
                onCellClick={this.onSelectMarket}
                simple={true}/>
            </Card>
            <Card size="small" style={{flex: '1 1 auto'}}>
              <div>
                <FormattedMessage id='latest.trades'/>
                <Radio.Group
                  className="gx-float-right"
                  size='small'
                  value={yoursMode}
                  onChange={this.handleYoursMode}>
                  <Radio.Button value={false}>
                    <FormattedMessage id='market'/>
                  </Radio.Button>
                  <Radio.Button value={true} disabled={!authStatus}>
                    <FormattedMessage id='yours'/>
                  </Radio.Button>
                </Radio.Group>
              </div>
              {!yoursMode &&
              <SimpleTradeHistory
                trades={trades}
                market={market}
                yours={yoursMode}
              />
              }
              {yoursMode && authStatus &&
              <SimpleTradeHistory
                myTrades={userTrades}
                market={market}
                yours={yoursMode}
              />
              }
            </Card>
          </Col>
        </Row>
        <Tabs
          className="gx-mt-2 gx-mb-4"
          size='small'
          onChange={this.onChangeKind}
          activeKey={myOrdersTabKey}>
          <TabPane
            key={'open.order'}
            tab={intl.formatMessage({id: 'open.orders'}) + ` (${openOrders.length})`}>
            <OpenOrdersTable
              dataSource={openOrders}
              pagination={false}
              marketId={marketId}
            />
          </TabPane>
          <TabPane
            key={'24h.order'}
            tab={intl.formatMessage({id: '24h.orders'})}>
            <OrderHistoryTable
              pagination={false}
              dataSource={orders24h}
              isSmall={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Exchange))
