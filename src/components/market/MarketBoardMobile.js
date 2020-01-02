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
      <div>
        <Row type="flex" gutter={10} className='gx-align-items-center'>
          <Col>
            <MarketSelector
              value={market.id}
              onChange={this.onSelectMarket}
            />
          </Col>
          <Col>
            <div className={`${lastClassName} gx-fs-xl gx-font-weight-bold`}>
              {getFixed(last, market.bid.fixed)}
            </div>
          </Col>
        </Row>
        <Row type="flex" className='gx-mt-2 gx-align-items-center'>
          <Col span={12}>
            <div className={`${changeClassName} gx-font-weight-bold`}>
              {getFixed(change, market.bid.fixed)}&nbsp;
              {change > 0 && '+'}
              {getPointFixed(changePercent)}%
            </div>
            <div className='gx-font-weight-bold gx-text-black'>
              Vol {getFixed(ticker.vol, market.bid.fixed)}&nbsp;
            </div>
          </Col>
          <Col span={12}>
            <div className='gx-font-weight-bold gx-text-black gx-text-right'>
              Low {getFixed(ticker.low, market.bid.fixed)}
            </div>
            <div className='gx-font-weight-bold gx-text-black gx-text-right'>
              High {getFixed(ticker.high, market.bid.fixed)}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default injectIntl(MarketBoardMobile)
