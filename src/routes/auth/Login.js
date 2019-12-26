import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Divider, Form, Icon, Input, Spin, Tag } from 'antd'
import { login } from '../../api/axiosAPIs'
import { initSettings, setAuthStatus } from '../../appRedux/actions/User'
import { initAccounts } from '../../appRedux/actions/Accounts'
import { EX_URL, SUCCESS } from '../../constants/AppConfigs'
import { FORGOT_PWD, REGISTER, USER } from '../../constants/Paths'
import { LOGGED_IN } from '../../constants/ResponseCode'
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

  componentDidMount() {
    this.props.setAuthStatus(false)
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
    formData.append('auth_key', data.id)
    formData.append('password', data.password)

    login(formData)
      .then(response => {
        const {code} = response.data
        const status = (code === LOGGED_IN)
        this.props.setAuthStatus(status)
        if (status) {
          IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'auth.login.success'}))
          this.props.history.push(`/${USER}`)
        }
      })
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form

    return (
      <div className="gx-text-center gx-mb-2">
        <h1 className="gx-m-5"><FormattedMessage id="auth.login"/></h1>
        <FormattedMessage id="check.visiting"/>
        &nbsp;
        <span className='h5'>{EX_URL}</span>
        <br/>
        <Tag className='gx-mt-2 gx-mb-5 gx-pl-3 gx-pr-3 gx-pt-1' color='green'>
          <Icon className='gx-text-green' type="lock"/>
          <Divider className='gx-m-2' type='vertical'/>
          <span className='h5'>{EX_URL}</span>
        </Tag>
        <Spin className="gx-auth-container" spinning={loader} size="large">
          <Form
            className="gx-auth-content gx-text-left"
            onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('id', {
                rules: [{
                  type: 'email', message: intl.formatMessage({id: 'alert.invalidEmail'})
                }, {
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder={intl.formatMessage({id: 'email'})}/>
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
              <Button type="primary" className="auth-form-button" htmlType="submit">
                <FormattedMessage id="auth.login"/>
              </Button>
            </FormItem>
            <FormItem>
              <Link className='auth-form-left' to={`/${FORGOT_PWD}`}>
                <FormattedMessage id="auth.forgotPassword"/>
              </Link>
              <div className='auth-form-right'>
                <FormattedMessage id="not.registered.yet"/>
                &nbsp;
                <Link to={`/${REGISTER}`}><FormattedMessage id="auth.register"/></Link>
              </div>
            </FormItem>
          </Form>
        </Spin>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login)

const mapDispatchToProps = {
  initSettings, initAccounts, setAuthStatus
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
