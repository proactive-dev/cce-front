import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { FormattedMessage } from 'react-intl'
import HorizontalNav from './HorizontalNav'
import { toggleCollapsedSideNav } from '../../appRedux/actions/Setting'
import LanguageMenu from '../../components/LanguageMenu'
import TopUserMenu from '../../components/TopUserMenu'
import { AUTH_MENUS } from '../../constants/Menus'

const {Header} = Layout

class InsideHeader extends Component {

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
    const {navCollapsed} = this.props
    const {authStatus} = this.state

    return (
      <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
        <Header
          className="gx-header-horizontal-main">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
              <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
                <i className="gx-icon-btn icon icon-menu"
                   onClick={() => {
                     this.props.toggleCollapsedSideNav(!navCollapsed)
                   }}
                />
              </div>
              <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
                <img alt="" src={require('assets/images/w-logo.png')}/>
              </Link>
              <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                <img alt="" src={require('assets/images/logo.png')}/>
              </Link>

              <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
                <HorizontalNav/>
              </div>
              <ul className="gx-header-notifications gx-ml-auto">
                {
                  !authStatus &&
                  AUTH_MENUS.map(({path, title}) =>
                    <li className="gx-d-none gx-d-lg-block gx-language" key={path}>
                      <Link to={`/${path}`}>
                        <FormattedMessage id={title}/>
                      </Link>
                    </li>
                  )
                }
                <li className="gx-language">
                  <LanguageMenu/>
                </li>
                {
                  authStatus &&
                  <li className="gx-language gx-d-none gx-d-lg-block">
                    <TopUserMenu/>
                  </li>
                }
              </ul>
            </div>
          </div>
        </Header>
      </div>
    )
  }
}

const mapStateToProps = ({settings, user}) => {
  const {navCollapsed} = settings
  const {authStatus} = user
  return {navCollapsed, authStatus}
}
export default connect(mapStateToProps, {toggleCollapsedSideNav})(InsideHeader)
