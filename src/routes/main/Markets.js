import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin } from 'antd'

class Markets extends React.Component {
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

  render() {
    const {intl} = this.props
    const {loader} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="markets"/></h1>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
      </div>
    )
  }
}

const mapStateToProps = ({progress, markets}) => {
  return {
    loader: progress.loader,
    tickers: markets.tickers
  }
}

export default connect(mapStateToProps, null)(injectIntl(Markets))
