import React from 'react'
import { FormattedMessage } from 'react-intl'

const Error503 = () => (
  <div className="gx-page-error-container">
    <div className="gx-page-error-content">
      <div className="gx-error-code">503</div>
      <h2 className="gx-text-center">
        <FormattedMessage id="error.503"/>
      </h2>
    </div>
  </div>
)

export default Error503
