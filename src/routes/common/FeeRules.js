import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

class FeeRules extends React.Component {
  render() {
    const {intl} = this.props

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="fees"/></h1>
        {/* Components */}
      </div>
    )
  }
}

export default injectIntl(FeeRules)
