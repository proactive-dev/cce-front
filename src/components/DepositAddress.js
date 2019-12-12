import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Icon, Modal, Row, Typography } from 'antd'
import QRCode from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import _ from 'lodash'

const {Text} = Typography

class DepositAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visibleQRCode: false
    }
  }

  showQRCode = () => {
    this.setState({
      visibleQRCode: true
    })
  }

  closeQRCode = e => {
    this.setState({
      visibleQRCode: false
    })
  }

  copyQRCode = () => {
    this.props.onCopyQRCode(this.props.intl.formatMessage({id: 'alert.copied'}))
  }

  getDepositeAddress = (account, defaultValue) => {
    return !_.isEmpty(account.payment_address) ? account.payment_address.deposit_address : defaultValue
  }

  render() {
    const {symbol, account, intl} = this.props
    const depositAddress = this.getDepositeAddress(account, '')
    return (
      <div>
        <div>
          <Text strong>{symbol.toUpperCase()} <FormattedMessage id="deposit.address"/>:</Text><br/>
        </div>
        <div className={'gx-mt-2 gx-text-warning gx-fs-lg'}>
          <strong>{account.payment_address.deposit_address}</strong>
        </div>
        <Row type="flex" justify='center' className={'gx-mt-3'}>
          <Col>
            <Button type="normal" onClick={this.showQRCode}>
              <Icon type="qrcode"/>
              <FormattedMessage id="show.qrcode"/>
            </Button>
            <CopyToClipboard
              text={depositAddress}
              onCopy={() => this.copyQRCode()}
            >
              <Button type="normal">
                <Icon type="copy"/>
                <FormattedMessage id="copy.address"/>
              </Button>
            </CopyToClipboard>
          </Col>
        </Row>
        <div>
          <Text type="warning"><FormattedMessage id="important"/></Text>
          <ul type='warning' className={'gx-mt-2'}>
            <li className={'gx-text-warning'}><FormattedMessage id="deposit.important"/></li>
          </ul>
        </div>
        <Modal
          visible={this.state.visibleQRCode}
          footer={null}
          onOk={this.closeQRCode}
          onCancel={this.closeQRCode}
        >
          <Row type="flex" justify='center'>
            <Col align={'center'}><Text
              strong>{symbol.toUpperCase()} {intl.formatMessage({id: 'deposit.address'})}</Text></Col>
          </Row>
          <br/>
          <Row type="flex" justify='center'>
            <Col>
              <QRCode
                value={this.getDepositeAddress(account, intl.formatMessage({id: 'alert.emptyData'}))}
                size={200}
                level='H'
              />
            </Col>
          </Row>
          <br/>
          <Row type="flex" justify='center'>
            <Col><Text strong>{depositAddress}</Text></Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default injectIntl(DepositAddress)
