import React from 'react'
import { Button, Select, Table } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getFixed, getTableLocaleData, getTimeForTable } from '../util/helpers'

const Option = Select.Option

class OpenOrdersTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cancelType: 'cancel.order'
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter)
  }

  handleCancelTypeChange = (value) => {
    this.setState({cancelType: value})
    this.props.onCancelType(value)
  }

  handleCancel = (value) => {
    this.props.onCancelOrder(value)
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
        title: <Select style={{width: 120}}
                       defaultValue={'cancel.order'}
                       value={this.state.cancelType}
                       disabled={!this.props.marketMode}
                       size={'small'}
                       onChange={this.handleCancelTypeChange}>
          <Option key={0} value={'cancel.order'}>---</Option>
          <Option key={1} value={'cancel.bids'}>
            <FormattedMessage id={'cancel.bids'}/>
          </Option>
          <Option key={2} value={'cancel.asks'}>
            <FormattedMessage id={'cancel.asks'}/>
          </Option>
          <Option key={3} value={'cancel.all'}>
            <FormattedMessage id={'cancel.all'}/>
          </Option>
        </Select>,
        dataIndex: 'id',
        align: 'center',
        width: 120,
        render: (value) => {
          return <Button onClick={() => this.handleCancel(value)}><FormattedMessage id={'cancel'}/></Button>
        }
      }
    ]
  }

  render() {
    const {dataList, intl, marketMode, pagination} = this.props

    return (
      <div>
        <Table className={marketMode ? 'gx-table-responsive' : 'gx-table-responsive gx-mt-4 gx-mb-4'}
               columns={this.getColumns()}
               dataSource={dataList}
               pagination={pagination}
               locale={getTableLocaleData(intl)}
               onChange={this.handleTableChange}
               rowKey={'id'}
               size={marketMode ? 'small' : 'middle'}/>
      </div>
    )
  }
}

export default injectIntl(OpenOrdersTable)
