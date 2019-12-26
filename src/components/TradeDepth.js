import React from 'react'
import Highcharts from 'highcharts/highcharts'
import HighchartsReact from 'highcharts-react-official'
import _ from 'lodash'
import { injectIntl } from 'react-intl'

class TradeDepth extends React.Component {
  state = {
    askList: [],
    bidList: []
  }

  componentDidMount() {
    this.refreshDepth(this.props.asks, this.props.bids)
  }

  componentWillReceiveProps(newProps) {
    this.refreshDepth(newProps.asks, newProps.bids)
  }

  refreshDepth = (asks, bids) => {
    let askList = []
    let bidList = []
    let bidListSum = 0
    let askListSum = 0
    if (!_.isEmpty(asks)) {
      for (let i = asks.length; i-- > 0;) {
        let ask = asks[i]
        let ret = []
        ret.push(parseFloat(ask[0]))
        ret.push(askListSum += parseFloat(ask[1]))
        askList.push(ret)
      }
    }
    if (!_.isEmpty(bids)) {
      for (let i = 0, len = bids.length; i < len; i++) {
        let bid = bids[i]
        let ret = []
        ret.push(parseFloat(bid[0]))
        ret.push(bidListSum += parseFloat(bid[1]))
        bidList.unshift(ret)
      }
    }
    this.setState({askList, bidList})
  }

  render() {
    const {askList, bidList} = this.state
    const {intl, market} = this.props

    let lastPrice = 0
    if (market && !_.isEmpty(market.ticker)) {
      lastPrice = parseFloat(market.ticker.last)
    }

    const options = {
      chart: {
        type: 'area'
        // zoomType: 'x',
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        minPadding: 0,
        maxPadding: 0,
        plotLines: [{
          color: '#888',
          value: lastPrice,
          width: 1,
          label: {
            text: 'Actual price',
            rotation: 90
          }
        }],
        title: {
          text: intl.formatMessage({id: 'price'})
        }
      },
      yAxis: [{
        lineWidth: 1,
        gridLineWidth: 1,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
          align: 'left',
          x: 8
        }
      }, {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: 'inside',
        labels: {
          align: 'right',
          x: -8
        }
      }],
      plotOptions: {
        area: {
          fillOpacity: 0.2,
          lineWidth: 1,
          step: 'center'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
        valueDecimals: 4
      },
      series: [{
        name: intl.formatMessage({id: 'bid'}),
        data: bidList,
        color: '#70a800'
      }, {
        name: intl.formatMessage({id: 'ask'}),
        data: askList,
        color: '#ea0070'
      }]
    }


    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          style={{
            width: '100%',
            height: 440
          }}
          options={options}
        />
      </div>
    )
  }
}

export default injectIntl(TradeDepth)
