import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import CustomScrollbars from '../../components/common/CustomScrollbars'
import SidebarLogo from './SidebarLogo'
import Auxiliary from 'util/Auxiliary'
import { THEME_TYPE_LITE } from '../../constants/ThemeSetting'
import { ADMIN, EXCHANGE, LOGOUT, MARKETS } from '../../constants/Paths'
import { AUTH_MENUS, ORDER_MENUS, USER_MENUS, WALLET_MENUS } from '../../constants/Menus'
import LogoutMenu from '../../components/menu/LogoutMenu'
import AdminMenu from '../../components/menu/AdminMenu'

const SubMenu = Menu.SubMenu

class SidebarContent extends Component {

  state = {
    authStatus: false,
    profile: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {authStatus, profile} = nextProps
    if ((authStatus !== prevState.authStatus) || (profile !== prevState.profile)) {
      return {authStatus, profile}
    }
    return null
  }

  render() {
    const {themeType, pathname} = this.props
    const {authStatus, profile} = this.state
    const {isAdmin} = profile || {}
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]
    return (
      <Auxiliary>
        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">
              {
                authStatus && isAdmin &&
                <Menu.Item key={ADMIN}>
                  <AdminMenu noIcon={true}/>
                </Menu.Item>
              }
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
              {
                authStatus &&
                <SubMenu
                  key="user"
                  title={
                    <FormattedMessage id="user"/>
                  }>
                  {
                    USER_MENUS.map(({path, title}) =>
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
                !authStatus &&
                AUTH_MENUS.map(({path, title}) =>
                  <Menu.Item key={path}>
                    <Link to={`/${path}`}>
                      <FormattedMessage id={title}/>
                    </Link>
                  </Menu.Item>
                )
              }
              {
                authStatus &&
                <Menu.Item key={LOGOUT}>
                  <LogoutMenu noIcon={true}/>
                </Menu.Item>
              }
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    )
  }
}

SidebarContent.propTypes = {}

const mapStateToProps = ({settings, user}) => {
  const {pathname, navStyle} = settings
  const {authStatus, profile} = user
  return {pathname, navStyle, authStatus, profile}
}

export default connect(mapStateToProps)(SidebarContent)
