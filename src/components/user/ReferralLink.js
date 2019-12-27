import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Form } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IconNotification } from '../common/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'

const FormItem = Form.Item

class ReferralLink extends Component {

  onCopied() {
    IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'alert.copied'}))
  }

  render() {
    const {intl, link} = this.props

    return (
      <Card className="gx-card gx-mb-1" title={intl.formatMessage({id: 'referral.link'})}>
        <Form layout="inline">
          <FormItem
            className="gx-pl-2"
            label={intl.formatMessage({id: 'referral.link'})}>
            <span className="ant-form-text">{link}</span>
          </FormItem>
          <FormItem
            className="gx-ml-4">
            <CopyToClipboard
              style={{margin: 'auto'}}
              text={link}
              onCopy={() => this.onCopied()}>
              <Button type="primary">
                <FormattedMessage id="copy"/>
              </Button>
            </CopyToClipboard>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

const WrappedReferralLinkForm = Form.create()(ReferralLink)

export default injectIntl(WrappedReferralLinkForm)
