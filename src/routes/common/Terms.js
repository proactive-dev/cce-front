import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

class Terms extends React.Component {
  render() {
    const {intl} = this.props

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="terms"/></h1>
        {/* Components */}
      </div>
    )
  }
}

export default injectIntl(Terms)
