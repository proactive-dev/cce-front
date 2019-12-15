import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin } from 'antd'
import _ from 'lodash'
import { getAuthStatus } from '../../appRedux/actions/User'

class Transactions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      kind: 0 // 0: deposit, 1: withdrawal
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

    const {location} = this.props
    if (!_.isEmpty(location.state) && !_.isEmpty(location.state.kind)) {
      this.setState({kind: location.state.kind})
    }
  }

  render() {
    const {intl} = this.props
    const {loader, kind} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="transaction.history"/></h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Transactions))
