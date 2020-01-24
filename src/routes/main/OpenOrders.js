import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Spin } from 'antd'
import { getOrderHistory } from '../../api/axiosAPIs'
import { MARKETS } from '../../constants/Markets'
import OpenOrdersTable from '../../components/market/OpenOrdersTable'

class OpenOrders extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      orders: [],
      page: 1,
      pageCount: 1,
      perPage: 10,
      pagination: {}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  componentDidMount() {
    const {pagination} = this.state
    this.props.getAuthStatus()
    this.fetchData({page: pagination.current})
  }

  refreshData = () => {
    const {pagination} = this.state
    this.fetchData({page: pagination.current})
  }

  onChangeTable = (pagination, filters, sorter) => {
    this.setState({pagination, page: pagination.current})
    this.fetchData({page: pagination.current})
  }

  fetchData = ({page}) => {
    let {perPage} = this.state
    let search = 'state=100'

    getOrderHistory({page, perPage, search})
      .then(response => {
        const {total_length, orders} = response.data
        const pageCount = Math.ceil(total_length / perPage)
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
        const pagination = {...this.state.pagination}
        pagination.total = total_length
        this.setState({orders: orderData, pageCount, pagination})
      })
  }

  render() {
    const {loader, orders, pagination} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="open.orders"/></h1>
        <Spin spinning={loader} size="large">
          <OpenOrdersTable
            pagination={pagination}
            dataSource={orders}
            onChange={this.onChangeTable}
            onRefresh={this.refreshData}
          />
        </Spin>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OpenOrders))
