import React from 'react'
import { injectIntl } from 'react-intl'
import { getFixed, getPointFixed, priceChange } from '../../util/helpers'
import { Col, Row } from 'antd'
import MarketSelector from '../../components/market/MarketSelector'

class MarketBoardMobile extends React.Component {
  constructor(props) {
    super(props)

    this.prevData = null
  }

  onSelectMarket = (id) => {
    this.props.onSelectMarket(id)
  }

  render() {
    const {intl, market, ticker} = this.props
    if (!market)
      return ''

    const open = parseFloat(ticker.open)
    const last = parseFloat(ticker.last)
    const changePercent = priceChange(open, last)
    const change = last - open
    const lastTrend = this.prevData ? last - this.prevData : 0
    this.prevData = last

    let lastClassName = 'gx-text-black'
    if (lastTrend > 0) {
      lastClassName = 'gx-text-green'
    } else if (lastTrend < 0) {
      lastClassName = 'gx-text-red'
    }

    let changeClassName = 'gx-text-black'
    if (change > 0) {
      changeClassName = 'gx-text-green'
    } else if (change < 0) {
      changeClassName = 'gx-text-red'
    }
    return (
      <div>
        <Row type="flex" className='gx-align-items-center'>
          <Col className='gx-m-2'>
            <MarketSelector
              value={market}
              onChange={this.onSelectMarket}
            />
          </Col>
          <Col className={`${lastClassName} gx-fs-lg`}>
            {getFixed(last, market.bid.fixed)}
          </Col>
        </Row>
        <Row type="flex" className='gx-mt-2 gx-mb-3'>
          <Col span={12}>
            <div className={`${changeClassName}`}>
              {getFixed(change, market.bid.fixed)}&nbsp;
              {change > 0 && '+'}
              {getPointFixed(changePercent)}%
            </div>
            <div>
              {intl.formatMessage({id: 'volume'})} {getFixed(ticker.vol, market.bid.fixed)}&nbsp;
            </div>
          </Col>
          <Col span={12} className='gx-text-right'>
            <div>
              {intl.formatMessage({id: 'low'})} {getFixed(ticker.low, market.bid.fixed)}
            </div>
            <div>
              {intl.formatMessage({id: 'high'})} {getFixed(ticker.high, market.bid.fixed)}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default injectIntl(MarketBoardMobile)
