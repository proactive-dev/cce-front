import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Spin } from 'antd'
import _ from 'lodash'
import { SITE_NAME, SUCCESS } from '../../constants/AppConfigs'
import { verifyTFA } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'

const FormItem = Form.Item

class TFAuthentication extends Component {

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
        this.doVerifyTFA(values)
      }
    })
  }

  doVerifyTFA = (data) => {
    let formData = new FormData()
    formData.append('codeTFA', data.code)

    verifyTFA(formData)
      .then(response => {
        const {intl, location} = this.props
        IconNotification(SUCCESS, intl.formatMessage({id: 'auth.code.verification.success'}))
        if (!_.isEmpty(location.state) && !_.isEmpty(location.state.prevPath)) {
          this.props.history.push(location.state.prevPath)
        } else {
          this.props.history.push('/')
        }
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
            <h2 className="gx-login-title"><FormattedMessage id="auth.code.verification"/></h2>
          </div>
          <Spin spinning={loader} size="large">
            <Form layout="vertical" onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
              <FormItem>
                {getFieldDecorator('code', {
                  rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                })(
                  <Input placeholder={intl.formatMessage({id: 'verificationCode'})}/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" className="login-form-button" htmlType="submit">
                  <FormattedMessage id="send"/>
                </Button>
              </FormItem>
            </Form>
          </Spin>
        </div>
      </div>
    )
  }
}

const WrappedTFAuthenticationForm = Form.create()(TFAuthentication)

const mapStateToProps = ({progress, settings}) => {
  const {pathname} = settings
  const {loader} = progress
  return {pathname, loader}
}

export default connect(
  mapStateToProps,
  null
)(
  injectIntl(WrappedTFAuthenticationForm)
)
