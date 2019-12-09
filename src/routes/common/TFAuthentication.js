import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Alert, Button, Form, Icon, Input, Spin } from 'antd'
import _ from 'lodash'
import { SUCCESS } from '../../constants/AppConfigs'
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
