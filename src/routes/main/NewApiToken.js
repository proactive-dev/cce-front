import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Form, Icon, Input, Modal, Spin } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getAuthStatus } from '../../appRedux/actions/User'
import { newApiToken } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import { API_TOKENS } from '../../constants/Paths'

class NewApiToken extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      visibleToken: false,
      token: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  componentDidMount() {
    this.props.getAuthStatus()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = new FormData()
        formData.append('api_token[label]', values.label)
        formData.append('two_factor[type]', 'app')
        formData.append('two_factor[otp]', values.twoFactor)
        formData.append('commit', 'Confirm')
        let that = this
        newApiToken(formData)
          .then(response => {
            const token = response.data
            that.setState({visibleToken: true, token: token})
            IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'new.token.success'}))
          })
      }
    })
  }

  onAccessKeyCopied = () => {
    IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'copy.access.key.success'}))
  }

  onSecretKeyCopied = () => {
    IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'copy.secret.key.success'}))
  }

  onModalClose = () => {
    this.setState({visibleToken: false, token: null})
    this.props.history.push(`/${API_TOKENS}`)
  }

  render() {
    const {intl} = this.props
    const {loader, token, visibleToken} = this.state
    const {getFieldDecorator} = this.props.form
    const accessKey = token ? token.access_key : intl.formatMessage({id: 'unknown'})
    const secretKey = token ? token.secret_key : intl.formatMessage({id: 'unknown'})

    return (
      <div className="gx-mb-4">
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="create.token"/></h1>
        <Spin
          className={'gx-auth-container'}
          spinning={loader}
          size="large">
          <Card
            className={'gx-auth-content gx-text-center'}
            bordered={false}>
            <img className='gx-mb-3' alt="api" src={require('assets/images/api.png')}/>
            <br/>
            <span className='gx-fs-lg'><FormattedMessage id="api.tokens.create.description"/></span>
            <Form
              className="gx-text-left"
              onSubmit={this.handleSubmit}>
              <Form.Item
                label={intl.formatMessage({id: 'label'})}
                className={'gx-mt-2'}>
                {getFieldDecorator('label', {
                  rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                })(
                  <Input/>
                )}
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({id: 'google.auth.code'})}
                className={'gx-mt-2'}>
                {getFieldDecorator('twoFactor', {
                  rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                })(
                  <Input/>
                )}
              </Form.Item>
              <Button type="primary" className='auth-form-button gx-mt-1' htmlType="submit">
                <FormattedMessage id="submit"/>
              </Button>
            </Form>
          </Card>
        </Spin>
        <Modal
          visible={visibleToken}
          title={intl.formatMessage({id: 'success'})}
          onOk={this.onModalClose}
          onCancel={this.onModalClose}
          cancelButtonProps={{hidden: true}}>
          <h4 className='gx-text-primary'>{intl.formatMessage({id: 'create.api.desc1'})}</h4>
          <h4 className='gx-text-primary'>{intl.formatMessage({id: 'create.api.desc2'})}</h4>
          <Input
            className={'gx-m-1'}
            addonBefore={intl.formatMessage({id: 'access.key'})}
            addonAfter={
              <CopyToClipboard
                text={accessKey}
                onCopy={this.onAccessKeyCopied}>
                <Icon type="copy"/>
              </CopyToClipboard>
            }
            defaultValue={accessKey}
            readOnly/>
          <Input
            className={'gx-m-1'}
            addonBefore={intl.formatMessage({id: 'secret.key'})}
            addonAfter={
              <CopyToClipboard
                text={secretKey}
                onCopy={this.onSecretKeyCopied}>
                <Icon type="copy"/>
              </CopyToClipboard>
            }
            defaultValue={secretKey}
            readOnly/>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

const WrappedNewApiTokenForm = Form.create()(NewApiToken)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedNewApiTokenForm))
