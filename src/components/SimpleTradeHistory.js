import React from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import _ from 'lodash'
import { getAuthStatus } from '../appRedux/actions/User'
import SimpleTradeHistoryTable from './SimpleTradeHistoryTable'
import { getTradeHistory } from '../api/axiosAPIs'
import { MARKETS } from '../constants/Markets'
import { USER_TRADE_HISTORY_INTERVAL } from '../constants/AppConfigs'

class SimpleTradeHistory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authStatus: false,
      userTrades: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {authStatus} = nextProps
    if (authStatus !== prevState.authStatus) {
      return {authStatus}
    }
    return null
  }

  componentDidMount() {
    const {yours} = this.props
    if (yours) {
      let that = this
      setInterval(function () {
        that.fetchTradeHistoryData()
      }, USER_TRADE_HISTORY_INTERVAL)
      this.fetchTradeHistoryData()
    }
  }

  fetchTradeHistoryData = () => {
    const {authStatus} = this.state
    if (authStatus) {
      const {market} = this.props
      let search = market ? `currency=${market.code}` : ''
      getTradeHistory({page: 1, perPage: 100, search}, false)
        .then(response => {
          const {trades} = response.data
          let tradeData = []
          for (let i = 0; i < trades.length; i++) {
            let trade = trades[i]
            let market = MARKETS.find(item => item.id === trade.market)
            if (market) {
              trade.marketName = market.name
              trade.priceFixed = market.bid.fixed
              trade.amountFixed = market.ask.fixed
            }
            trade.kind = trade.ask_member_id ? 'sell' : 'buy'
            tradeData.push(trade)
          }
          this.setState({userTrades: tradeData})
        })
    }
  }

  render() {
    const {trades, yours, market} = this.props
    const {userTrades} = this.state
    let prevTrade = {}
    let data = []
    if (yours && !_.isEmpty(userTrades)) {
      for (let i = 0; i < userTrades.length; i++) {
        let trade = userTrades[i]
        prevTrade = (i < userTrades.length - 1) ? userTrades[i + 1] : trade
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

const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({user}) => {
  return {
    authStatus: user.authStatus
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SimpleTradeHistory))
