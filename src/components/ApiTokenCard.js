import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button, Card } from 'antd'
import { API_TOKENS } from '../constants/Paths'
import { API_DOC_URL } from '../constants/AppConfigs'

class ApiTokenCard extends Component {

  render() {
    const {intl} = this.props

    return (
      <Card
        className='gx-card-widget gx-h-100'
        title={intl.formatMessage({id: 'api.tokens'})}>
        <FormattedMessage id="api.tokens.description"/>
        <Link to={`${API_DOC_URL}`} className="gx-m-1"><FormattedMessage id='api.doc'/></Link>
        <Button
          type='primary'
          className="gx-w-100 gx-mt-4"
          href={`/${API_TOKENS}`}>
          <FormattedMessage id="manage"/>
        </Button>
      </Card>
    )
  }
}

export default injectIntl(ApiTokenCard)
