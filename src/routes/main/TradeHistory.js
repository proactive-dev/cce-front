import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, DatePicker, Row, Select, Spin } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import { CSVLink } from 'react-csv'
import { convertToDate } from '../../util/helpers'
import { getAllTradeHistory, getTradeHistory } from '../../api/axiosAPIs'
import { getAuthStatus } from '../../appRedux/actions/User'
import { MARKETS } from '../../constants/Markets'
import TradeHistoryTable from '../../components/TradeHistoryTable'

const {Option} = Select
const {RangePicker} = DatePicker

class TradeHistory extends React.Component {
  constructor(props) {
    super(props)

    const to = new Date()
    const from = new Date(to.getTime() - (7 * 24 * 60 * 60 * 1000))

    this.state = {
      loader: false,
      trades: [],
      exportData: [],
      page: 1,
      pageCount: 1,
      perPage: 10,
      from,
      to,
      market: null,
      exportReady: false,
      pagination: {}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  onChangeTable = (pagination, filters, sorter) => {
    const {from, to, market} = this.state
    this.setState({pagination, page: pagination.current})
    this.fetchData({from, to, market, page: pagination.current})
  }

  fetchData = ({from, to, market, page}) => {
    let {perPage} = this.state
    from = convertToDate(from)
    to = convertToDate(to)

    let search = `created_at >= "${from} 00:00:00" AND created_at <= "${to} 23:59:59"`
    if (market) {
      search = `${search} AND currency=${market}`
    }

    getTradeHistory({page, perPage, search})
      .then(response => {
        const {total_length, trades} = response.data
        const pageCount = Math.ceil(total_length / perPage)
        let tradeData = []
        for (let i = 0; i < trades.length; i++) {
          let trade = trades[i]
          let market = MARKETS.find(item => item.id === trade.market)
          if (market) {
            trade.marketName = market.name
            trade.priceFixed = market.bid.fixed
            trade.amountFixed = market.ask.fixed
          }
          trade.kind = trade.ask_member_id ? 'sell' : 'buy'
          tradeData.push(trade)
        }
        const pagination = {...this.state.pagination}
        pagination.total = total_length
        this.setState({trades: tradeData, pageCount, pagination})
      })
  }

  buildExportData() {
    const {intl} = this.props
    let exportData = []
    exportData.push([
      intl.formatMessage({id: 'date'}),
      intl.formatMessage({id: 'pair'}),
      intl.formatMessage({id: 'side'}),
      intl.formatMessage({id: 'price'}),
      intl.formatMessage({id: 'total'})
    ])

    getAllTradeHistory()
      .then(response => {
        const {trades, member_id} = response.data

        for (let i = 0; i < trades.length; i++) {
          const trade = trades[i]

          const fixed = 8
          const pair = trade.market.toUpperCase()
          const price = parseFloat(trade.price)
          const volume = parseFloat(trade.volume)
          const total = volume * price
          const date = moment(trade.at * 1000).format('YYYY-MM-DD HH:mm:ss')
          const side = member_id === trade.ask_member_id ? 'sell' : 'buy'

          exportData.push([
            date,
            pair,
            intl.formatMessage({id: side}),
            price.toFixed(fixed),
            total.toFixed(fixed)
          ])
        }
        this.setState({exportData, exportReady: true})
      })
      .catch(error => {
        this.setState({exportData, exportReady: true})
      })
  }

  onChangeDate = (value, dateString) => {
    this.setState({from: _.isEmpty(dateString[0]) ? null : dateString[0]})
    this.setState({to: _.isEmpty(dateString[1]) ? null : dateString[1]})
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.fetchData(this.state)
    this.buildExportData()
  }

  onSelectMarket = market => {
    if (market === 'All') {
      this.setState({market: null, page: 1, pagination: {current: 1}})
    } else {
      this.setState({market, page: 1})
    }
  }

  onSearch = () => {
    this.fetchData(this.state)
  }

  onReset = () => {
    const to = new Date()
    const from = new Date(to.getTime() - (7 * 24 * 60 * 60 * 1000))
    this.setState({from, to, market: null, page: 1, pagination: {current: 1}})
    this.fetchData({from, to, market: null, page: 1})
  }

  getOptions = () => {
    let options = [<Option value={'All'} key={'All'}><FormattedMessage id="all"/></Option>]
    for (let i = 0; i < MARKETS.length; i++) {
      if (MARKETS[i].visible) {
        options.push(<Option value={MARKETS[i].code} key={MARKETS[i].id}>{MARKETS[i].name}</Option>)
      }
    }
    return options
  }

  render() {
    const {intl} = this.props
    const {loader, from, to, trades, market, exportData, exportReady, pagination} = this.state
    let options = this.getOptions()

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="trade.history"/></h1>
        <Spin spinning={loader} size="large">
          <Row className="gx-flex-row gx-align-items-center">
            <Col xl={6} lg={16} sm={24} xs={24} className="gx-mb-3">
              <label className="gx-mr-2"><FormattedMessage id="date"/>:</label>
              <RangePicker
                style={{width: '80%'}}
                value={[moment(from, 'YYYY-MM-DD'), moment(to, 'YYYY-MM-DD')]}
                onChange={this.onChangeDate}/>
            </Col>
            <Col xl={4} lg={10} sm={10} xs={16} className="gx-mb-3">
              <label className="gx-mr-2"><FormattedMessage id="pair"/>:</label>
              <Select style={{width: '70%'}}
                      defaultValue={intl.formatMessage({id: 'all'})}
                      value={market ? market : intl.formatMessage({id: 'all'})}
                      onChange={this.onSelectMarket}>
                {options}
              </Select>
            </Col>
            <Col xl={6} lg={14} sm={14} xs={24} className="gx-mb-3">
              <Button type="primary" className="gx-mb-0" onClick={() => this.onSearch()}>
                <FormattedMessage id="search"/>
              </Button>
              <Button className="gx-mb-0" onClick={() => this.onReset()}>
                <FormattedMessage id="reset"/>
              </Button>
            </Col>
            <Col xl={8} lg={12} sm={12} xs={24} className="gx-mb-3 gx-text-right">
              {
                exportReady &&
                <CSVLink
                  data={exportData}
                  filename={`${convertToDate(new Date())}_trades.csv`}>
                  {intl.formatMessage({id: 'export.trade.history'})}
                </CSVLink>
              }
            </Col>
          </Row>
          <TradeHistoryTable
            pagination={pagination}
            dataList={trades}
            onChange={this.onChangeTable}
          />
        </Spin>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TradeHistory))
