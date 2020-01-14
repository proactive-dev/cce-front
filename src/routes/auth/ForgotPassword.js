import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Alert, Button, Form, Icon, Input, Spin } from 'antd'
import { connect } from 'react-redux'
import { forgotPassword } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/common/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import { RESET_PWD_SUCCESS } from '../../constants/ResponseCode'

const FormItem = Form.Item

class ForgotPassword extends Component {

  state = {
    confirmDirty: false,
    loader: false
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
        this.doForgotPassword(values)
      }
    })
  }

  doForgotPassword = (data) => {
    let formData = new FormData()
    formData.append('reset_password[email]', data.email)
    forgotPassword(formData)
      .then(response => {
        const {code} = response.data
        if (code === RESET_PWD_SUCCESS) {
          IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'auth.forgotPassword.success'}))
        }
      })
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form

    return (
      <div className="gx-text-center gx-mb-2">
        <h1 className="gx-m-5"><FormattedMessage id="auth.forgotPassword"/></h1>
        <Spin className="gx-auth-container" spinning={loader} size="large">
          <Form
            className="gx-auth-content gx-text-left"
            layout="vertical"
            onSubmit={this.handleSubmit}>
            <Alert
              className='gx-mt-2 gx-mb-4'
              type="warning"
              showIcon
              message={intl.formatMessage({id: 'auth.forgotPassword.desc'})}/>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: intl.formatMessage({id: 'alert.invalidEmail'})
                }, {
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder={intl.formatMessage({id: 'email'})}/>
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

const WrappedForgotPasswordForm = Form.create()(ForgotPassword)

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(
  mapStateToProps,
  null
)(
  injectIntl(WrappedForgotPasswordForm)
)
