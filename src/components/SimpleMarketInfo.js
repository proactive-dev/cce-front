import React from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'
import { Table } from 'antd'
import _ from 'lodash'
import { getCoinNameBySymbol, getPointFixed, priceChange } from '../../src/util/helpers'
import { EXCHANGE } from '../constants/Paths'
import { getTableLocaleData } from '../util/helpers'

class SimpleMarketInfo extends React.Component {
  constructor(props) {
    super(props)
    this.prevData = []
  }

  getColumns() {
    const {symbol, intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'name'}),
        dataIndex: 'market',
        align: 'left',
        render: (value, record) => {
          return <div><img src={require(`assets/images/coins/${record.symbol.toLowerCase()}.png`)}
                           alt={record.symbol} title={record.symbol} style={{maxWidth: 16}}/>
            <span className="gx-fs-lg gx-p-2">{record.symbol.toUpperCase()}</span>&nbsp;
            <span className={'gx-text-muted'}>{getCoinNameBySymbol(record.symbol)}</span></div>
        }
      },
      {
        title: intl.formatMessage({id: 'last.price'}),
        dataIndex: 'last',
        align: 'center',
        render: (value, record) => {
          if (record.last_trend > 0) {
            return <div className={'gx-text-green'}>
              {symbol}&nbsp;{getPointFixed(value, 2)}
            </div>
          } else if (record.last_trend < 0) {
            return <div className={'gx-text-red'}>
              {symbol}&nbsp;{getPointFixed(value, 2)}
            </div>
          } else {
            return <div>
              {symbol}&nbsp;{getPointFixed(value, 2)}
            </div>
          }
        }
      },
      {
        title: intl.formatMessage({id: 'change'}),
        dataIndex: 'change',
        align: 'center',
        render: (value, record) => {
          if (record.change > 0) {
            return <div className={'gx-text-green'}>
              {getPointFixed(value, 2)}&nbsp;%
            </div>
          } else if (record.change < 0) {
            return <div className={'gx-text-red'}>
              {getPointFixed(value, 2)}&nbsp;%
            </div>
          } else {
            return <div>
              {getPointFixed(value, 2)}&nbsp;%
            </div>
          }
        }
      }
    ]
  }

  handleClick = (market) => {
    this.props.history.push(`/${EXCHANGE}/${market}`)
  }

  render() {
    const {tickers, baseFilter, symbolMap} = this.props
    let data = []
    if (!_.isEmpty(tickers)) {
      let filteredTickers = baseFilter.reduce(function (obj, key) {
        if (tickers.hasOwnProperty(key)) obj[key] = tickers[key]
        return obj
      }, {})

      let prevData = this.prevData
      let lastData = {}
      _.forEach(filteredTickers, function (value, key) {
        const ticker = value.ticker
        const sym = symbolMap[key]
        if (ticker) {
          const open = parseFloat(ticker.open)
          const last = parseFloat(ticker.last)
          const change = priceChange(open, last)
          const lastTrend = !_.isEmpty(prevData) ? last - prevData[sym] : 0
          lastData[sym] = last
          data.push({
            market: key,
            symbol: sym,
            last: last,
            open: open,
//            high: parseFloat(ticker.high),
//            low: parseFloat(ticker.low),
//            vol: parseFloat(ticker.vol),
            change: change,
            last_trend: lastTrend
          })
        }
      })
      this.prevData = lastData
    }

    return (
      <div>
        <Table className={'gx-table-responsible '}
               columns={this.getColumns()}
               dataSource={data}
               pagination={false}
               locale={getTableLocaleData}
               rowKey="at"
               onRow={(record) => ({
                 onClick: () => {
                   this.handleClick(record.market)
                 }
               })}
               size='middle'/>
      </div>
    )
  }
}

export default withRouter(injectIntl(SimpleMarketInfo))
