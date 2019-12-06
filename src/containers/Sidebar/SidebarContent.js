import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import CustomScrollbars from '../../components/CustomScrollbars'
import SidebarLogo from './SidebarLogo'
import Auxiliary from 'util/Auxiliary'
import { THEME_TYPE_LITE } from '../../constants/ThemeSetting'

const SubMenu = Menu.SubMenu

class SidebarContent extends Component {

  render() {
    const {themeType, pathname} = this.props
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
              <Menu.Item key="markets">
                <Link to="/markets">
                  <FormattedMessage id="markets"/>
                </Link>
              </Menu.Item>
              <Menu.Item key="exchange">
                <Link to="/exchange">
                  <FormattedMessage id="exchange"/>
                </Link>
              </Menu.Item>
              <SubMenu
                key="wallet"
                title={
                  <FormattedMessage id="wallet"/>
                }>
                <Menu.Item key="wallet/balances">
                  <Link to="/wallet/balances">
                    <FormattedMessage id="balances"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key="wallet/deposit">
                  <Link to="/wallet/deposit">
                    <FormattedMessage id="deposit"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key="wallet/withdrawal">
                  <Link to="/wallet/withdrawal">
                    <FormattedMessage id="withdrawal"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key="wallet/transactions">
                  <Link to="/wallet/transactions">
                    <FormattedMessage id="transactions"/>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="history"
                title={
                  <FormattedMessage id="orders"/>
                }>
                <Menu.Item key="history/open-order">
                  <Link to="/history/open-order">
                    <FormattedMessage id="open.orders"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key="history/order">
                  <Link to="/history/order">
                    <FormattedMessage id="order.history"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key="history/trade">
                  <Link to="/history/trade">
                    <FormattedMessage id="trade.history"/>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="referral">
                <Link to="/referral">
                  <FormattedMessage id="referral"/>
                </Link>
              </Menu.Item>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    )
  }
}

SidebarContent.propTypes = {}
const mapStateToProps = ({settings}) => {
  return settings
}

export default connect(mapStateToProps)(SidebarContent)
