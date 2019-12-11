import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { Dropdown, Menu, Table } from 'antd'
import { getCoinFixed, getFixed } from '../util/helpers'
import { ESTIMATE_SYMBOL } from '../constants/AppConfigs'

class MainAccounts extends React.Component {
  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'symbol',
        align: 'center',
        render: (value) => {
          return <div>
            <img
              className="gx-m-2"
              src={require(`assets/images/coins/${value.toLowerCase()}.png`)}
              alt={value} style={{maxWidth: 16, verticalAlign: 'middle'}}/>
            {value.toUpperCase()}
          </div>
        }
      },
      {
        title: intl.formatMessage({id: 'name'}),
        dataIndex: 'name',
        align: 'center',
        render: (value, record) => {
          return <div className={'fullName'}>
            <a target="_blank"
               rel="noopener noreferrer"
               title={`${value} Info`}
               href={record.infoUrl}>{value}
            </a>
          </div>
        }
      },
      {
        title: intl.formatMessage({id: 'balance.total'}),
        dataIndex: 'total',
        align: 'center',
        render: (value, record) => {
          return <div className={'total f-right'}>{getFixed(value, record.precision)}</div>
        }
      },
      {
        title: intl.formatMessage({id: 'balance.available'}),
        dataIndex: 'available',
        align: 'center',
        render: (value, record) => {
          return <div className={'usable f-right'}>{getFixed(value, record.precision)}</div>
        }
      },
      {
        title: intl.formatMessage({id: 'locked'}),
        dataIndex: 'locked',
        align: 'center',
        render: (value, record) => {
          return <div className={'locked f-right'}>{getFixed(value, record.precision)}</div>
        }
      },
      {
        title: intl.formatMessage({id: 'btc.value'}),
        dataIndex: 'estimation',
        align: 'center',
        render: (value) => {
          return <div className={'equalValue f-right'}>{getCoinFixed(value, ESTIMATE_SYMBOL)}</div>
        }
      },
      {
        title: '',
        align: 'center',
        render: (record) => {
          const menu = (
            <Menu>
              {record.markets.map(market =>
                <Menu.Item>
                  <a href={`/trade/${market.name}`}>
                    {market.name}
                  </a>
                </Menu.Item>
              )
              }
            </Menu>
          )
          return <div className={'equalValue f-right'}>
            <Link
              className="gx-m-2 gx-text-underline"
              to="#"
              onClick={() => this.props.onDeposit(record.symbol)}>
              {intl.formatMessage({id: 'deposit'})}
            </Link>
            <Link
              className="gx-m-2 gx-text-underline"
              to="#"
              onClick={() => this.props.onWithdrawal(record.symbol)}>
              {intl.formatMessage({id: 'withdrawal'})}
            </Link>
            {/*<Link onClick={() => this.props.onTrade(record.symbol)}>{intl.formatMessage({id: 'trade'})}</Link>*/}
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link gx-text-underline" href="#">
                {intl.formatMessage({id: 'trade'})}
              </a>
            </Dropdown>
          </div>
        }
      }
    ]
  }

  render() {
    const {dataSource} = this.props
    return (
      <Table className='gx-table-responsive gx-mt-4 gx-mb-4'
             columns={this.getColumns()}
             dataSource={dataSource}
             pagination={false}
             rowKey="symbol"
             size='middle'/>
    )
  }
}

export default withRouter(injectIntl(MainAccounts))
