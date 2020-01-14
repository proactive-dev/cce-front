import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { NAV_STYLES } from '../../constants/ThemeSetting'
import { EXCHANGE, MARKETS } from '../../constants/Paths'
import { ORDER_MENUS, WALLET_MENUS } from '../../constants/Menus'

const SubMenu = Menu.SubMenu

class HorizontalNav extends Component {

  state = {
    authStatus: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {authStatus} = nextProps
    if (authStatus !== prevState.authStatus) {
      return {authStatus}
    }
    return null
  }

  render() {
    const {pathname, navStyle} = this.props
    const {authStatus} = this.state
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]
    const navStyleClass = NAV_STYLES[navStyle] || NAV_STYLES['default']

    return (
      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">
        <Menu.Item key={MARKETS}>
          <Link to={`/${MARKETS}`}>
            <FormattedMessage id="markets"/>
          </Link>
        </Menu.Item>
        <Menu.Item key={EXCHANGE}>
          <Link to={`/${EXCHANGE}`}>
            <FormattedMessage id="exchange"/>
          </Link>
        </Menu.Item>
        {
          authStatus &&
          <SubMenu
            className={navStyleClass}
            key="wallet"
            title={
              <FormattedMessage id="wallet"/>
            }>
            {
              WALLET_MENUS.map(({path, title}) =>
                <Menu.Item key={path}>
                  <Link to={`/${path}`}>
                    <FormattedMessage id={title}/>
                  </Link>
                </Menu.Item>
              )
            }
          </SubMenu>
        }
        {
          authStatus &&
          <SubMenu
            className={navStyleClass}
            key="history"
            title={
              <FormattedMessage id="orders"/>
            }>
            {
              ORDER_MENUS.map(({path, title}) =>
                <Menu.Item key={path}>
                  <Link to={`/${path}`}>
                    <FormattedMessage id={title}/>
                  </Link>
                </Menu.Item>
              )
            }
          </SubMenu>
        }
      </Menu>
    )
  }
}

HorizontalNav.propTypes = {}

const mapStateToProps = ({settings, user}) => {
  const {pathname, navStyle} = settings
  const {authStatus} = user
  return {pathname, navStyle, authStatus}
}

export default connect(mapStateToProps)(HorizontalNav)
