import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Button, Form, Input } from 'antd'
import { changePassword } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { ERROR, SUCCESS } from '../../constants/AppConfigs'

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
    this.props.getAuthStatus()
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
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'auth.register.success'}))
        this.props.history.push('/login')
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
    const {getFieldDecorator} = this.props.form
    const {intl} = this.props
    const {loader} = this.state

    return (
      <div>
        <h2 className="title gx-mb-4"><FormattedMessage id="password.change"/></h2>
        <div className="gx-login-content">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label={intl.formatMessage({id: 'password.old'})}>
              {getFieldDecorator('oldPassword', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input.Password/>
              )}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'password.new'})}>
              {getFieldDecorator('newPassword', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }, {
                  validator: this.validateToConfirm
                }]
              })(
                <Input.Password/>
              )}
            </FormItem>
            <FormItem
              label={intl.formatMessage({id: 'password.confirm'})}>
              {getFieldDecorator('confirmPassword', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }, {
                  validator: this.confirmPassword
                }]
              })(
                <Input.Password onBlur={this.handleConfirmBlur}/>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                <FormattedMessage id="update"/>
              </Button>
            </FormItem>
          </Form>
        </div>
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
