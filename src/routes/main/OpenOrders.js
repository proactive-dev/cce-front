import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Spin, Table } from 'antd'
import { getFixed, getTableLocaleData, getTimeForTable } from '../../util/helpers'
import { getOrderHistory } from '../../api/axiosAPIs'
import { MARKETS } from '../../constants/Markets'

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
        const pageCount = Math.ceil(total_length / this.state.perPage)
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

  componentDidMount() {
    const {pagination} = this.state
    this.props.getAuthStatus()
    this.fetchData({page: pagination.current})
  }

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'date'}),
        dataIndex: 'at',
        align: 'center',
        render: (value) => {
          return getTimeForTable(value)
        }
      },
      {
        title: intl.formatMessage({id: 'pair'}),
        dataIndex: 'marketName',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'side'}),
        dataIndex: 'kind',
        align: 'center',
        render: (value) => {
          return <FormattedMessage id={value}/>
        }
      },
      {
        title: intl.formatMessage({id: 'price'}),
        dataIndex: 'price',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.priceFixed)
        }
      },
      {
        title: intl.formatMessage({id: 'amount'}),
        dataIndex: 'origin_volume',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.amountFixed)
        }
      },
      {
        title: intl.formatMessage({id: 'filled%'}),
        dataIndex: 'filled',
        align: 'center',
        render: (value, record) => {
          return getFixed((record.origin_volume - record.volume) * 100 / record.origin_volume, 2)
        }
      },
      {
        title: intl.formatMessage({id: 'total'}),
        dataIndex: 'total',
        align: 'center',
        render: (value, record) => {
          return getFixed(record.origin_volume * record.price, record.priceFixed)
        }
      }
    ]
  }

  render() {
    const {intl} = this.props
    const {loader, orders, pagination} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="open.orders"/></h1>
        <Spin spinning={loader} size="large">
          <Table className="gx-table-responsive gx-mt-4 gx-mb-4"
                 columns={this.getColumns()}
                 dataSource={orders}
                 pagination={pagination}
                 locale={getTableLocaleData(intl)}
                 onChange={this.onChangeTable}
                 rowKey={'id'}
                 size='middle'/>
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
