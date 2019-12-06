import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Icon, Input, Spin } from 'antd'
import { SITE_NAME, SUCCESS } from '../../constants/AppConfigs'
import { login } from '../../api/axiosAPIs'
import { initSettings } from '../../appRedux/actions/User'
import { initAccounts } from '../../appRedux/actions/Accounts'
import { IconNotification } from '../../components/IconNotification'

const FormItem = Form.Item

class Login extends Component {

  state = {
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
        this.doLogin(values)
      }
    })
  }

  doLogin = (data) => {
    // TODO: clear storage
    this.props.initSettings()
    this.props.initAccounts()

    let formData = new FormData()
    formData.append('userId', data.id)
    formData.append('password', data.password)

    login(formData)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'auth.login.success'}))
        this.props.history.push('/dashboard')
      })
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form

    return (
      <div className="gx-login-container">
        <div className="gx-login-content">
          <div className="gx-login-header gx-text-center">
            <Link to="/">
              <img src={require('assets/images/logo-white.png')} alt={SITE_NAME} title={SITE_NAME}/>
            </Link>
          </div>
          <div className="gx-text-center">
            <h2><FormattedMessage id="auth.login"/></h2>
          </div>
          <Spin spinning={loader} size="large">
            <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
              <FormItem>
                {getFieldDecorator('id', {
                  rules: [{
                    required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                  }]
                })(
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder={intl.formatMessage({id: 'id.or.email'})}/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                  }]
                })(
                  <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                         placeholder={intl.formatMessage({id: 'password'})}/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" className="login-form-button" htmlType="submit">
                  <FormattedMessage id="auth.login"/>
                </Button>
                <span><FormattedMessage id="or"/></span>
                &nbsp;
                <Link to="/register"><FormattedMessage id="auth.register"/></Link>
                <Link className="login-form-right" to="/forgot-password"><FormattedMessage
                  id="auth.forgotPassword"/></Link>
              </FormItem>
            </Form>
          </Spin>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login)

const mapDispatchToProps = {
  initSettings, initAccounts
}

const mapStateToProps = ({settings, progress}) => {
  const {locale} = settings
  const {loader} = progress
  return {loader, locale}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(WrappedNormalLoginForm))
