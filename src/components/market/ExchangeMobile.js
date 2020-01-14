import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Col, Radio, Row, Spin, Tabs } from 'antd'
import _ from 'lodash'
import { ORDER_BUY, ORDER_SELL } from '../../constants/AppConfigs'
import MarketBoardMobile from '../../components/market/MarketBoardMobile'
import TradeChart from '../../components/market/TradeChart'
import TradeDepth from '../../components/market/TradeDepth'
import OrderEntry from '../../components/market/OrderEntry'
import OrderBook from './OrderBook'
import SimpleTradeHistory from './SimpleTradeHistory'
import OpenOrdersTable from './OpenOrdersTable'

const TabPane = Tabs.TabPane

class ExchangeMobile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chartMode: true,
      mobileTab: 'charts',
      orderMode: 'buy'
    }
  }

  onChangeMobileTab = (value) => {
    this.setState({mobileTab: value})
  }

  handleOrderMode = (e) => {
    this.setState({orderMode: e.target.value})
  }

  handleChartMode = e => {
    this.setState({chartMode: e.target.value})
  }

  render() {
    const {intl, loader, authStatus, market, ticker, asks, bids, trades, openOrders} = this.props
    const {chartMode, mobileTab, orderMode} = this.state

    return (
      <Spin spinning={loader} size="large">
        <MarketBoardMobile
          onSelectMarket={this.props.onSelectMarket}
          market={market}
          ticker={ticker}
        />
        <Tabs
          className="gx-mt-2 gx-mb-4"
          size='small'
          onChange={this.onChangeMobileTab}
          activeKey={mobileTab}>
          <TabPane
            key={'charts'}
            tab={intl.formatMessage({id: 'chart'})}>
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
          </TabPane>
          <TabPane
            key={'trade'}
            tab={intl.formatMessage({id: 'trade'})}>
            <Row type='flex' gutter={3} className='gx-mt-3'>
              <Col span={12}>
                <Radio.Group size='small' value={orderMode} onChange={this.handleOrderMode}>
                  <Radio.Button value={'buy'}>
                    <FormattedMessage id='buy'/> {market.baseUnit.toUpperCase()}
                  </Radio.Button>
                  <Radio.Button value={'sell'}>
                    <FormattedMessage id='sell'/> {market.baseUnit.toUpperCase()}
                  </Radio.Button>
                </Radio.Group>
                {orderMode === 'buy' ?
                  <OrderEntry
                    kind={ORDER_BUY}
                    authStatus={authStatus}
                    market={market}
                    isSmall={true}
                    lastPrice={_.isEmpty(ticker) ? 0 : ticker.last}
                    onRefresh={this.props.onRefresh}
                  />
                  :
                  <OrderEntry
                    kind={ORDER_SELL}
                    authStatus={authStatus}
                    market={market}
                    isSmall={true}
                    lastPrice={_.isEmpty(ticker) ? 0 : ticker.last}
                    onRefresh={this.props.onRefresh}
                  />
                }
              </Col>
              <Col span={12}>
                <OrderBook
                  asks={asks}
                  bids={bids}
                  ticker={ticker}
                  market={market}
                  isSmall={true}
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
              marketId={market.id}
              onRefresh={this.props.onRefresh}
            />
          </TabPane>
          <TabPane
            key={'history'}
            tab={intl.formatMessage({id: 'trade.history'})}>
            <SimpleTradeHistory
              trades={trades}
              market={market}
              yours={false}
              showHeader={true}
              timestamp={Date.now()}
            />
          </TabPane>
        </Tabs>
      </Spin>
    )
  }
}

export default injectIntl(ExchangeMobile)
