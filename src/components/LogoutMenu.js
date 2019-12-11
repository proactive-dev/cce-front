import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import { logout } from '../api/axiosAPIs'
import { LOGIN } from '../constants/Paths'
import { SUCCESS } from '../constants/AppConfigs'
import { IconNotification } from './IconNotification'

class LogoutMenu extends Component {

  doLogout = () => {
    logout()
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'auth.logout.success'}))
        this.props.history.push(`/${LOGIN}`)
      })
  }

  render() {
    return (
      <Link to="#" onClick={this.doLogout}>
        {!this.props.noIcon && <i className="icon icon-close-circle"/>}
        <FormattedMessage id="auth.logout"/>
      </Link>
    )
  }
}

export default withRouter(injectIntl(LogoutMenu))
