import React from 'react'
import { injectIntl } from 'react-intl'
import { Icon, Table, Typography } from 'antd'
import _ from 'lodash'

const {Text} = Typography

class AddressTable extends React.Component {
  constructor(props) {
    super(props)

  }

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'coin',
        align: 'left',
        render: (value) => {
          return <Text>{value.toUpperCase()}</Text>
        }
      },
      {
        title: intl.formatMessage({id: 'label'}),
        dataIndex: 'label',
        align: 'center',
        render: (value) => {
          return <Text>{value}</Text>
        }
      },
      {
        title: intl.formatMessage({id: 'address'}),
        dataIndex: 'address',
        align: 'left',
        render: (value) => {
          return <Text>{value}</Text>
        }
      },
      {
        title: intl.formatMessage({id: 'tag'}),
        dataIndex: 'tag',
        align: 'left',
        render: (value) => {
          return <Text>{value}</Text>
        }
      },
      {
        title: intl.formatMessage({id: 'action'}),
        dataIndex: 'action',
        align: 'center',
        render: (value, record) => {
          return <a onClick={e => this.handleDelete(e, record)}><Icon type="delete" theme="filled"/></a>
        }
      }
    ]
  }

  handleDelete = (e, record) => {
    this.props.onDelete(record)
  }

  render() {
    const {addrs, filter} = this.props
    let data = []
    let filteredAddrs = addrs
    if (!_.isEmpty(filteredAddrs) && filter) {
      filteredAddrs = filteredAddrs.filter(addr => {
        return addr.currency.toLowerCase().includes(filter.toLowerCase())
      })
    }

    let lastData = {}
    _.forEach(filteredAddrs, function (addr) {
      data.push({
        index: addr.id,
        coin: addr.currency,
        label: addr.extra,
        address: addr.uid,
        tag: addr.tag,
        action: ''
      })
    })

    return (
      <div>
        <Table className={'gx-table-responsible '}
               columns={this.getColumns()}
               dataSource={data}
          //pagination={false}
               rowKey="at"
               size='middle'/>
      </div>
    )
  }
}

export default injectIntl(AddressTable)
