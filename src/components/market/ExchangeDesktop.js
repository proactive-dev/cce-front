import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Card, Col, Input, Radio, Row, Spin, Tabs } from 'antd'
import _ from 'lodash'
import { ORDER_BUY, ORDER_SELL, STABLE_SYMBOL } from '../../constants/AppConfigs'
import { MARKETS } from '../../constants/Markets'
import { getQuoteUnits, isStableCoin } from '../../util/helpers'
import MarketBoard from '../../components/market/MarketBoard'
import MarketOverview from '../../components/market/MarketOverview'
import OrderBook from '../../components/market/OrderBook'
import TradeChart from '../../components/market/TradeChart'
import TradeDepth from '../../components/market/TradeDepth'
import OrderEntry from '../../components/market/OrderEntry'
import SimpleTradeHistory from '../../components/market/SimpleTradeHistory'
import OpenOrdersTable from '../../components/market/OpenOrdersTable'
import OrderHistoryTable from '../../components/market/OrderHistoryTable'

const Search = Input.Search
const TabPane = Tabs.TabPane

class ExchangeDesktop extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: '',
      term: '',
      chartMode: true,
      yoursMode: false,
      myOrdersTabKey: 'open.order'
    }
    // Get Quote Units
    this.quoteUnits = getQuoteUnits(true)
  }

  handleFilterMarket = e => {
    this.setState({filter: e.target.value})
  }

  handleMarketSearch = value => {
    this.setState({term: value})
  }

  handleYoursMode = e => {
    this.setState({yoursMode: e.target.value})
  }

  handleChartMode = e => {
    this.setState({chartMode: e.target.value})
  }

  onChangeKind = activeKey => {
    this.setState({myOrdersTabKey: activeKey})
  }

  render() {
    const {intl, loader, authStatus, market, tickers, ticker, asks, bids, trades, openOrders, orders24h} = this.props
    const {filter, term, chartMode, yoursMode, myOrdersTabKey} = this.state

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
                    <Radio.Button value={true}>{intl.formatMessage({id: 'original'})}</Radio.Button>
                    <Radio.Button value={false}>{intl.formatMessage({id: 'depth'})}</Radio.Button>
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
                        onRefresh={this.props.onRefresh}
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
                        onRefresh={this.props.onRefresh}
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
                onCellClick={this.props.onSelectMarket}
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
              marketId={market.id}
              onRefresh={this.props.onRefresh}
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

export default injectIntl(ExchangeDesktop)
