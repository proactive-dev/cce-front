import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Alert, Button, Form, Icon, Input, Spin } from 'antd'
import _ from 'lodash'
import { verifyTFA } from '../../api/axiosAPIs'
import { SUCCESS } from '../../constants/AppConfigs'
import { LOGGED_IN } from '../../constants/ResponseCode'
import { USER } from '../../constants/Paths'
import { setAuthStatus } from '../../appRedux/actions/User'
import { IconNotification } from '../../components/IconNotification'

const FormItem = Form.Item

class TFAuthentication extends Component {

  state = {
    loader: false,
    email: null
  }

  componentDidMount() {
    const {location} = this.props
    if (!_.isEmpty(location.state) && !_.isEmpty(location.state.email)) {
      this.setState({email: location.state.email})
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
        this.doVerifyTFA(values)
      }
    })
  }

  doVerifyTFA = (data) => {
    const {email} = this.state
    let formData = new FormData()
    formData.append('google_auth[otp]', data.code)
    if (!_.isEmpty(email)) {
      formData.append('email', email)
    }

    verifyTFA(formData)
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
      <div className="gx-text-center">
        <h1 className="gx-m-5"><FormattedMessage id="auth.code.verification"/></h1>
        <Spin className="gx-auth-container" spinning={loader} size="large">
          <Form
            className="gx-auth-content gx-text-left"
            onSubmit={this.handleSubmit}>
            <Alert
              className='gx-mt-2 gx-mb-4 gx-fs-md'
              type="info"
              showIcon
              message={intl.formatMessage({id: 'auth.code.verification.auth.app.desc'})}/>
            <FormItem>
              {getFieldDecorator('code', {
                rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
              })(
                <Input prefix={<Icon type="google" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder={intl.formatMessage({id: 'googleAuthCode'})}/>
              )}
            </FormItem>
            <FormItem>
              <Button className="auth-form-button" type="primary" htmlType="submit">
                <FormattedMessage id="send"/>
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    )
  }
}

const WrappedTFAuthenticationForm = Form.create()(TFAuthentication)

const mapDispatchToProps = {
  setAuthStatus
}

const mapStateToProps = ({progress, settings}) => {
  const {pathname} = settings
  const {loader} = progress
  return {pathname, loader}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(WrappedTFAuthenticationForm)
)
