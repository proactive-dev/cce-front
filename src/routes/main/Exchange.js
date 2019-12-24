import React from 'react'
import { connect } from 'react-redux'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Card, Col, Input, Radio, Row, Spin, Typography } from 'antd'
import _ from 'lodash'
import { getAuthStatus } from '../../appRedux/actions/User'
import { MARKETS } from '../../constants/Markets'
import MarketBoard from '../../components/MarketBoard'
import MarketOverview from '../../components/MarketOverview'
import OrderBook from '../../components/OrderBook/OrderBook'
import TradeChart from '../../components/TradeChart'
import TradeDepth from '../../components/TradeDepth'
import OrderEntry from '../../components/OrderEntry'
import { SOCKET_URL, STABLE_SYMBOL } from '../../constants/AppConfigs'
import { isStableCoin, removeDuplicates } from '../../util/helpers'
import SimpleTradeHistory from '../../components/SimpleTradeHistory'


const Search = Input.Search
const {Text} = Typography

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
      marketId: null,
      market: null,
      tickers: {},
      filter: '',
      yours: false,
      term: '',
      chartMode: true
    }
    // Get Guote Units
    let quoteUnits = MARKETS.map(market => market.quoteUnit)
    quoteUnits = removeDuplicates(quoteUnits)
    quoteUnits.unshift('')
    // Collect Stable coin markets to USD.
    quoteUnits = quoteUnits.filter(quoteUnit => !isStableCoin(quoteUnit))
    quoteUnits.push(`usd${STABLE_SYMBOL}`)
    this.quoteUnits = quoteUnits
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, tickers} = nextProps
    if ((loader !== prevState.loader) || (!_.isEmpty(tickers) && tickers !== prevState.tickers)) {
      return {loader, tickers}
    }
    return null
  }

  componentDidMount() {
    // this.props.getAuthStatus()
    let marketId = this.props.match.params.market
    if (!_.isEmpty(marketId) && !_.isUndefined(marketId)) {
      this.onSelectMarket(marketId)
    }
  }

  onSelectMarket = (marketId) => {
    let market = MARKETS.find(market => market.id === marketId)
    this.setState({market, marketId, asks: [], bids: [], trades: [], lastTrade: 0, lastPrice: 0})
    const wsClient = new ReconnectingWebSocket(`${SOCKET_URL}/${marketId}`)
    wsClient.onmessage = event => {
      this.handleSocketEvent(event)
    }
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
      this.setState({trades, lastPrice: record.price, lastTrade: record.tid})
    } else if ('trades' in message) {
      // process trades
      const trades = message.trades
      if (!_.isEmpty(trades)) {
        console.log(trades[0])
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

  handleYoursTrade = e => {
    this.setState({yours: e.target.value})
  }

  handleMarketSearch = value => {
    this.setState({term: value})
  }

  handleChartMode = e => {
    this.setState({chartMode: e.target.value})
  }

  render() {
    const {intl, markets} = this.props
    const {loader, tickers, market, marketId, asks, bids, trades, filter, term, chartMode, yours} = this.state
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
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="exchange"/></h1>
        <Spin spinning={loader} size="large">
          <Row type='flex' gutter={3}>
            <Col span={18}>
              <MarketBoard
                market={market}
                ticker={ticker}
              />
              <Row type='flex' gutter={3} className='gx-mt-3'>
                <Col span={8}>
                  <Card size="small">
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
                          kind="buy"
                          market={market}
                          lastPrice={_.isEmpty(ticker) ? 0 : ticker.last}
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card size='small'>
                        <OrderEntry
                          kind="sell"
                          market={market}
                          lastPrice={_.isEmpty(ticker) ? 0 : ticker.last}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <Card size="small">
                <div>
                  <Radio.Group size='small' value={filter} onChange={this.handleFilterMarket}>
                    {
                      this.quoteUnits.map(quoteUnit => {
                        return (
                          <Radio.Button value={quoteUnit}>
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
              <Card size="small">
                <div>
                  <FormattedMessage id='latest.trades'/>
                  <Radio.Group
                    className="gx-float-right"
                    size='small' value={yours} onChange={this.handleYoursTrade}>
                    <Radio.Button value={false}><FormattedMessage id='market'/></Radio.Button>
                    <Radio.Button value={true}><FormattedMessage id='yours'/></Radio.Button>
                  </Radio.Group>
                </div>
                <SimpleTradeHistory
                  trades={trades}
                  yours={yours}
                  market={market}/>
              </Card>
            </Col>
          </Row>

        </Spin>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({progress, markets}) => {
  return {
    loader: progress.loader,
    tickers: markets.tickers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Exchange))
