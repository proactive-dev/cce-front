import React from 'react'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import ReactHighcharts from 'react-highcharts/ReactHighstock'
import { getOHLC } from '../../api/axiosAPIs'
import TradeRangeSwitch from './TradeRangeSwitch'
import { TICKER_GRAPH_INTERVAL } from '../../constants/AppConfigs'

const DATETIME_LABEL_FORMAT_FOR_TOOLTIP = {
  millisecond: '%m-%d %H:%M:%S.%L',
  second: '%m-%d %H:%M:%S',
  minute: '%m-%d %H:%M',
  hour: '%m-%d %H:%M',
  day: '%m-%d %H:%M',
  week: '%Y-%m-%d',
  month: '%Y-%m',
  year: '%Y'
}

const DATETIME_LABEL_FORMAT = {
  second: '%H:%M:%S',
  minute: '%H:%M',
  hour: '%H:%M',
  day: '%m-%d',
  week: '%m-%d',
  month: '%Y-%m',
  year: '%Y'
}

class TradeChart extends React.Component {
  state = {
    market: null,
    minutes: 60,
    range: 360000000,
    last_tid: 0,
    last_ts: 0,
    next_ts: 0,
    points: [],
    updatedAt: 0,
    timerId: -1
  }

  lastUpdatedTime = 0

