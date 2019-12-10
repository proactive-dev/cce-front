import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Alert, Button, Form, Icon, Input, Spin } from 'antd'
import { changePassword } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { ERROR, SUCCESS } from '../../constants/AppConfigs'
import { LOGIN } from '../../constants/Paths'

const FormItem = Form.Item

class ChangePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      confirmDirty: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  componentDidMount() {
    // this.props.getAuthStatus()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.doChangePwd(values)
      }
    })
  }

  doChangePwd = (data) => {
    let formData = new FormData()
    formData.append('identity[old_password]', data.oldPassword)
    formData.append('identity[password]', data.newPassword)
    formData.append('identity[password_confirmation]', data.confirmPassword)
    formData.append('commit', 'Change')

    changePassword(formData)
      .then(response => {
        this.props.form.resetFields()
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'password.change.success'}))
        this.props.history.push(`/${LOGIN}`)
      }).catch(error => {
      if (error.response) {
        IconNotification(ERROR, error.response.data.message)
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({confirmDirty: this.state.confirmDirty || !!value})
  }

  confirmPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('newPassword')) {
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
      <div className="gx-text-center">
        <h1 className="gx-m-5"><FormattedMessage id="password.change"/></h1>
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
              {getFieldDecorator('oldPassword', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder={intl.formatMessage({id: 'password.old'})}/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('newPassword', {
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
              <Button className="auth-form-button" type="primary" htmlType="submit">
                <FormattedMessage id="update"/>
              </Button>
            </FormItem>
          </Form>
        </Spin>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

const WrappedChangePasswordForm = Form.create()(ChangePassword)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedChangePasswordForm))
