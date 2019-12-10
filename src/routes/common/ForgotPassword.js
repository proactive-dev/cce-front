import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button, Form, Icon, Input } from 'antd'
import { SITE_NAME, SUCCESS } from '../../constants/AppConfigs'
import { forgotPassword } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'

const FormItem = Form.Item

class ForgotPassword extends Component {

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
    formData.append('userId', data.id)
    forgotPassword(formData)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'auth.forgotPassword.success'}))
      })
  }

  render() {
    const {intl} = this.props
    const {getFieldDecorator} = this.props.form

    return (
      <div className="gx-auth-container">
        <div className="gx-auth-content">
          <div className="gx-auth-header gx-text-center">
            <Link to="/">
              <img src={require('assets/images/logo-white.png')} alt={SITE_NAME} title={SITE_NAME}/>
            </Link>
          </div>
          <div className="gx-text-center">
            <h2 className="gx-auth-title"><FormattedMessage id="auth.forgotPassword"/></h2>
          </div>
          <div className="gx-mb-4">
            <p><FormattedMessage id="auth.forgotPassword.desc"/></p>
          </div>

          <Form layout="vertical" onSubmit={this.handleSubmit} className="gx-auth-form gx-form-row0">
            <FormItem>
              {getFieldDecorator('id', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder={intl.formatMessage({id: 'user.id.or.email'})}/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" className="auth-form-button" htmlType="submit">
                <FormattedMessage id="send"/>
              </Button>
            </FormItem>
          </Form>

        </div>
      </div>
    )
  }
}

const WrappedForgotPasswordForm = Form.create()(ForgotPassword)

export default injectIntl(WrappedForgotPasswordForm)
