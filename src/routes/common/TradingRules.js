import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

class TradingRules extends React.Component {
  render() {
    const {intl} = this.props

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="trading.rules"/></h1>
        {/* Components */}
      </div>
    )
  }
}

export default injectIntl(TradingRules)
