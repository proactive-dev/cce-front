import React from 'react'
import { Table } from 'antd'
import { injectIntl } from 'react-intl'
import { getFixed, getTableLocaleData } from '../util/helpers'
import { REGX } from '../constants/AppConfigs'

function strTrunc(str, n) {
  return (str && str.length > n) ?
    str.substr(0, Math.round(n / 2)) + '...' + str.substr(str.length - Math.round(n / 2), str.length - 1) :
    str
}

class TransactionHistoryTable extends React.Component {

  getColumns() {
    const {intl, kind} = this.props

    return [
      {
        title: intl.formatMessage({id: 'date'}),
        dataIndex: 'created_at',
        align: 'center',
        render: (value) => {
          return value.replace(REGX, ' ').replace('.000', '')
        }
      },
      {
        title: intl.formatMessage({id: 'status'}),
        dataIndex: 'aasm_state',
        align: 'center',
        render: (value) => {
          return intl.formatMessage({id: `${kind}.${value}`}).toUpperCase()
        }
      },
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'currency',
        align: 'center',
        render: (value) => {
          return value.toUpperCase()
        }
      },
      {
        title: intl.formatMessage({id: 'amount'}),
        dataIndex: 'amount',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.precision)
        }
      },
      {
        title: intl.formatMessage({id: 'commission'}),
        dataIndex: 'fee',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.feeSymbolPrecision)
        }
      },
      {
        title: 'TxID',
        dataIndex: 'txid',
        align: 'center',
        render: (value) => {
          return strTrunc(value, 72)
        }
      }
    ]
  }

  render() {
    const {data, intl, pagination} = this.props

    return (
      <Table className="gx-table-responsive gx-mt-4 gx-mb-4"
             columns={this.getColumns()}
             dataSource={data}
             pagination={pagination}
             locale={getTableLocaleData(intl)}
             rowKey={'id'}
             size='middle'/>
    )
  }
}

export default injectIntl(TransactionHistoryTable)
