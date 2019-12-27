import React from 'react'
import { injectIntl } from 'react-intl'
import { Table } from 'antd'
import iplocation from 'iplocation'
import { getTableLocaleData } from '../../util/helpers'

class LoginHistoryTable extends React.Component {

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'login.time'}),
        dataIndex: 'createdAt',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'ip.address'}),
        dataIndex: 'ip',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'location'}),
        dataIndex: 'geo',
        align: 'center'
      }
    ]
  }

  render() {
    const {intl, data, pagination} = this.props

    const realData = data.map(log => {
      let obj = Object.assign({}, log)
      let location = intl.formatMessage({id: 'not.found'})
      iplocation(log.ip)
        .then(res => {
          location = `${res.city} ${res.region} ${res.country}`
        })
        .catch(error => {
          console.log(error)
        })
      obj.geo = location
      return obj
    })
    return (
      <Table className="gx-table-responsive gx-m-4"
             columns={this.getColumns()}
             dataSource={realData}
             pagination={pagination}
             locale={getTableLocaleData(intl)}
             rowKey={'id'}
             size='middle'/>
    )
  }

}

export default injectIntl(LoginHistoryTable)