  componentDidMount() {
    const {market} = this.props
    if (this.props.market) {
      this.generateData(market, this.state.minutes)
    }
    let timerId = setInterval(this.timer, TICKER_GRAPH_INTERVAL)
    this.setState({timerId})
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const {market} = this.state
    if (!_.isEmpty(market) && newProps.market.id === market.id) {
      return
    }
    this.setState({market: newProps.market})
    this.generateData(newProps.market, this.state.minutes)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.state.updatedAt !== nextState.updatedAt) {
      return true
    }
    if (this.props.market.id === nextProps.market.id)
      return false
    return this.state.market.id !== nextState.market.id
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }

  timer = () => {
    const {market, minutes} = this.state
    this.updateLatestData(market, minutes)
  }

  generateData = (market, minutes) => {
    if (_.isEmpty(market) || _.isEmpty(market.id)) {
      return
    }
    getOHLC(market.id, minutes)
      .then(response => {
        this.handleData(response.data, minutes)
      })
      .catch(error => {
        this.handleData([], minutes)
      })
  }

  updateLatestData = (market, minutes) => {
    if (_.isEmpty(market) || _.isEmpty(market.id)) {
      return
    }
    if (this.lastUpdatedTime > 0) {
      let now = new Date()
      let utc_timestamp = now.getTime() - now.getTimezoneOffset()
      let delta = (utc_timestamp - this.lastUpdatedTime) / 1000 / 60 / minutes
      delta = Math.floor(delta)
      if (delta >= 1000)
        delta = 999
      if (delta > 1) {
        getOHLC(market.id, minutes, delta)
          .then(response => {
            this.handleLatestData(response.data, minutes)
          })
          .catch(error => {
            this.handleLatestData([], minutes)
          })
      }
    }

  }

  setRange = minutes => {
    const range = 1000 * 60 * minutes * 100
    this.setState({range})
    this.generateData(this.state.market, minutes)
  }

  checkTrend = (prev, cur) => {
    return cur[4] >= prev[4]
  }

  prepare = (k) => {
    let volume = [], candlestick = [], close_price = []
    let time, open, high, low, close, vol, trend

    if (!k) {
      return {}
    }

    k.map((cur, index) => {
      time = cur[0]
      open = cur[1]
      high = cur[2]
      low = cur[3]
      close = cur[4]
      vol = cur[5]

      time = time * 1000
      trend = (index >= 1) ? this.checkTrend(k[index - 1], cur) : true

      close_price.push([time, close])
      candlestick.push([time, open, high, low, close])
      volume.push({x: time, y: vol, color: trend ? '#70aa11' : '#e20072'})

      return []
    })

    return {
      minutes: this.state.minutes,
      candlestick: candlestick.slice(0, -1),
      volume: volume.slice(0, -1),
      close: close_price.slice(0, -1)
    }
  }

  refreshUpdatedAt = () => {
    this.setState({updatedAt: Math.round(new Date().valueOf() / 1000)})
  }

  handleData = (data, minutes) => {
    let last_ts = 0
    let next_ts = 0
    this.setState({minutes})

    let points = []

    if (!_.isEmpty(data)) {
      points = this.prepare(data)

      if (points['candlestick'].length > 0) {
        last_ts = points['candlestick'][points['candlestick'].length - 1][0] / 1000
      }
      next_ts = last_ts + 60 * minutes
      this.setState({last_ts, next_ts})
    }

    if (!_.isEmpty(points)) {
      points['close'] = points['close'].slice(1)
      points['candlestick'] = points['candlestick'].slice(1)
      points['volume'] = points['volume'].slice(1)
      this.lastUpdatedTime = points['candlestick'][points['candlestick'].length - 1][0]
    }

    this.setState({points})
    this.refreshUpdatedAt()
  }

  handleLatestData = (data, minutes) => {
    this.setState({minutes})

    let points = []
    if (!_.isEmpty(data)) {
      points = this.prepare(data)
    }
    if (!_.isEmpty(points) && points['candlestick'].length > 0) {
      let old_data = this.state.points
      if (!_.isEmpty(old_data) &&
        old_data['candlestick'].length > 0) {

        for (let i = 0; i < points['candlestick'].length; i++) {
          let new_candlestick = points['candlestick'][i]
          let new_close = points['close'][i]
          let new_volume = points['volume'][i]
          if (new_candlestick[0] > this.lastUpdatedTime) {
            this.lastUpdatedTime = new_candlestick[0]
            let chart = this.refs.chart.getChart()
            let candlesticS = chart.series[0]
            let closeS = chart.series[1]
            let volumeS = chart.series[2]
            candlesticS.addPoint(new_candlestick, true, true, true)
            closeS.addPoint(new_close, true, true, true)
            volumeS.addPoint(new_volume, true, true, true)
          }
        }
      }
    }
  }

  render() {
    const {market} = this.props
    const data = this.state.points
    const dataGrouping = {
      enabled: false
    }
    dataGrouping['dateTimeLabelFormats'] = DATETIME_LABEL_FORMAT_FOR_TOOLTIP
    const options = {
      chart: {
        animation: true,
        marginTop: 35,
        height: 440
      },
      credits: {
        enabled: false
      },
      tooltip: {
        shape: 'square',
        headerShape: 'callout',
        shadow: false,
        shared: true,
        crosshairs: [
          {
            width: 0.5,
            dashStyle: 'solid',
            color: '#777'
          }, false
        ],
        valueDecimals: 8,
        borderWidth: 0,
        borderRadius: 2,
        positioner: function (w, h, point) {
          let chart_h, grid_h, x, y
          chart_h = this.chart.renderTo.height()
          grid_h = Math.min(20, Math.ceil(chart_h / 10))
          x = Math.max(10, point.plotX - w - 20)
          y = Math.max(0, Math.floor(point.plotY / grid_h) * grid_h - 20)
          return {
            x: x,
            y: y
          }
        }
      },
      plotOptions: {
        candlestick: {
          turboThreshold: 0,
          followPointer: true,
          color: '#e20072',
          upColor: '#70aa11',
          lineColor: '#e20072',
          upLineColor: '#70aa11',
          dataGrouping: dataGrouping
        },
        column: {
          turboThreshold: 0,
          dataGrouping: dataGrouping
        }
      },
      rangeSelector: {
        enabled: false,
        height: 0
      },
      navigator: {
        outlineWidth: 1,
        outlineColor: '#b2b1b6',
        xAxis: {
          dateTimeLabelFormats: DATETIME_LABEL_FORMAT
        }
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: DATETIME_LABEL_FORMAT,
        tickWidth: 2,
        range: this.state.range
      },
      yAxis: [
        {
          labels: {
            enabled: true,
            align: 'right',
            x: 2,
            y: 3,
            zIndex: -7
          },
          gridLineDashStyle: 'ShortDot',
          top: '0%',
          height: '70%',
          minRange: (market && market.last) ? parseFloat(market.last) / 25 : null
        }, {
          labels: {
            enabled: false
          },
          top: '70%',
          height: '15%'
        }, {
          labels: {
            enabled: false
          },
          top: '85%',
          height: '15%'
        }
      ],
      series: [
        _.extend({
          id: 'candlestick',
          name: 'Candlestick',
          type: 'candlestick',
          data: data['candlestick'],
          showInLegend: false
        }),
        _.extend({
          id: 'close',
          type: 'spline',
          data: data['close'],
          showInLegend: false,
          enableMouseTracking: false,
          marker: {
            radius: 0
          }
        }), {
          id: 'volume',
          name: 'Volume',
          yAxis: 1,
          type: 'column',
          data: data['volume'],
          showInLegend: false
        }
      ]
    }
    return (
      <div className={'gx-position-relative'}>
        <ReactHighcharts
          config={options}
          ref="chart"
        />
        <div className={'gx-position-absolute gx-top-0 gx-left-0'}>
          <TradeRangeSwitch setRange={this.setRange}/>
        </div>
      </div>
    )
  }
}

export default injectIntl(TradeChart)
