import React from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getAuthStatus } from '../appRedux/actions/User'
import SimpleTradeHistoryTable from './SimpleTradeHistoryTable'

class SimpleTradeHistory extends React.Component {
  constructor(props) {
    super(props)

    const to = new Date()
    const from = new Date(to.getTime() - (7 * 24 * 60 * 60 * 1000))

    this.state = {
      authStatus: false
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const {loader} = nextProps
  //   if (loader !== prevState.loader) {
  //     return {loader}
  //   }
  //   return null
  // }

  render() {
    const {trades, myTrades, yours, market} = this.props
    let prevTrade = {}
    let data = []
    if (yours && !_.isEmpty(myTrades)) {
      for (let i = 0; i < myTrades.length; i++) {
        let trade = myTrades[i]
        prevTrade = (i < myTrades.length - 1) ? myTrades[i + 1] : trade
        let date = new Date(trade.at * 1000)
        let strDate = ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
          ('0' + date.getDate()).slice(-2) + ' ' +
          ('0' + date.getHours()).slice(-2) + ':' +
          ('0' + date.getMinutes()).slice(-2)
        data.push({
          id: trade.id,
          price: trade.price,
          volume: trade.volume,
          date: strDate,
          trend: trade.price - prevTrade.price
        })
      }
    } else if (!_.isEmpty(trades)) {
      for (let i = trades.length; i-- > 0;) {
        let trade = trades[i]
        prevTrade = (i < trades.length - 1) ? trades[i + 1] : trade
        let date = new Date(trade.date * 1000)
        let strDate = ('0' + date.getHours()).slice(-2) + ':' +
          ('0' + date.getMinutes()).slice(-2) + ':' +
          ('0' + date.getSeconds()).slice(-2)
        data.unshift({
          id: trade.tid,
          price: trade.price,
          volume: trade.amount,
          date: strDate,
          trend: trade.price - prevTrade.price
        })
      }
    }

    return (
      <div>
        <SimpleTradeHistoryTable
          data={data}
          market={market}
        />
      </div>
    )
  }
}

// const mapDispatchToProps = {
//   getAuthStatus
// }
//
// const mapStateToProps = ({user}) => {
//   return {
//     authStatus: user
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SimpleTradeHistory))
export default injectIntl(SimpleTradeHistory)