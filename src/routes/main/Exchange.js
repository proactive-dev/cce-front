import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin } from 'antd'
import _ from 'lodash'
import { getAuthStatus } from '../../appRedux/actions/User'
import { MARKETS } from '../../constants/Markets'

class Exchange extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      market: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  componentDidMount() {
    // this.props.getAuthStatus()
    let marketId = this.props.match.params.market
    let market
    if (!_.isEmpty(marketId) && !_.isUndefined(marketId)) {
      market = MARKETS.find(market => market.id === marketId)
      this.setState({market})
    }
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="exchange"/></h1>
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

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Exchange))
