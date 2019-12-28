import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Card, Spin } from 'antd'
import _ from 'lodash'
import SimpleMarketInfo from '../../components/market/SimpleMarketInfo'
import { MARKETS } from '../../constants/Paths'

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
    if ((loader !== prevState.loader) || (!_.isEmpty(tickers) && tickers !== prevState.tickers)) {
      return {loader, tickers}
    }
    return null
  }

  render() {
    const {loader, tickers} = this.state
    return (
      <Spin spinning={loader} size="large">
        <Card
          className="gx-card-full gx-card-widget gx-m-1"
          bordered={false}>
          <SimpleMarketInfo tickers={tickers}/>
          <div className={'gx-m-4 gx-text-center'}>
            <Link to={`/${MARKETS}`}><FormattedMessage id='view.all'/></Link>
          </div>
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
