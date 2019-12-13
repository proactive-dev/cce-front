import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Col, Form, Input, Row, Spin, Typography } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { newApiToken } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'

const {Text, Title} = Typography

class NewApiToken extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false
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
        let formData = new FormData()
        formData.append('api_token[label]', values.label)
        formData.append('two_factor[type]', 'app')
        formData.append('two_factor[otp]', values.twoFactor)
        formData.append('commit', 'Confirm')
        let that = this
        newApiToken(formData)
          .then(response => {
            const token = response.data
            IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'new.token.success'}))
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
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="api.tokens"/></h1>
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

const WrappedNewApiTokenForm = Form.create()(NewApiToken)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedNewApiTokenForm))
