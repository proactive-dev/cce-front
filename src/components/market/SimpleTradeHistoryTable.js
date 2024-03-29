import React from 'react'
import { injectIntl } from 'react-intl'
import { Table } from 'antd'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getFixed } from '../../util/helpers'
import { setPrice } from '../../appRedux/actions/Markets'

class SimpleTradeHistoryTable extends React.Component {

  getColumns() {
    const {intl, market} = this.props
    return [
      {
        title: intl.formatMessage({id: 'price'}),
        dataIndex: 'price',
        align: 'left',
        render: (value, record) => {
          let className = ''
          if (record.trend >= 0) {
            className = 'gx-text-green'
          } else if (record.trend < 0) {
            className = 'gx-text-red'
          }
          return <span className={className}>{getFixed(value, market.bid.fixed)}</span>
        }
      },
      {
        title: intl.formatMessage({id: 'volume'}),
        dataIndex: 'volume',
        align: 'right',
        render: (value, record) => {
          return <span>{getFixed(record.volume, market.ask.fixed)}</span>
        }
      },
      {
        title: intl.formatMessage({id: 'date'}),
        dataIndex: 'date',
        align: 'right',
        render: (value) => {
          return <span>{value}</span>
        }
      }

    ]
  }

  handleClick = (price) => {
    this.props.setPrice(price)
  }

  render() {
    const {data, market, showHeader} = this.props
    if (_.isEmpty(market) || _.isEmpty(data))
      return ''
    return (
      <Table
        className={'gx-table-no-bordered gx-table-row-compact gx-pointer'}
        columns={this.getColumns()}
        dataSource={data}
        pagination={false}
        scroll={{y: 400}}
        rowKey="id"
        size='small'
        showHeader={!!showHeader}
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
  injectIntl(SimpleTradeHistoryTable)
)
