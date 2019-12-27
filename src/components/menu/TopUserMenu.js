import React, { Component } from 'react'
import { Avatar, Popover } from 'antd'
import { withRouter } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import { logout } from '../../api/axiosAPIs'
import { IconNotification } from '../common/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import { LOGIN, LOGOUT } from '../../constants/Paths'
import { USER_MENUS } from '../../constants/Menus'

class TopUserMenu extends Component {

  doLogout = () => {
    logout()
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'auth.logout.success'}))
        this.props.history.push(`/${LOGIN}`)
      })
  }

  onClick = (path) => {
    if (path === LOGOUT) {
      this.doLogout()
    } else {
      this.props.history.push(`/${path}`)
    }
  }

  render() {
    const menuContents = (
      <ul className="gx-sub-popover">
        {
          USER_MENUS.map(({path, title}) =>
            <li className="gx-media gx-pointer gx-p-2"
                key={path}
                onClick={() => this.onClick(path)}>
              <FormattedMessage id={title}/>
            </li>
          )
        }
        <li className="gx-media gx-pointer gx-p-2" onClick={() => this.onClick(LOGOUT)}>
          <FormattedMessage id='auth.logout'/>
        </li>
      </ul>
    )

    return (
      <Popover
        overlayClassName="gx-popover-horizontal"
        placement="bottomRight"
        content={menuContents}
        trigger="click">
        <Avatar className="gx-avatar gx-pointer" icon='user' alt=""/>
      </Popover>
    )
  }
}

export default withRouter(injectIntl(TopUserMenu))
