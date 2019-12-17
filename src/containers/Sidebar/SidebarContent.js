import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import CustomScrollbars from '../../components/CustomScrollbars'
import SidebarLogo from './SidebarLogo'
import Auxiliary from 'util/Auxiliary'
import { THEME_TYPE_LITE } from '../../constants/ThemeSetting'
import { COIN_CASTING, EXCHANGE, LOGOUT, MARKETS, PRIZE_CENTER } from '../../constants/Paths'
import { AUTH_MENUS, ORDER_MENUS, PLD_MENUS, TSF_MENUS, USER_MENUS, WALLET_MENUS } from '../../constants/Menus'
import LogoutMenu from '../../components/LogoutMenu'
import PrizeCenterMenu from '../../components/PrizeCenterMenu'

const SubMenu = Menu.SubMenu

class SidebarContent extends Component {

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
    const {themeType, pathname} = this.props
    const {authStatus} = this.state
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
                  key="tsf"
                  title={'TSF'}>
                  {
                    TSF_MENUS.map(({path, title}) =>
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
                  key="pld"
                  title={'PLD'}>
                  {
                    PLD_MENUS.map(({path, title}) =>
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
                <Menu.Item key={COIN_CASTING}>
                  <Link to={`/${COIN_CASTING}`}>
                    <FormattedMessage id="coin.casting"/>
                  </Link>
                </Menu.Item>
              }
              {
                authStatus &&
                <Menu.Item key={PRIZE_CENTER}>
                  <PrizeCenterMenu/>
                </Menu.Item>
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
  const {authStatus} = user
  return {pathname, navStyle, authStatus}
}

export default connect(mapStateToProps)(SidebarContent)
