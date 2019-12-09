import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Layout } from 'antd'
import Sidebar from '../Sidebar/index'
import Topbar from '../Topbar/index'
import InsideHeader from '../Topbar/InsideHeader'
import BannerBar from '../BannerBar'
import FooterMenu from '../FooterMenu'
import AppRoute from '../../routes/index'
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE
} from '../../constants/ThemeSetting'
import { BANNERS, COPYRIGHT_COMPANY } from '../../constants/AppConfigs'

const {Content, Footer} = Layout

export class MainApp extends Component {

  getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'gx-container-wrap'
      default:
        return ''
    }
  }
  getNavStyles = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL :
        return <InsideHeader/>
      case NAV_STYLE_FIXED :
        return <Topbar/>
      case NAV_STYLE_DRAWER :
        return <Topbar/>
      case NAV_STYLE_MINI_SIDEBAR :
        return <Topbar/>
      default :
        return null
    }
  }

  getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar/>
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED :
        return <Sidebar/>
      case NAV_STYLE_DRAWER :
        return <Sidebar/>
      case NAV_STYLE_MINI_SIDEBAR :
        return <Sidebar/>
      default :
        return null
    }
  }

  render() {
    const {match, pathname, width, navStyle} = this.props

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar(navStyle, width)}
        <Layout>
          {this.getNavStyles(navStyle)}
          <Content className={`gx-layout-content ${this.getContainerClass(navStyle)} `}>
            {
              // show only for home page
              '/'.localeCompare(pathname) === 0 &&
              <BannerBar banners={BANNERS}/>
            }
            <AppRoute match={match}/>
            <Footer>
              <div className="gx-layout-footer-content gx-text-center">
                <FooterMenu/>
                <Divider/>
                © {new Date().getFullYear()} {COPYRIGHT_COMPANY}
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {width, navStyle, pathname} = settings
  return {width, navStyle, pathname}
}
export default connect(mapStateToProps)(MainApp)

