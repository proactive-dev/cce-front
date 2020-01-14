import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button, Checkbox, Form, Icon, Input, Spin } from 'antd'
import _ from 'lodash'
import { register } from '../../api/axiosAPIs'
import { setAuthStatus } from '../../appRedux/actions/User'
import { REGISTERED } from '../../constants/ResponseCode'
import { LOGIN, TERMS } from '../../constants/Paths'
import { SUCCESS } from '../../constants/AppConfigs'
import { IconNotification } from '../../components/common/IconNotification'

const FormItem = Form.Item

class Register extends Component {

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
        this.doRegister(values)
      }
    })
  }

  doRegister = (data) => {
    let formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('password_confirmation', data.confirmPassword)
    // check if referral?
    const refId = sessionStorage.getItem('refId') || ''
    if (!_.isEmpty(refId)) {
      formData.append('refId', refId)
    }

    register(formData)
      .then(response => {
        const {code} = response.data
        const status = (code === REGISTERED)
        if (status) {
          IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'auth.register.success'}))
          this.props.history.push(`/${LOGIN}`)
        }
      })
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
        <h1 className="gx-m-5"><FormattedMessage id="auth.register"/></h1>
        <Spin className="gx-auth-container" spinning={loader} size="large">
          <Form
            className="gx-auth-content gx-text-left"
            onSubmit={this.handleSubmit}>
            <Alert
              className='gx-mt-2 gx-mb-4'
              type="warning"
              showIcon
              message={intl.formatMessage({id: 'password.must.be'})}/>
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
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }, {
                  validator: this.validateToConfirm
                }]
              })(
                <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder={intl.formatMessage({id: 'password'})}/>
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
              {getFieldDecorator('terms', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }],
                valuePropName: 'checked'
              })(
                <Checkbox><FormattedMessage id="i.agree"/></Checkbox>
              )}
              <Link to={`/${TERMS}`}><FormattedMessage id="terms"/></Link>
            </FormItem>
            <FormItem>
              <Button type="primary" className="auth-form-button" htmlType="submit">
                <FormattedMessage id="auth.register"/>
              </Button>
            </FormItem>
            <FormItem>
              <div className='gx-text-center'>
                <FormattedMessage id="already.registered"/>
                &nbsp;
                <Link to={`/${LOGIN}`}><FormattedMessage id="auth.login"/></Link>
              </div>
            </FormItem>
          </Form>
        </Spin>
      </div>
    )
  }
}

const WrappedNormalRegisterForm = Form.create()(Register)

const mapDispatchToProps = {
  setAuthStatus
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(WrappedNormalRegisterForm)
)
