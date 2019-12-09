import React, { Component } from 'react'
import { Divider } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { API_DOC_URL, SITE_CONTACT } from '../constants/AppConfigs'

class FooterMenu extends Component {

  render() {
    return (
      <div className='footer-menu-item gx-p-2'>
        <Link to="/terms"><FormattedMessage id='terms'/></Link>
        <Divider type="vertical"/>
        <Link to="/privacy"><FormattedMessage id='privacy'/></Link>
        <Divider type="vertical"/>
        <Link to="/fees"><FormattedMessage id='fees'/></Link>
        <Divider type="vertical"/>
        <Link to="/trading-rules"><FormattedMessage id='trading.rules'/></Link>
        <Divider type="vertical"/>
        <a href={API_DOC_URL}><FormattedMessage id='api'/></a>
        <Divider type="vertical"/>
        <a href={`mailto:${SITE_CONTACT}`}><FormattedMessage id='support'/></a>
      </div>
    )
  }
}

export default FooterMenu
