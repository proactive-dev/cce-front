import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { isMobile } from 'react-device-detect'
import QRCode from 'qrcode.react'
import { Button, Col, Form, Icon, Input, Row, Spin, Steps } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { enableGoogleAuth, getGoogleAuth } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { OTPAUTH_URL, SUCCESS } from '../../constants/AppConfigs'
import { USER } from '../../constants/Paths'

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

const FormItem = Form.Item
const {Step} = Steps

class EnableGoogleAuth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      curStep: 1,
      twofactor: {},
      profile: {}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, profile} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    if (profile !== prevState.profile) {
      return {profile}
    }

    return null
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.doEnableGoogleAuth(values)
      }
    })
  }

  doEnableGoogleAuth = (data) => {
    let formData = new FormData()
    const {twofactor} = this.state
    formData.append('google_auth[otp_secret]', twofactor.otp_secret)
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
    getGoogleAuth().then(response => {
      this.setState({twofactor: response.data})
    })
  }

  render() {
    const {intl} = this.props
    const {loader, curStep, twofactor, profile} = this.state
    const {getFieldDecorator} = this.props.form
    const steps = [
      {
        title: intl.formatMessage({id: 'download.app'}),
        index: 0
      },
      {
        title: intl.formatMessage({id: 'scan.qrcode'}),
        index: 1
      },
      {
        title: intl.formatMessage({id: 'backup.key'}),
        index: 2
      },
      {
        title: intl.formatMessage({id: 'enable.google.auth'}),
        index: 3
      }
    ]
    let qrcodeValue = ''
    if (twofactor && twofactor.otp_secret && profile && profile.email) {
      qrcodeValue = `${OTPAUTH_URL}${profile.email}?secret=${twofactor.otp_secret}&issuer=${window.location.host}`
    }

    return (
      <div>
        <h1 className="gx-text-center gx-mt-4 gx-mb-4"><FormattedMessage id="enable.google.auth"/></h1>
        <Spin spinning={loader} size="large">
          <div style={!isMobile ? {marginLeft: '10%', marginRight: '10%'} : null}>
            <Steps current={curStep - 1} onChange={this.onChangeSteps} size="small"
                   labelPlacement={!isMobile ? 'vertical' : 'horizontal'}>
              {steps.map(item => (
                <Step key={item.index} subTitle={item.title}/>
              ))}
            </Steps>
          </div>
          <div className="gx-mb-4 gx-mt-4">
            <h1 className="gx-text-center"><FormattedMessage id="step"/>&nbsp;&nbsp;{curStep}</h1>
            {
              (curStep === 1) &&
              <div className="gx-text-center gx-mt-4 gx-mb-4">
                <h4 className="gx-mt-4 gx-mb-4"><FormattedMessage id="ga.step.1.description"/></h4>
                <div className="gx-text-center">
                  <Button type="link" href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">
                    <img style={{width: '120px'}} src={require(`assets/images/app-store.svg`)}/>
                  </Button>
                  <Button type="link"
                          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
                    <img style={{width: '120px'}} src={require(`assets/images/google-play.svg`)}/>
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
              (curStep === 2) &&
              <div className="gx-text-center gx-mt-4 gx-mb-4">
                <h4 className="gx-mt-4 gx-mb-4"><FormattedMessage id="scan.qrcode.tip"/></h4>
                <Row className="gx-mt-4">
                  <Col xl={8} lg={8} sm={6} xs={24}>
                  </Col>
                  <Col xl={4} lg={4} sm={6} xs={24}>
                    <QRCode value={qrcodeValue} size={109}/>
                  </Col>
                  <Col xl={6} lg={12} sm={12} xs={24} className="gx-text-left gx-mt-4">
                    <p><FormattedMessage id="ga.step.2.description"/></p>
                    <h3>{twofactor ? twofactor.otp_secret : ''}</h3>
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
                <h4 className="gx-mt-4 gx-mb-4"><FormattedMessage id="ga.step.3.description1"/></h4>
                <Row>
                  <Col xl={8} lg={8} sm={6} xs={24}>
                  </Col>
                  <Col xl={4} lg={4} sm={6} xs={24}>
                    <img src={require(`assets/images/keepkey.svg`)} width={150} height={150}/>
                  </Col>
                  <Col xl={6} lg={12} sm={12} xs={24} className="gx-text-left gx-mt-4">
                    <p><FormattedMessage id="ga.step.3.description2"/></p>
                    <h3>{twofactor ? twofactor.otp_secret : ''}</h3>
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
              (curStep === 4) &&
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
