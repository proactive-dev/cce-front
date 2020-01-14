import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Modal, Row } from 'antd'
import QRCode from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import _ from 'lodash'

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

  onCopied = () => {
    this.props.onCopy()
  }

  getDepositAddress = (account, defaultValue = '') => {
    return (!_.isEmpty(account.payment_address) && !_.isEmpty(account.payment_address.deposit_address)) ? account.payment_address.deposit_address : defaultValue
  }

  render() {
    const {symbol, account, intl} = this.props
    const depositAddress = this.getDepositAddress(account, intl.formatMessage({id: 'alert.emptyData'}))
    return (
      <div>
        <h5>{symbol.toUpperCase()} <FormattedMessage id="deposit.address"/>:</h5>
        <p className={'gx-border gx-mt-3 gx-mb-5 gx-p-2 h4'} style={{wordBreak: 'break-all'}}>
          {account.payment_address.deposit_address}
        </p>
        <Row type="flex" justify='center'>
          <Col>
            <Button type="normal" icon={'qrcode'} onClick={this.showQRCode}>
              <FormattedMessage id="show.qrcode"/>
            </Button>
            <CopyToClipboard
              text={depositAddress}
              onCopy={this.onCopied}>
              <Button type="normal" icon={'copy'}>
                <FormattedMessage id="copy.address"/>
              </Button>
            </CopyToClipboard>
          </Col>
        </Row>
        <div className={'gx-mt-4 gx-mb-3 gx-ml-2 gx-mr-2 gx-text-warning'}>
          <FormattedMessage id="important"/>
          <ul className={'gx-mt-2'}>
            <li><FormattedMessage id="deposit.important"/></li>
          </ul>
        </div>
        <Modal
          visible={this.state.visibleQRCode}
          footer={null}
          onOk={this.closeQRCode}
          onCancel={this.closeQRCode}>
          <div className={'gx-text-center'}>
            <h5 className={'gx-m-2'}>{symbol.toUpperCase()} {intl.formatMessage({id: 'deposit.address'})}</h5>
            <br/>
            <QRCode
              value={this.getDepositAddress(account, intl.formatMessage({id: 'alert.emptyData'}))}
              size={200}
              level='H'/>
            <br/>
            <h5 className={'gx-m-2'}>{depositAddress}</h5>
          </div>
        </Modal>
      </div>
    )
  }
}

export default injectIntl(DepositAddress)
