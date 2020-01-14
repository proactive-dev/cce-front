import React from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { Popover, Table } from 'antd'
import _ from 'lodash'
import { getCoinFixed, getFixed, getTableLocaleData } from '../../util/helpers'
import { ESTIMATE_SYMBOL } from '../../constants/AppConfigs'

class MainAccounts extends React.Component {
  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'symbol',
        align: 'center',
        render: (value) => {
          return (
            <div>
              <img
                className="gx-m-2"
                src={require(`assets/images/coins/${value.toLowerCase()}.png`)}
                alt={value} style={{maxWidth: 16, verticalAlign: 'middle'}}/>
              {value.toUpperCase()}
            </div>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'name'}),
        dataIndex: 'name',
        align: 'center',
        render: (value, record) => {
          return (
            <a target="_blank"
               rel="noopener noreferrer"
               title={`${value} Info`}
               href={record.infoUrl}>
              {value}
            </a>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'balance.total'}),
        dataIndex: 'total',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.precision)
        }
      },
      {
        title: intl.formatMessage({id: 'balance.available'}),
        dataIndex: 'available',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.precision)
        }
      },
      {
        title: intl.formatMessage({id: 'locked'}),
        dataIndex: 'locked',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.precision)
        }
      },
      {
        title: intl.formatMessage({id: 'btc.value'}),
        dataIndex: 'estimation',
        align: 'center',
        render: (value) => {
          return getCoinFixed(value, ESTIMATE_SYMBOL)
        }
      },
      {
        title: '',
        align: 'center',
        render: (record) => {
          return (
            <div>
              <u
                className="gx-link gx-m-2"
                onClick={() => this.props.onDeposit(record.symbol)}>
                {intl.formatMessage({id: 'deposit'})}
              </u>
              <u
                className="gx-link gx-m-2"
                onClick={() => this.props.onWithdrawal(record.symbol)}>
                {intl.formatMessage({id: 'withdrawal'})}
              </u>
              {
                _.isEmpty(record.markets) ?
                  <u className={'gx-link gx-text-light-grey gx-m-2'}>{intl.formatMessage({id: 'trade'})}</u>
                  :
                  <Popover
                    overlayClassName="gx-popover-horizontal"
                    placement="bottomRight"
                    content={this.getTradeMenuContents(record.markets)}
                    trigger="click">
                    <u className={'gx-link gx-m-2'}>{intl.formatMessage({id: 'trade'})}</u>
                  </Popover>
              }
            </div>
          )
        }
      }
    ]
  }

  getTradeMenuContents = (markets) => {
    return <ul className="gx-sub-popover">
      {
        markets.map((market) =>
          <li className="gx-media gx-pointer gx-p-2"
              key={market.code}
              onClick={() => this.props.onTrade(market.id)}>
            {market.name}
          </li>
        )
      }
    </ul>
  }

  render() {
    const {intl, loader, dataSource} = this.props
    return (
      <Table className='gx-table-responsive gx-mt-4 gx-mb-4'
             columns={this.getColumns()}
             dataSource={dataSource}
             loader={loader}
             pagination={false}
             locale={getTableLocaleData(intl)}
             rowKey="symbol"
             size='middle'/>
    )
  }
}

export default withRouter(injectIntl(MainAccounts))
