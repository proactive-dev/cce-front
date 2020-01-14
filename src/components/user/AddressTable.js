import React from 'react'
import { injectIntl } from 'react-intl'
import { Icon, Popconfirm, Table } from 'antd'
import _ from 'lodash'
import { getTableLocaleData } from '../../util/helpers'

class AddressTable extends React.Component {

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'coin',
        align: 'center',
        render: (value) => {
          return value.toUpperCase()
        }
      },
      {
        title: intl.formatMessage({id: 'label'}),
        dataIndex: 'label',
        align: 'left'
      },
      {
        title: intl.formatMessage({id: 'address'}),
        dataIndex: 'address',
        align: 'left'
      },
      {
        title: intl.formatMessage({id: 'memo.tag'}),
        dataIndex: 'tag',
        align: 'left'
      },
      {
        title: intl.formatMessage({id: 'action'}),
        dataIndex: 'action',
        align: 'center',
        render: (value, record) => {
          return (
            <Popconfirm
              title={intl.formatMessage({id: 'confirm.sure'})}
              onConfirm={e => this.onDelete(record)}
              okText={intl.formatMessage({id: 'ok'})}
              cancelText={intl.formatMessage({id: 'cancel'})}>
              <Icon className='gx-text-primary' type="delete" theme="filled"/>
            </Popconfirm>
          )
        }
      }
    ]
  }

  onDelete = (record) => {
    this.props.onDelete(record)
  }

  render() {
    const {intl, data, filter} = this.props
    let addresses = []
    let filteredData = data
    if (!_.isEmpty(filteredData) && filter) {
      filteredData = filteredData.filter(addr => {
        return addr.currency.toLowerCase().includes(filter.toLowerCase())
      })
    }

    _.forEach(filteredData, function (addr) {
      addresses.push({
        id: addr.id,
        coin: addr.currency,
        label: addr.extra,
        address: addr.uid,
        tag: addr.tag,
        action: ''
      })
    })

    return (
      <Table
        className={'gx-table-responsive'}
        columns={this.getColumns()}
        dataSource={addresses}
        pagination={false}
        locale={getTableLocaleData(intl)}
        rowKey="id"
        size='middle'/>
    )
  }
}

export default injectIntl(AddressTable)
