import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import CustomScrollbars from '../../components/CustomScrollbars'
import SidebarLogo from './SidebarLogo'
import Auxiliary from 'util/Auxiliary'
import { THEME_TYPE_LITE } from '../../constants/ThemeSetting'
import {
  BALANCES,
  DEPOSIT,
  EXCHANGE,
  MARKETS,
  OPEN_ORDERS,
  ORDER_HISTORY,
  REFERRAL,
  TRADE_HISTORY,
  TRANSACTIONS,
  WITHDRAWAL
} from '../../constants/Paths'

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
              <SubMenu
                key="wallet"
                title={
                  <FormattedMessage id="wallet"/>
                }>
                <Menu.Item key={BALANCES}>
                  <Link to={`/${BALANCES}`}>
                    <FormattedMessage id="balances"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key={DEPOSIT}>
                  <Link to={`/${DEPOSIT}`}>
                    <FormattedMessage id="deposit"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key={WITHDRAWAL}>
                  <Link to={`/${WITHDRAWAL}`}>
                    <FormattedMessage id="withdrawal"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key={TRANSACTIONS}>
                  <Link to={`/${TRANSACTIONS}`}>
                    <FormattedMessage id="transaction.history"/>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="history"
                title={
                  <FormattedMessage id="orders"/>
                }>
                <Menu.Item key={OPEN_ORDERS}>
                  <Link to={`/${OPEN_ORDERS}`}>
                    <FormattedMessage id="open.orders"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key={ORDER_HISTORY}>
                  <Link to={`/${ORDER_HISTORY}`}>
                    <FormattedMessage id="order.history"/>
                  </Link>
                </Menu.Item>
                <Menu.Item key={TRADE_HISTORY}>
                  <Link to={`/${TRADE_HISTORY}`}>
                    <FormattedMessage id="trade.history"/>
                  </Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key={REFERRAL}>
                <Link to={`/${REFERRAL}`}>
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
