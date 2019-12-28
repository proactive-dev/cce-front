import React, { Fragment } from 'react'
import { Radio } from 'antd'
import _ from 'lodash'
import OrderBookTable from './OrderBookTable'
import OrderLast from './OrderLast'
import { getFixed } from '../../util/helpers'

const VIEW_BID = 1
const VIEW_ASK = 2
const VIEW_ALL = 3

class OrderBook extends React.Component {

  constructor(props) {
    super(props)
    this.prevData = null
    this.state = {
      viewMode: VIEW_ALL
    }
  }

  handleChangeViewMode = (e) => {
    this.setState({viewMode: e.target.value})
  }

  render() {
    const {market, asks, bids, ticker} = this.props
    const {viewMode} = this.state

    if (!market || _.isEmpty(ticker))
      return ''

    const last = !_.isEmpty(ticker) ? getFixed(parseFloat(ticker.last), market.bid.fixed) : 0
    const lastTrend = this.prevData ? last - this.prevData : 0
    this.prevData = last
    return (
      <div>
        <Radio.Group size='small' value={viewMode} onChange={this.handleChangeViewMode}>
          <Radio.Button value={VIEW_ALL}>
            <img alt="loader" src={require(`assets/images/icon-bid-ask.svg`)}/>
          </Radio.Button>
          <Radio.Button value={VIEW_BID}>
            <img alt="loader" src={require(`assets/images/icon-bid.svg`)}/>
          </Radio.Button>
          <Radio.Button value={VIEW_ASK}>
            <img alt="loader" src={require(`assets/images/icon-ask.svg`)}/>
          </Radio.Button>
        </Radio.Group>

        {(viewMode === VIEW_BID) && (
          <Fragment>
            <OrderLast
              trend={lastTrend}
              value={last}
            />
            <OrderBookTable
              orders={bids}
              market={market}
              isBuy={true}
              showHeader={true}
              limitCount={30}
            />
          </Fragment>
        )}
        {(viewMode === VIEW_ASK) && (
          <Fragment>
            <OrderBookTable
              orders={asks}
              market={market}
              showHeader={true}
              limitCount={30}
            />
            <OrderLast
              trend={lastTrend}
              value={last}
            />
          </Fragment>
        )}
        {(viewMode === VIEW_ALL) && (
          <Fragment>
            <OrderBookTable
              orders={asks}
              market={market}
              limitCount={15}
              showHeader={true}
            />
            <OrderLast
              trend={lastTrend}
              value={last}
            />
            <OrderBookTable
              orders={bids}
              market={market}
              isBuy={true}
              limitCount={15}
              showHeader={false}
            />
          </Fragment>
        )}
      </div>
    )
  }
}

export default OrderBook
