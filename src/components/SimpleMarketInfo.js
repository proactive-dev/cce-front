import React from 'react'
import { injectIntl } from 'react-intl'
import { Table } from 'antd'
import _ from 'lodash'
import { getCoinNameBySymbol, getPointFixed, priceChange } from '../../src/util/helpers'

class SimpleMarketInfo extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   selectedRecord: null,
    //   isModalOpened: false
    // }
    this.base_filter = ['bchusdt', 'btcusdt', 'ethusdt', 'xrpusdt', 'ltcusdt']
    this.symbol_map = {'bchusdt': 'bch', 'btcusdt': 'btc', 'ethusdt': 'eth', 'xrpusdt': 'xrp', 'ltcusdt': 'ltc'}
    this.prev_data = []
  }

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'name'}),
        dataIndex: 'market',
        align: 'left',
        render: (value, record) => {
          return <div><img src={require(`assets/images/coins/${record.symbol.toLowerCase()}.png`)}
                           alt={record.symbol} title={record.symbol} style={{maxWidth: 16}}/><span
            className="gx-fs-lg gx-p-2">{record.symbol.toUpperCase()}</span>&nbsp;<span
            className={'gx-text-muted'}>{getCoinNameBySymbol(record.symbol)}</span></div>
        }
      },
      {
        title: intl.formatMessage({id: 'last.price'}),
        dataIndex: 'last',
        align: 'center',
        render: (value, record) => {
          if (record.last_trend > 0) {
            return <div className={'gx-text-green'}>
              $&nbsp;{getPointFixed(value, 2)}
            </div>
          } else if (record.last_trend < 0) {
            return <div className={'gx-text-red'}>
              $&nbsp;{getPointFixed(value, 2)}
            </div>
          } else {
            return <div>
              $&nbsp;{getPointFixed(value, 2)}
            </div>
          }
        }
      },
      {
        //title: intl.formatMessage({id: '24h.change'}),
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

  render() {
    const {tickers} = this.props
    let data = []

    if (!_.isEmpty(tickers)) {
      let filteredTickers = this.base_filter.reduce(function (obj, key) {
        if (tickers.hasOwnProperty(key)) obj[key] = tickers[key]
        return obj
      }, {})

      let symbol_map = this.symbol_map
      let prev_data = this.prev_data
      let last_data = {}
      _.forEach(filteredTickers, function (value, key) {
        const ticker = value.ticker
        const sym = symbol_map[key]
        if (ticker) {
          const open = parseFloat(ticker.open)
          const last = parseFloat(ticker.last)
          const change = priceChange(open, last)
          const last_trend = !_.isEmpty(prev_data) ? last - prev_data[sym] : 0
          last_data[sym] = last
          data.push({
            symbol: sym,
            last: last,
            open: open,
//            high: parseFloat(ticker.high),
//            low: parseFloat(ticker.low),
//            vol: parseFloat(ticker.vol),
            change: change,
            last_trend: last_trend
          })
        }
      })
      this.prev_data = last_data
      //data = Helper.stableSort(data, order, orderBy)
    }

    return (
      <div>
        <Table className={'gx-table-responsible'}
               columns={this.getColumns()}
               dataSource={data}
               pagination={false}
               rowKey="at"
               size='middle'/>
      </div>
    )
  }

}

export default injectIntl(SimpleMarketInfo)
