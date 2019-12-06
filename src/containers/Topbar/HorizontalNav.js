import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { NAV_STYLE_INSIDE_HEADER_HORIZONTAL } from '../../constants/ThemeSetting'

const SubMenu = Menu.SubMenu

class HorizontalNav extends Component {

  getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve'
      default:
        return 'gx-menu-horizontal'
    }
  }

  render() {
    const {pathname, navStyle} = this.props
    const selectedKeys = pathname.substr(1)
    const defaultOpenKeys = selectedKeys.split('/')[1]
    const navStyleClass = this.getNavStyleSubMenuClass(navStyle)

    return (
      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal">
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
          className={navStyleClass}
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
              <FormattedMessage id="transaction.history"/>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          className={navStyleClass}
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
    )
  }
}

HorizontalNav.propTypes = {}
const mapStateToProps = ({settings}) => {
  return settings
}

export default connect(mapStateToProps)(HorizontalNav)
