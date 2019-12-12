import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Col, Row } from 'antd'
import _ from 'lodash'
import { getFixed } from '../util/helpers'

class BalanceInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {account, symbol} = this.props
    const balance = !_.isEmpty(account) ? getFixed(parseFloat(account.balance), parseInt(account.currency.precision)) : 0.0
    const locked = !_.isEmpty(account) ? getFixed(parseFloat(account.locked), parseInt(account.currency.precision)) : 0.0
    const total = !_.isEmpty(account) ? getFixed(parseFloat(account.balance) + parseFloat(account.locked), parseInt(account.currency.precision)) : 0.0
    return (
      <div className={'gx-mt-3'}>
        <Row>
          <Col span={12}>
            <p><FormattedMessage id="balance.total"/></p>
          </Col>
          <Col span={12}>
            <p>{total}&nbsp;{symbol.toUpperCase()}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p><FormattedMessage id="balance.available"/></p>
          </Col>
          <Col span={12}>
            <p>{balance}&nbsp;{symbol.toUpperCase()}</p>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p><FormattedMessage id="locked"/></p>
          </Col>
          <Col span={12}>
            <p>{locked}&nbsp;{symbol.toUpperCase()}</p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default injectIntl(BalanceInfo)
