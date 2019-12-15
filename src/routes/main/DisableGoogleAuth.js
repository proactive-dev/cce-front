import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Alert, Button, Form, Icon, Input, Spin } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { disableGoogleAuth } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import { USER } from '../../constants/Paths'

const FormItem = Form.Item

class DisableGoogleAuth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.doDisableGoogleAuth(values)
      }
    })
  }

  doDisableGoogleAuth = (data) => {
    let formData = new FormData()
    formData.append('_method', 'delete')
    formData.append('two_factor[type]', 'app')
    formData.append('two_factor[otp]', data.authCode)
    formData.append('commit', 'Disable')

    disableGoogleAuth(formData)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: '2fa.disable.success'}))
        this.props.history.push(`/${USER}`)
      })
  }

  componentDidMount() {
    this.props.getAuthStatus()
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form

    return (
      <div className="gx-text-center">
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="disable.google.auth"/></h1>
        <Spin className="gx-auth-container gx-mb-4" spinning={loader} size="large">
          <Form
            className="gx-auth-content gx-text-left"
            layout="vertical"
            onSubmit={this.handleSubmit}>
            <Alert
              className='gx-mt-2 gx-mb-4'
              type="warning"
              showIcon
              message={intl.formatMessage({id: 'auth.forgotPassword.desc'})}/>
            <FormItem
              label={intl.formatMessage({id: 'google.auth.code'})}>
              {getFieldDecorator('authCode', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input prefix={<Icon type="google" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder={intl.formatMessage({id: 'google.auth.code'})}/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" className="auth-form-button" htmlType="submit">
                <FormattedMessage id="send"/>
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    )
  }
}

const WrappedDisableGoogleAuthForm = Form.create()(DisableGoogleAuth)
const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedDisableGoogleAuthForm))
