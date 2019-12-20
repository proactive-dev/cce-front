import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { priceChange } from '../util/helpers'
import { Typography, Col, Row } from 'antd'
import _ from 'lodash'
import { getFixed } from '../util/helpers'

const {Text} = Typography
class MarketBoard extends React.Component {
  constructor(props) {
    super(props)

    this.prevData = null
  }

  render() {
    const {intl, market, ticker} = this.props

    if(!market || _.isEmpty(market))
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
        <Row type='flex'>
          <Col span={4}>
              <span className='gx-fs-xl gx-text-black gx-font-weight-bold'>{market.baseUnit.toUpperCase()}</span>
              <Text> / {market.quoteUnit.toUpperCase()}</Text>
          </Col>

          <Col span={4}>
            <FormattedMessage id="last.price"/>
            <div className={lastClassName + ' gx-font-weight-bold'}>
              {getFixed(last, market.bid.fixed)}
            </div>
          </Col>

          <Col span={4}>
            <FormattedMessage id="24h.change"/>
            <div className={changeClassName + ' gx-font-weight-bold'}>
              {change.toFixed(market.bid.fixed)}&nbsp;&nbsp;
              {change > 0 && '+'}
              {changePercent.toFixed(2)}%
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

      </div>
    )
  }
}

export default injectIntl(MarketBoard)
