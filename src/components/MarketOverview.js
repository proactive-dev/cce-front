import React from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { Table } from 'antd'
import _ from 'lodash'
import { getFixed, getPointFixed, getTableLocaleData, priceChange } from '../util/helpers'
import { EXCHANGE } from '../constants/Paths'

class MarketOverview extends React.Component {
  constructor(props) {
    super(props)

    this.prevData = []
  }

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'pair'}),
        dataIndex: 'name',
        align: 'left',
        render: (value) => {
          return <span className={'gx-font-weight-bold'}>{value}</span>
        }
      },
      {
        title: intl.formatMessage({id: 'last.price'}),
        dataIndex: 'last',
        align: 'left',
        render: (value, record) => {
          let className = ''
          if (record.lastTrend > 0) {
            className = 'gx-text-green'
          } else if (record.lastTrend < 0) {
            className = 'gx-text-red'
          }
          return <span className={className}>{getFixed(value, record.bidFixed)}</span>
        }
      },
      {
        title: intl.formatMessage({id: 'change'}),
        dataIndex: 'change',
        align: 'right',
        render: (value) => {
          let className = ''
          if (value > 0) {
            className = 'gx-text-green'
          } else if (value < 0) {
            className = 'gx-text-red'
          }
          return <span className={className}>{getPointFixed(value)}%</span>
        }
      },
      {
        title: intl.formatMessage({id: 'high'}),
        dataIndex: 'high',
        align: 'right',
        render: (value, record) => {
          return getFixed(value, record.bidFixed)
        }
      },
      {
        title: intl.formatMessage({id: 'low'}),
        dataIndex: 'low',
        align: 'right',
        render: (value, record) => {
          return getFixed(value, record.bidFixed)
        }
      },
      {
        title: intl.formatMessage({id: 'volume'}),
        dataIndex: 'vol',
        align: 'right',
        render: (value) => {
          return getPointFixed(value)
        }
      }
    ]
  }

  handleClick = (market) => {
    this.props.history.push(`/${EXCHANGE}/${market}`)
  }

  render() {
    const {tickers, markets} = this.props
    let data = []
    if (!_.isEmpty(tickers)) {
      let prevData = this.prevData
      let lastData = {}
      markets.forEach((market) => {
          const marketId = market.id
          if (market.visible && tickers[marketId]) {
            const ticker = tickers[marketId].ticker
            const open = parseFloat(ticker.open)
            const last = parseFloat(ticker.last)
            const change = priceChange(open, last)
            const lastTrend = !_.isEmpty(prevData) ? last - prevData[marketId] : 0
            lastData[marketId] = last
            data.push({
              id: marketId,
              name: market.name,
              last: last,
              open: open,
              high: parseFloat(ticker.high),
              low: parseFloat(ticker.low),
              vol: parseFloat(ticker.vol) || 0.0,
              bidFixed: market.bid.fixed,
              askFixed: market.ask.fixed,
              change: change,
              lastTrend: lastTrend
            })
          }
        }
      )
      this.prevData = lastData
    }

    return (
      <Table className={'gx-table-responsive'}
             columns={this.getColumns()}
             dataSource={data}
             pagination={false}
             locale={getTableLocaleData}
             rowKey="id"
             size='medium'
             onRow={(record) => ({
               onClick: () => {
                 this.handleClick(record.id)
               }
             })}/>
    )
  }
}

export default withRouter(injectIntl(MarketOverview))
