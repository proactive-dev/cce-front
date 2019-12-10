import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Spin } from 'antd'
import SimpleMarketInfo from '../../components/SimpleMarketInfo'
import _ from 'lodash'

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

  componentDidMount() {
    //this.props.getAuthStatus()
  }

  render() {
    const {loader, tickers} = this.state

    return (
      <div>
        <SimpleMarketInfo tickers={tickers}/>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
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
