import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Modal, Spin, Typography } from 'antd'
import { clearOrder, clearOrderAsks, clearOrderBids, clearOrders, getOrderHistory } from '../../api/axiosAPIs'
import { MARKETS } from '../../constants/Markets'
import OpenOrdersTable from '../../components/OpenOrdersTable'
import _ from 'lodash'
import { IconNotification } from '../../components/common/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'

const {Text} = Typography

class OpenOrders extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      orders: [],
      page: 1,
      pageCount: 1,
      perPage: 10,
      pagination: {},
      cancelOrderId: null,
      cancelType: null,
      confirmModal: false
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

  onChangeTable = (pagination, filters, sorter) => {
    this.setState({pagination, page: pagination.current})
    this.fetchData({page: pagination.current})
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
    clearOrders(this.props.market.id)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  cancelBids = () => {
    clearOrderBids(this.props.market.id)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  cancelAsks = () => {
    clearOrderAsks(this.props.market.id)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
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
            dataList={orders}
            marketMode={false}
            onCancelType={this.handleCancelType}
            onCancelOrder={this.handleCancel}
            onChange={this.onChangeTable}
          />
        </Spin>
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

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OpenOrders))
