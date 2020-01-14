import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Table } from 'antd'
import { getFixed, getTableLocaleData } from '../../util/helpers'
import { MARKETS } from '../../constants/Markets'

class TradingRules extends React.Component {

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'pair'}),
        dataIndex: 'name',
        align: 'center',
        render: (value) => {
          return <span className={'gx-font-weight-bold'}>{value}</span>
        }
      },
      {
        title: intl.formatMessage({id: 'ask.min'}),
        dataIndex: 'ask',
        align: 'center',
        render: (value) => {
          return <span>{getFixed(value.min, value.fixed)}&nbsp;{value.currency.toUpperCase()}</span>
        }
      },
      {
        title: intl.formatMessage({id: 'bid.min'}),
        dataIndex: 'bid',
        align: 'center',
        render: (value) => {
          return <span>{getFixed(value.min, value.fixed)}&nbsp;{value.currency.toUpperCase()}</span>
        }
      }
    ]
  }

  render() {
    const {intl} = this.props
    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="trading.rules"/></h1>
        <Table className={'gx-table-responsive gx-mb-4'}
               columns={this.getColumns()}
               dataSource={MARKETS}
               pagination={false}
               locale={getTableLocaleData(intl)}
               rowKey="id"
               size='medium'/>
      </div>
    )
  }
}

export default injectIntl(TradingRules)
