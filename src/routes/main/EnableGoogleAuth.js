import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { isMobile } from 'react-device-detect'
import QRCode from 'qrcode.react'
import { Button, Col, Form, Icon, Input, Row, Spin, Steps } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { enableGoogleAuth, getGoogleAuth } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/common/IconNotification'
import { G_AUTH_ANDROID_APP_URL, G_AUTH_IOS_APP_URL, OTPAUTH_URL, SUCCESS } from '../../constants/AppConfigs'
import { USER } from '../../constants/Paths'

const FormItem = Form.Item
const {Step} = Steps

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 12}
  },
  labelAlign: 'left',
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12},
    md: {span: 6},
    lg: {span: 6}
  }
}

const STEPS = [
  {
    title: 'download.app',
    index: 0
  },
  {
    title: 'scan.qrcode',
    index: 1
  },
  {
    title: 'backup.key',
    index: 2
  },
  {
    title: 'enable.google.auth',
    index: 3
  }
]

class EnableGoogleAuth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      curStep: 0,
      otpSecret: {},
      profile: {}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, profile} = nextProps
    if ((loader !== prevState.loader) || (profile !== prevState.profile)) {
      return {loader, profile}
    }

    return null
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.reqEnableGoogleAuth(values)
      }
    })
  }

  reqEnableGoogleAuth = (data) => {
    let formData = new FormData()
    const {otpSecret} = this.state
    formData.append('google_auth[otpSecret]', otpSecret)
    formData.append('google_auth[otp]', data.authCode)
    formData.append('commit', 'Enable')

    enableGoogleAuth(formData)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: '2fa.enable.success'}))
        this.props.history.push(`/${USER}`)
      })
  }

  onNext = () => {
    const {curStep} = this.state
    this.setState({curStep: curStep + 1})
  }

  onPrev = () => {
    const {curStep} = this.state
    this.setState({curStep: curStep - 1})
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.fetchGoogleAuth()
  }

  fetchGoogleAuth = () => {
    getGoogleAuth()
      .then(response => {
        if (response.data && response.data.otp_secret)
          this.setState({otpSecret: response.data.otp_secret})
      })
      .catch(error => {
        this.props.history.push(`/${USER}`)
      })
  }

  render() {
    const {intl} = this.props
    const {loader, curStep, otpSecret, profile} = this.state
    const {getFieldDecorator} = this.props.form
    let qrcodeValue = ''
    if (otpSecret && profile && profile.email) {
      qrcodeValue = `${OTPAUTH_URL}${profile.email}?secret=${otpSecret}&issuer=${window.location.host}`
    }

    return (
      <div>
        <h1 className="gx-text-center gx-mt-4 gx-mb-4"><FormattedMessage id="enable.google.auth"/></h1>
        <Spin spinning={loader} size="large">
          <div className={!isMobile ? 'gx-ml-4 gx-mr-4' : ''}>
            <Steps
              current={curStep}
              onChange={this.onChangeSteps}
              size="small"
              labelPlacement={!isMobile ? 'vertical' : 'horizontal'}>
              {
                STEPS.map(item => (
                  <Step key={item.index} subTitle={intl.formatMessage({id: item.title})}/>
                ))
              }
            </Steps>
          </div>
          <div className="gx-mb-4 gx-mt-4">
            <h1 className="gx-text-center"><FormattedMessage id="step"/>&nbsp;&nbsp;{curStep + 1}</h1>
            {
              (curStep === 0) &&
              <div className="gx-text-center gx-mt-4 gx-mb-4">
                <h4 className="gx-mt-4 gx-mb-4"><FormattedMessage id="ga.step.1.description"/></h4>
                <div className="gx-text-center">
                  <Button type="link" href={G_AUTH_IOS_APP_URL}>
                    <img style={{width: '120px'}} alt={'key'} src={require(`assets/images/app-store.svg`)}/>
                  </Button>
                  <Button type="link" href={G_AUTH_ANDROID_APP_URL}>
                    <img style={{width: '120px'}} alt={'key'} src={require(`assets/images/google-play.svg`)}/>
                  </Button>
                  <hr/>
                </div>
                <div className="gx-text-right">
                  <Button type="primary" onClick={this.onNext}>
                    <FormattedMessage id="next.step"/>
                  </Button>
                </div>
              </div>
            }
            {
              (curStep === 1) &&
              <div className="gx-text-center gx-mt-4 gx-mb-4">
                <h4 className="gx-mt-4 gx-mb-4"><FormattedMessage id="scan.qrcode.tip"/></h4>
                <Row className="gx-mt-4">
                  <Col xl={8} lg={8} sm={6} xs={24}/>
                  <Col xl={4} lg={4} sm={6} xs={24}>
                    <QRCode value={qrcodeValue} size={109}/>
                  </Col>
                  <Col xl={6} lg={12} sm={12} xs={24} className="gx-text-left gx-mt-4">
                    <p><FormattedMessage id="ga.step.2.description"/></p>
                    <h3>{otpSecret || ''}</h3>
                  </Col>
                </Row>
                <hr/>
                <div>
                  <Row className="gx-mt-4">
                    <Col xl={12} lg={12} sm={12} xs={12} className="gx-text-left">
                      <Button onClick={this.onPrev}>
                        <FormattedMessage id="prev.step"/>
                      </Button>
                    </Col>
                    <Col xl={12} lg={12} sm={12} xs={12} className="gx-text-right">
                      <Button type="primary" onClick={this.onNext}>
                        <FormattedMessage id="next.step"/>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            }
            {
              (curStep === 2) &&
              <div className="gx-text-center gx-mt-4 gx-mb-4">
                <h4 className="gx-mt-4 gx-mb-4"><FormattedMessage id="ga.step.3.description1"/></h4>
                <Row>
                  <Col xl={8} lg={8} sm={6} xs={24}/>
                  <Col xl={4} lg={4} sm={6} xs={24}>
                    <img src={require(`assets/images/keepkey.svg`)} alt={'key'} width={150} height={150}/>
                  </Col>
                  <Col xl={6} lg={12} sm={12} xs={24} className="gx-text-left gx-mt-4">
                    <p><FormattedMessage id="ga.step.3.description2"/></p>
                    <h3>{otpSecret ? otpSecret : ''}</h3>
                  </Col>
                </Row>
                <hr/>
                <div>
                  <Row className="gx-mt-4">
                    <Col xl={12} lg={12} sm={12} xs={12} className="gx-text-left">
                      <Button onClick={this.onPrev}>
                        <FormattedMessage id="prev.step"/>
                      </Button>
                    </Col>
                    <Col xl={12} lg={12} sm={12} xs={12} className="gx-text-right">
                      <Button type="primary" onClick={this.onNext}>
                        <FormattedMessage id="next.step"/>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            }
            {
              (curStep === 3) &&
              <div className="gx-text-center gx-mt-4 gx-mb-4">
                <h4 className="gx-mt-4 gx-mb-4"><FormattedMessage id="enable.google.auth"/></h4>
                <Form
                  onSubmit={this.handleSubmit}>
                  <FormItem
                    {...formItemLayout}
                    labelAlign={'right'}
                    label={intl.formatMessage({id: 'google.auth.code'})}>
                    {getFieldDecorator('authCode', {
                      rules: [{
                        required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                      }]
                    })(
                      <Input prefix={<Icon type="google" style={{color: 'rgba(0,0,0,.25)'}}/>}
                             placeholder={intl.formatMessage({id: 'google.auth.code'})}/>
                    )}
                  </FormItem>
                  <hr/>
                  <Row className="gx-mt-4">
                    <Col xl={12} lg={12} sm={12} xs={12} className="gx-text-left">
                      <Button onClick={this.onPrev}>
                        <FormattedMessage id="prev.step"/>
                      </Button>
                    </Col>
                    <Col xl={12} lg={12} sm={12} xs={12} className="gx-text-right">
                      <Button type="primary" htmlType="submit">
                        <FormattedMessage id="submit"/>
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            }
          </div>
        </Spin>
      </div>
    )
  }
}

const WrappedEnableGoogleAuthForm = Form.create()(EnableGoogleAuth)

const mapDispatchToProps = {
  getAuthStatus
}

const mapStateToProps = ({progress, user}) => {
  return {
    loader: progress.loader,
    profile: user.profile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedEnableGoogleAuthForm))
