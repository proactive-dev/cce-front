import React from 'react'
import { Table } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getFixed, getTableLocaleData, getTimeForTable } from '../util/helpers'

class OrderHistoryTable extends React.Component {

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter)
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
      },
      {
        title: intl.formatMessage({id: 'status'}),
        dataIndex: 'state',
        align: 'center',
        render: (value) => {
          return <FormattedMessage id={value}/>
        }
      }
    ]
  }

  render() {
    const {dataList, intl, pagination} = this.props

    return (
      <div>
        <Table className="gx-table-responsive gx-mt-4 gx-mb-4"
               columns={this.getColumns()}
               dataSource={dataList}
               pagination={pagination}
               locale={getTableLocaleData(intl)}
               onChange={this.handleTableChange}
               rowKey={'id'}
               size='middle'/>
      </div>
    )
  }
}

export default injectIntl(OrderHistoryTable)
