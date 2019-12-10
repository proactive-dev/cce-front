import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Col, Row, Spin } from 'antd'
import SimpleMarketInfo from '../../components/SimpleMarketInfo'
import _ from 'lodash'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      tickers: {}
    }
    this.baseFilter = ['bchusdt', 'btcusdt', 'ethusdt', 'xrpusdt', 'ltcusdt']
    this.symbolMap = {'bchusdt': 'bch', 'btcusdt': 'btc', 'ethusdt': 'eth', 'xrpusdt': 'xrp', 'ltcusdt': 'ltc'}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, tickers} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    if (!_.isEmpty(tickers) && tickers !== prevState.tickers) {
      return {tickers}
    }
    return null
  }

  componentDidMount() {
    this.props.getAuthStatus()
  }

  render() {
    const {loader, tickers} = this.state
    const {intl} = this.props
    return (
      <div>
        <SimpleMarketInfo tickers={tickers} baseFilter={this.baseFilter} symbolMap={this.symbolMap} symbol={'$'}/>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
        <br/>
        <Row type="flex" align="center">
          <Col><a href="/trade" className="text-active f-fl">{intl.formatMessage({id: 'view.all'})}</a></Col>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({progress, markets}) => {
  return {
    loader: progress.loader,
    tickers: markets.tickers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home))
