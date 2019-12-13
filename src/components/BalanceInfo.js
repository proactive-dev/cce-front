import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Col, Row } from 'antd'
import _ from 'lodash'
import { getFixed } from '../util/helpers'

class BalanceInfo extends React.Component {
  render() {
    const {account, symbol} = this.props
    const symStr = symbol.toUpperCase()
    const balance = !_.isEmpty(account) ? getFixed(parseFloat(account.balance), parseInt(account.currency.precision)) : 0.0
    const locked = !_.isEmpty(account) ? getFixed(parseFloat(account.locked), parseInt(account.currency.precision)) : 0.0
    const total = !_.isEmpty(account) ? getFixed(parseFloat(account.balance) + parseFloat(account.locked), parseInt(account.currency.precision)) : 0.0
    return (
      <div className={'gx-mt-4 gx-m4-2'}>
        <Row className={'gx-m-1'}>
          <Col span={12}>
            <FormattedMessage id="balance.total"/>
          </Col>
          <Col span={12}>
            {total}&nbsp;{symStr}
          </Col>
        </Row>
        <Row className={'gx-m-1'}>
          <Col span={12}>
            <FormattedMessage id="balance.available"/>
          </Col>
          <Col span={12}>
            {balance}&nbsp;{symStr}
          </Col>
        </Row>
        <Row className={'gx-m-1'}>
          <Col span={12}>
            <FormattedMessage id="locked"/>
          </Col>
          <Col span={12}>
            {locked}&nbsp;{symStr}
          </Col>
        </Row>
      </div>
    )
  }
}

export default injectIntl(BalanceInfo)
