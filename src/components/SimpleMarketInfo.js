import React from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { Table } from 'antd'
import _ from 'lodash'
import { getCoinNameBySymbol, getFiatFixed, getTableLocaleData, priceChange } from '../util/helpers'
import { EXCHANGE } from '../constants/Paths'
import { BASE_PRICE_SYMBOL, HOME_SYMBOLS, QUOTE_SYMBOL } from '../constants/AppConfigs'

class SimpleMarketInfo extends React.Component {
  constructor(props) {
    super(props)

    this.prevData = []
  }

  getColumns() {
    const {intl} = this.props
    const symbol = BASE_PRICE_SYMBOL
    return [
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'symbol',
        align: 'center',
        render: (value) => {
          return (
            <div>
              <img src={require(`assets/images/coins/${value}.png`)} alt={value} title={value} style={{maxWidth: 20}}/>
              <span className="gx-fs-lg gx-p-2 gx-m-2">{value.toUpperCase()}</span>
            </div>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'name'}),
        dataIndex: 'market',
        align: 'left',
        render: (value, record) => {
          return <span>{getCoinNameBySymbol(record.symbol)}</span>
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
          return <span className={className}>{symbol}&nbsp;{getFiatFixed(value)}</span>
        }
      },
      {
        title: intl.formatMessage({id: 'change'}),
        dataIndex: 'change',
        align: 'center',
        render: (value) => {
          let className = ''
          if (value > 0) {
            className = 'gx-text-green'
          } else if (value < 0) {
            className = 'gx-text-red'
          }
          return <span className={className}>{getFiatFixed(value)}%</span>
        }
      }
    ]
  }

  handleClick = (market) => {
    this.props.history.push(`/${EXCHANGE}/${market}`)
  }

  render() {
    const {tickers} = this.props
    let data = []
    if (!_.isEmpty(tickers)) {
      let filteredTickers = HOME_SYMBOLS.reduce((obj, key) => {
        const pair = `${key}${QUOTE_SYMBOL}`.toLowerCase()
        if (tickers.hasOwnProperty(pair)) obj[pair] = {base: key.toLowerCase(), ticker: tickers[pair].ticker}
        return obj
      }, {})

      let prevData = this.prevData
      let lastData = {}
      _.forEach(filteredTickers, function (value, key) {
        const ticker = value.ticker
        const symbol = value.base
        if (ticker) {
          const open = parseFloat(ticker.open)
          const last = parseFloat(ticker.last)
          const change = priceChange(open, last)
          const lastTrend = !_.isEmpty(prevData) ? last - prevData[symbol] : 0
          lastData[symbol] = last
          data.push({
            market: key,
            symbol: symbol,
            last: last,
            open: open,
            high: parseFloat(ticker.high),
            low: parseFloat(ticker.low),
            vol: parseFloat(ticker.vol),
            change: change,
            lastTrend: lastTrend
          })
        }
      })
      this.prevData = lastData
    }

    return (
      <Table className={'gx-table-responsive'}
             columns={this.getColumns()}
             dataSource={data}
             pagination={false}
             locale={getTableLocaleData}
             rowKey="market"
             onRow={(record) => ({
               onClick: () => {
                 this.handleClick(record.market)
               }
             })}/>
    )
  }
}

export default withRouter(injectIntl(SimpleMarketInfo))
