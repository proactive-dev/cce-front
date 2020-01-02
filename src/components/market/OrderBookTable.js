import React, { Component } from 'react'
import { Table } from 'antd'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { setPrice } from '../../appRedux/actions/Markets'
import { isMobile } from 'react-device-detect'

const MAX_FIXED = 8

class OrderBookTable extends Component {

  getColumns() {
    const {intl, market} = this.props
    let columns = []
    columns.push({
      title: `${intl.formatMessage({id: 'price'})}(${market.quoteUnit})`,
      dataIndex: 'price',
      align: 'center',
      render: (value, record) => {
        return (
          <span className={record.colorClass}>{value}</span>
        )
      }
    })
    columns.push({
      title: `${intl.formatMessage({id: 'volume'})}(${market.baseUnit})`,
      dataIndex: 'volume',
      align: 'right'
    })
    if (!isMobile) {
      columns.push({
        title: `${intl.formatMessage({id: 'total'})}(${market.quoteUnit})`,
        dataIndex: 'total',
        align: 'right',
        hidden: isMobile

      })
    }
    return columns
  }

  handleClick = (price) => {
    this.props.setPrice(price)
  }

  render() {
    const {orders, market, limitCount, isBuy, showHeader} = this.props

    const bidFixed = market.bid.fixed || MAX_FIXED
    const askFixed = market.ask.fixed || MAX_FIXED
    const totalFixed = bidFixed + askFixed < MAX_FIXED ? bidFixed + askFixed : MAX_FIXED

    let data = []
    if (_.isEmpty(orders))
      return ''
    const subOrders = isBuy ? orders.slice(0, Math.min(limitCount, orders.length)) : orders.slice(orders.length - Math.min(limitCount, orders.length), orders.length)
    if (!_.isEmpty(subOrders)) {
      subOrders.forEach(order => {
        const price = parseFloat(order[0]).toFixed(bidFixed)
        const volume = parseFloat(order[1]).toFixed(askFixed)
        const total = (price * volume).toFixed(totalFixed)
        data.push({
          key: order[0],
          price: price,
          volume: volume,
          total: total,
          colorClass: isBuy ? 'gx-text-green' : 'gx-text-red'
        })
      })
    }

    return (
      <Table
        className={'gx-table-responsive gx-table-no-bordered gx-table-row-compact gx-pointer'}
        columns={this.getColumns()}
        dataSource={data}
        pagination={false}
        showHeader={showHeader}
        size='small'
        onRow={(record) => ({
          onClick: () => {
            this.handleClick(record.price)
          }
        })}/>
    )
  }
}

const mapDispatchToProps = {
  setPrice
}

export default connect(
  null,
  mapDispatchToProps
)(
  injectIntl(OrderBookTable)
)
