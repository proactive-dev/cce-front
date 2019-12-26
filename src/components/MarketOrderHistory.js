import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { MARKETS } from '../constants/Markets'
import { getOrderHistory } from '../api/axiosAPIs'
import { getAuthStatus } from '../appRedux/actions/User'
import { convertToDate } from '../util/helpers'
import OrderHistoryTable from '../components/OrderHistoryTable'

class MarketOrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      market: null,
      authStatus: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {authStatus} = nextProps
    if (authStatus !== prevState.authStatus) {
      return {authStatus}
    }
    return null
  }

  fetchData = ({market}) => {
    let to = new Date()
    let from = new Date(to.getTime() - (7 * 24 * 60 * 60 * 1000))
    from = convertToDate(from)
    to = convertToDate(to)

    let search = `created_at >= "${from} 00:00:00" AND created_at <= "${to} 23:59:59"`
    if (market) {
      search = `${search} AND currency=${market}`
    }

    getOrderHistory({page: 1, perPage: 5, search})
      .then(response => {
        const {orders} = response.data
        let orderData = []
        for (let i = 0; i < orders.length; i++) {
          let order = orders[i]
          let market = MARKETS.find(item => item.id === order.market)
          if (market) {
            order.marketName = market.name
            order.priceFixed = market.bid.fixed
            order.amountFixed = market.ask.fixed
          }
          orderData.push(order)
        }
        this.setState({orders: orderData})
      })
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.fetchData(this.props.marketId)
  }

  render() {
    const {intl} = this.props
    const {orders} = this.state

    return (
      <div>
        <OrderHistoryTable
          pagination={false}
          dataList={orders}
          marketMode={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MarketOrderHistory))
