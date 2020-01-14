import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Icon, Input, Modal } from 'antd'

const FormItem = Form.Item

class TfaModal extends React.Component {

  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onOk(values)
      }
    })
  }

  onCancel = () => {
    this.props.form.resetFields()
    this.props.onClose()
  }

  render() {
    const {intl, isOpened} = this.props
    const {getFieldDecorator} = this.props.form

    return (
      <Modal
        visible={isOpened}
        okText={intl.formatMessage({id: 'submit'})}
        onOk={this.onSubmit}
        onCancel={this.onCancel}>
        <div className={'gx-m-auto'}>
          <h2><FormattedMessage id="google.auth"/></h2>
          <h5 className="gx-font-weight-normal"><FormattedMessage id="auth.code.verification.auth.app.desc"/></h5>
          <Form className={'gx-mt-4'} onSubmit={this.onSubmit}>
            <FormItem wrapperCol={{sm: 24}}>
              {getFieldDecorator('authCode', {
                rules: [{
                  required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                }]
              })(
                <Input prefix={<Icon type="google" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder={intl.formatMessage({id: 'google.auth.code'})}/>
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}

const TfaForm = Form.create()(TfaModal)

export default injectIntl(TfaForm)
