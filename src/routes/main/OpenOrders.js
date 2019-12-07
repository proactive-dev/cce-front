import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Spin } from 'antd'

class OpenOrders extends React.Component {
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
        <h2 className="title gx-mb-4"><FormattedMessage id="open.orders"/></h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OpenOrders))
