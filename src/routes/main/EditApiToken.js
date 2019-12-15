import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Col, Form, Input, Row, Spin, Typography } from 'antd'
import { IconNotification } from '../../components/IconNotification'
import { getAuthStatus } from '../../appRedux/actions/User'
import queryString from 'query-string'
import { SUCCESS } from '../../constants/AppConfigs'
import { updateApiToken } from '../../api/axiosAPIs'
import { API_TOKENS } from '../../constants/Paths'
import _ from 'lodash'

const {Text, Title} = Typography
const InputGroup = Input.Group

class EditApiToken extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      otp: '',
      otpValid: true
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

    const values = queryString.parse(this.props.location.search)
    if (values && !_.isEmpty(values)) {

      this.props.form.setFieldsValue({
        label: values.label,
        accessKey: values.access_key,
        ip: values.trusted_ip_list
      })

      this.setState({id: values.id})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {id} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = new FormData()
        formData.append('api_token[label]', values.label)
        formData.append('api_token[ip_whitelist]', values.ip)
        formData.append('two_factor[type]', 'app')
        formData.append('two_factor[otp]', values.twoFactor)
        formData.append('commit', 'Confirm')
        let that = this
        updateApiToken(id, formData)
          .then(response => {
            IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'new.token.success'}))
            this.props.history.push(`/${API_TOKENS}`)
          })
      }
    })
  }

  render() {
    const {intl} = this.props
    const {loader} = this.state
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="update.token"/></h1>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
        <Row type='flex' justify='center'>
          <Col>
            <Card bordered={false} style={{maxWidth: 600}}>
              <Row type='flex' justify='center'>
                <Col>
                  <img alt="" src={require('assets/images/api.png')}/>
                </Col>
              </Row>
              <Row type='flex' justify='center' className='gx-mt-2'>
                <Col>
                  <Text className={'gx-fs-lg'}>
                    <FormattedMessage id="api.tokens.create.description"/>
                  </Text>
                </Col>
              </Row>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item label={intl.formatMessage({id: 'label'})} className={'gx-mt-2'} wrapperCol={{sm: 24}}
                           style={{width: '100%', margin: 0}}>
                  {getFieldDecorator('label', {
                    rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                  })(
                    <Input/>)}
                </Form.Item>

                <Form.Item label={intl.formatMessage({id: 'access.key'})} className={'gx-mt-2'} wrapperCol={{sm: 24}}
                           style={{width: '100%', margin: 0}}>
                  {getFieldDecorator('accessKey', {
                    rules: []
                  })(
                    <Input readOnly/>)}
                </Form.Item>

                <Form.Item label={intl.formatMessage({id: 'ip.whitelist'})} className={'gx-mt-2'} wrapperCol={{sm: 24}}
                           style={{width: '100%', margin: 0}}>
                  {getFieldDecorator('ip', {
                    rules: []
                  })(
                    <Input/>)}
                </Form.Item>

                <Form.Item label={intl.formatMessage({id: 'google.auth.code'})} className={'gx-mt-2'}
                           wrapperCol={{sm: 24}} style={{width: '100%', margin: 0}}>
                  {getFieldDecorator('twoFactor', {
                    rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                  })(
                    <Input/>)}
                </Form.Item>
                <Row type='flex' justify='center' className='gx-mt-2'>
                  <Col>
                    <Button type="primary" htmlType="submit">
                      <FormattedMessage id="submit"/>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
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

const WrappedEditApiTokenForm = Form.create()(EditApiToken)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedEditApiTokenForm))
