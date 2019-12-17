import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'

class AffiliateHistory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false
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
    this.props.getAuthStatus()
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="affiliate.history"/></h1>
        <Spin spinning={loader} size="large">
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AffiliateHistory))
