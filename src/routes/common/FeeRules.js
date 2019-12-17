import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Card, Icon, Table, Tabs } from 'antd'
import { EX_COIN_SYMBOL, KEY_COIN_SYMBOL } from '../../constants/AppConfigs'
import { getTableLocaleData } from '../../util/helpers'
import { LEVELS } from '../../constants/Levels'
import { CURRENCIES } from '../../constants/Currencies'

const TabPane = Tabs.TabPane

class FeeRules extends React.Component {

  getTradingFeesColumns() {
    const {intl} = this.props

    return [
      {
        title: intl.formatMessage({id: 'level'}),
        dataIndex: 'key',
        align: 'center'
      },
      {
        title: () => {
          return <div><FormattedMessage id="30.d.trading.volume"/>&nbsp;&nbsp;{`(${KEY_COIN_SYMBOL})`}</div>
        },
        dataIndex: 'trade.amount',
        align: 'center',
        render: (value, record) => {
          return `${value} ${record.trade.currency}`
        }
      },
      {
        title: '&',
        align: 'center',
        dataIndex: 'id',
        render: (value, record) => {
          let condition
          if (record.key === 'General') {
            condition = 'or'
          } else
            condition = '&'
          return condition
        }
      },
      {
        title: () => {
          return <div>{EX_COIN_SYMBOL}&nbsp;&nbsp;<FormattedMessage id="balance"/></div>
        },
        dataIndex: 'holding.amount',
        align: 'center',
        render: (value, record) => {
          return `${value} ${record.holding.currency}`
        }
      },
      {
        title: intl.formatMessage({id: 'maker'}),
        dataIndex: 'maker.normal',
        align: 'center',
        render: (value) => {
          return `${value}%`
        }
      },
      {
        title: intl.formatMessage({id: 'taker'}),
        dataIndex: 'taker.normal',
        align: 'center',
        render: (value) => {
          return `${value}%`
        }
      },
      {
        title: () => {
          return (
            <div>
              <FormattedMessage id="maker"/>
              <Icon type="fire" className="gx-ml-2 gx-text-amber" theme="filled"/>
              <b className="gx-text-amber">{EX_COIN_SYMBOL}</b>
            </div>
          )
        },
        dataIndex: 'maker.holding',
        align: 'center',
        render: (value) => {
          return `${value}%`
        }
      },
      {
        title: () => {
          return (
            <div>
              <FormattedMessage id="taker"/>
              <Icon type="fire" className="gx-ml-2 gx-text-amber" theme="filled"/>
              <b className="gx-text-amber">{EX_COIN_SYMBOL}</b>
            </div>
          )
        },
        dataIndex: 'taker.holding',
        align: 'center',
        render: (value) => {
          return `${value}%`
        }
      }
    ]
  }

  getFeesColumns() {
    const {intl} = this.props

    return [
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'symbol',
        align: 'center',
        render: (value) => {
          return (
            <div>
              <img width={20} height={20} className="gx-mr-1" src={require(`assets/images/coins/${value}.png`)}/>
              {value.toUpperCase()}
            </div>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'name'}),
        dataIndex: 'name',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'min.withdrawal'}),
        dataIndex: 'withdraw.minAmount',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'withdrawal.fee'}),
        dataIndex: 'withdraw.fee',
        align: 'center'
      }
    ]
  }

  render() {
    const {intl} = this.props
    let data = CURRENCIES.filter(function (item) {
      return (item.visible && item.type === 'coin')
    })

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="fees"/></h1>
        <Tabs size='large'>
          <TabPane
            className="gx-p-1"
            key="0"
            tab={intl.formatMessage({id: 'trading.fees'})}>
            <Card>
              <h2><FormattedMessage id="trading.fees"/></h2>
              <ul>
                <li className="gx-mt-4 gx-ml-4"><FormattedMessage id="trading.fees.desc.1"/></li>
                <li className="gx-mt-4 gx-ml-4"><FormattedMessage id="trading.fees.desc.2"/></li>
                <li className="gx-mt-4 gx-ml-4"><FormattedMessage id="trading.fees.desc.3"/></li>
              </ul>
              <hr/>
              <Table
                className="gx-table-responsive gx-mb-4"
                columns={this.getTradingFeesColumns()}
                pagination={false}
                dataSource={LEVELS}
                locale={getTableLocaleData(intl)}
                rowKey={'id'}
                size='middle'/>
            </Card>
          </TabPane>
          <TabPane
            className="gx-p-1"
            key="1"
            tab={intl.formatMessage({id: 'deposit.withdrawal.fees'})}>
            <Card>
              <h2><FormattedMessage id="deposit.fees"/></h2>
              <ul>
                <li className="gx-m-4"><FormattedMessage id="free"/></li>
              </ul>
              <h2><FormattedMessage id="withdrawal.fees"/></h2>
              <ul>
                <li className="gx-m-4"><FormattedMessage id="withdrawal.fee.desc"/></li>
              </ul>
              <hr/>
              <Table
                className="gx-table-responsive gx-mb-4"
                columns={this.getFeesColumns()}
                pagination={false}
                dataSource={data}
                locale={getTableLocaleData(intl)}
                rowKey={'id'}
                size='middle'/>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default injectIntl(FeeRules)
