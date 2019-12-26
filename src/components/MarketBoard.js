import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getFixed, getPointFixed, priceChange } from '../util/helpers'
import { Col, Row } from 'antd'

class MarketBoard extends React.Component {
  constructor(props) {
    super(props)

    this.prevData = null
  }

  render() {
    const {market, ticker} = this.props
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
      <Row type="flex" className='gx-align-items-center'>
        <Col span={4}>
          <span className='h2'>{market.baseUnit.toUpperCase()}</span>
          &nbsp;/&nbsp;{market.quoteUnit.toUpperCase()}
        </Col>
        <Col span={4}>
          <FormattedMessage id="last.price"/>
          <div className={`${lastClassName} gx-font-weight-bold`}>
            {getFixed(last, market.bid.fixed)}
          </div>
        </Col>
        <Col span={4}>
          <FormattedMessage id="24h.change"/>
          <div className={`${changeClassName} gx-font-weight-bold`}>
            {getFixed(change, market.bid.fixed)}&nbsp;
            {change > 0 && '+'}
            {getPointFixed(changePercent)}%
          </div>
        </Col>
        <Col span={4}>
          <FormattedMessage id="24h.high"/>
          <div className='gx-font-weight-bold gx-text-black'>
            {getFixed(ticker.high, market.bid.fixed)}
          </div>
        </Col>
        <Col span={4}>
          <FormattedMessage id="24h.low"/>
          <div className='gx-font-weight-bold gx-text-black'>
            {getFixed(ticker.low, market.bid.fixed)}
          </div>
        </Col>
        <Col span={4}>
          <FormattedMessage id="24h.volume"/>
          <div className='gx-font-weight-bold gx-text-black'>
            {getFixed(ticker.vol, market.bid.fixed)}&nbsp;
          </div>
        </Col>
      </Row>
    )
  }
}

export default injectIntl(MarketBoard)
