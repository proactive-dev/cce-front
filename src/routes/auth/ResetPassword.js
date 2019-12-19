import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Alert, Button, Form, Icon, Input, Spin } from 'antd'
import { connect } from 'react-redux'
import { resetPassword, validatePwdToken } from '../../api/axiosAPIs'
import { RESET_PWD_SUCCESS } from '../../constants/ResponseCode'
import { FORGOT_PWD, LOGIN, RESET_PWD } from '../../constants/Paths'
import { SUCCESS } from '../../constants/AppConfigs'
import { IconNotification } from '../../components/IconNotification'

const FormItem = Form.Item

class ResetPassword extends Component {

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

  componentDidMount() {
    this.doValidatePwdToken()
  }

  goForgotPwdPage = () => {
    this.props.history.push(`/${FORGOT_PWD}`)
  }

  doValidatePwdToken = () => {
    const token = this.props.match.params.token
    if (!!token) {
      validatePwdToken(token)
        .then(response => {
          const {code} = response.data
          if (code !== RESET_PWD_SUCCESS) {
            this.goForgotPwdPage()
          }
        })
        .catch(error => {
          this.goForgotPwdPage()
        })
    } else {
      this.goForgotPwdPage()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.doResetPassword(values)
      }
    })
  }

  doResetPassword = (data) => {
    const token = this.props.match.params.token
    if (!!token) {
      let formData = new FormData()
      formData.append('reset_password[password]', data.password)
      formData.append('commit', RESET_PWD)

      resetPassword(token, formData)
        .then(response => {
          IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'reset.password.success'}))
          this.props.history.push(`/${LOGIN}`)
        })
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({confirmDirty: this.state.confirmDirty || !!value})
  }

  confirmPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback(this.props.intl.formatMessage({id: 'alert.passwordNotMatch'}))
    } else {
      callback()
    }
  }

  validateToConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], {force: true})
    }
    callback()
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form

    return (
      <div className="gx-text-center gx-mb-2">
        <h1 className="gx-m-5"><FormattedMessage id="auth.resetPassword"/></h1>
        <Spin className="gx-auth-container" spinning={loader} size="large">
          <Form
            className="gx-auth-content gx-text-left"
            onSubmit={this.handleSubmit}>
            <Alert
              className='gx-mt-2 gx-mb-4'
              type="warning"
              showIcon
              message={intl.formatMessage({id: 'auth.resetPassword.desc'})}/>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }, {
                  validator: this.validateToConfirm
                }]
              })(
                <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder={intl.formatMessage({id: 'password.new'})}/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('confirmPassword', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }, {
                  validator: this.confirmPassword
                }]
              })(
                <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                onBlur={this.handleConfirmBlur}
                                placeholder={intl.formatMessage({id: 'password.confirm'})}/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" className="auth-form-button" htmlType="submit">
                <FormattedMessage id="reset"/>
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    )
  }
}

const WrappedResetPasswordForm = Form.create()(ResetPassword)

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(
  mapStateToProps,
  null
)(
  injectIntl(WrappedResetPasswordForm)
)
