import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Card, Spin } from 'antd'
import _ from 'lodash'
import MarketOverview from '../../components/MarketOverview'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      tickers: {}
    }
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

  render() {
    const {loader, tickers} = this.state
    return (
      <Spin spinning={loader} size="large">
        <Card
          className="gx-card-full gx-card-widget gx-m-2 gx-p-1"
          bordered={false}>
          <MarketOverview tickers={tickers}/>
        </Card>
      </Spin>
    )
  }
}

const mapStateToProps = ({progress, markets}) => {
  return {
    loader: progress.loader,
    tickers: markets.tickers
  }
}

export default connect(mapStateToProps, null)(injectIntl(Home))
