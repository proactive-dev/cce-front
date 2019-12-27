import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../appRedux/actions/User'
import { Modal, Typography } from 'antd'
import { clearOrder, clearOrderAsks, clearOrderBids, clearOrders, getOrderHistory } from '../api/axiosAPIs'
import { MARKETS } from '../constants/Markets'
import OpenOrdersTable from '../components/OpenOrdersTable'
import _ from 'lodash'
import { IconNotification } from '../components/IconNotification'
import { SUCCESS } from '../constants/AppConfigs'

const {Text} = Typography

class MarketOpenOrders extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: [],
      cancelOrderId: null,
      cancelType: null,
      confirmModal: false,
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

  componentDidMount() {
    this.props.getAuthStatus()
    this.fetchData({page: 1})
  }

  handleCancelType = type => {
    if (type === 'cancel.order')
      this.setState({confirmModal: false, cancelType: type})
    else
      this.setState({confirmModal: true, cancelType: type})
  }

  handleCancel = orderId => {
    this.setState({confirmModal: true, cancelType: 'cancel.order', cancelOrderId: orderId})
  }

  handleConfirmCancel = () => {
    this.setState({confirmModal: false})
  }

  handleConfirmOk = () => {
    this.setState({confirmModal: false})
    const {cancelType} = this.state
    if (cancelType === 'cancel.all') {
      this.cancelAll()
    } else if (cancelType === 'cancel.bids') {
      this.cancelBids()
    } else if (cancelType === 'cancel.asks') {
      this.cancelAsks()
    } else if (cancelType === 'cancel.order') {
      this.cancelOrder(this.state.cancelOrderId)
    }
  }

  getConfirmMessage() {
    const {cancelType} = this.state
    const {intl} = this.props
    let message = ''
    if (cancelType === 'cancel.all') {
      message = intl.formatMessage({id: 'confirm.cancel.all.orders'})
    } else if (cancelType === 'cancel.bids') {
      message = intl.formatMessage({id: 'confirm.cancel.bids'})
    } else if (cancelType === 'cancel.asks') {
      message = intl.formatMessage({id: 'confirm.cancel.asks'})
    } else if (cancelType === 'cancel.order') {
      message = intl.formatMessage({id: 'confirm.cancel.order'})
    }
    return message
  }

  cancelOrder = order => {
    const {orders} = this.state
    let orderObj = orders.find(item => item.id === order)
    if (_.isEmpty(orderObj))
      return
    clearOrder(orderObj.market, order)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  cancelAll = () => {
    clearOrders(this.props.marketId)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  cancelBids = () => {
    clearOrderBids(this.props.marketId)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  cancelAsks = () => {
    clearOrderAsks(this.props.marketId)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  fetchData = ({page}) => {
    let search = 'state=100'

    getOrderHistory({page, perPage: 10, search})
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
        if (this.props.onDataLoaded)
          this.props.onDataLoaded(orderData.length)
        this.setState({orders: orderData})
      })
  }

  render() {
    const {orders} = this.state

    return (
      <div>
        <OpenOrdersTable
          dataSource={orders}
          pagination={false}
          marketMode={true}
          onCancelType={this.handleCancelType}
          onCancelOrder={this.handleCancel}
          onChange={this.onChangeTable}
        />
        <Modal
          title={<FormattedMessage id={'confirm'}/>}
          visible={this.state.confirmModal}
          onOk={this.handleConfirmOk}
          onCancel={this.handleConfirmCancel}>
          <div className={'gx-text-center'}>
            <Text>
              {this.getConfirmMessage()}
            </Text>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MarketOpenOrders))
