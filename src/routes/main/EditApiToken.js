import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Form, Input, Spin } from 'antd'
import _ from 'lodash'
import { IconNotification } from '../../components/IconNotification'
import { updateApiToken } from '../../api/axiosAPIs'
import { getAuthStatus } from '../../appRedux/actions/User'
import { SUCCESS } from '../../constants/AppConfigs'
import { API_TOKENS } from '../../constants/Paths'

class EditApiToken extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      id: null
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

    const {location} = this.props
    if (!_.isEmpty(location.state) && !_.isEmpty(location.state.token)) {
      const {token} = location.state
      this.props.form.setFieldsValue({
        label: token.label,
        accessKey: token.accessKey,
        ip: token.ipString
      })
      this.setState({id: token.id})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {id} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = new FormData()
        formData.append('api_token[label]', values.label)
        formData.append('api_token[ip_whitelist]', values.ip)
        formData.append('two_factor[type]', 'app')
        formData.append('two_factor[otp]', values.twoFactor)
        formData.append('commit', 'Confirm')
        updateApiToken(id, formData)
          .then(response => {
            IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'update.token.success'}))
            this.props.history.push(`/${API_TOKENS}`)
          })
      }
    })
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form
    return (
      <div className="gx-mb-4">
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="update.token"/></h1>
        <Spin
          className={'gx-auth-container'}
          spinning={loader}
          size="large">
          <Card
            className={'gx-auth-content gx-text-center'}
            bordered={false}>
            <img className='gx-mb-3' alt="" src={require('assets/images/api.png')}/>
            <br/>
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
                label={intl.formatMessage({id: 'access.key'})}
                className={'gx-mt-2'}>
                {getFieldDecorator('accessKey', {
                  rules: []
                })(
                  <Input readOnly/>
                )}
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({id: 'ip.whitelist'})}
                className={'gx-mt-2'}>
                {getFieldDecorator('ip', {
                  rules: []
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

const WrappedEditApiTokenForm = Form.create()(EditApiToken)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedEditApiTokenForm))
