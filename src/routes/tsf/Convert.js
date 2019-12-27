import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Col, Form, Icon, Input, InputNumber, Row, Select, Spin, Table } from 'antd'
import _ from 'lodash'
import { getAuthStatus, getProfile } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { getPointExchanges, newPointExchange } from '../../api/axiosAPIs'
import { getTableLocaleData, getTimeForTable } from '../../util/helpers'
import { IconNotification } from '../../components/common/IconNotification'
import { SUCCESS, TSF_AMOUNT_MAX } from '../../constants/AppConfigs'

const FormItem = Form.Item
const Option = Select.Option

const CONVERT_COINS = ['TSF', 'ETH']
const POINT_SYMBOL = 'TSFP'
const FEE_PERCENT = 0.01

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 10},
    md: {span: 10},
    lg: {span: 8}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 14},
    md: {span: 14},
    lg: {span: 16}
  }
}

class Convert extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      amount: 1,
      accounts: [],
      history: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, accounts, profile} = nextProps
    if ((loader !== prevState.loader) || (!_.isEmpty(accounts) && accounts !== prevState.accounts) || (profile !== prevState.profile)) {
      return {loader, accounts, profile}
    }
    return null
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.props.getProfile()
    this.props.getAccounts()
    this.getHistory()
  }

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'date'}),
        dataIndex: 'created_at',
        align: 'center',
        render: (value) => {
          return getTimeForTable(value)
        }
      },
      {
        title: intl.formatMessage({id: 'amount'}),
        dataIndex: 'amount',
        align: 'center',
        render: (value) => {
          return `${value} ${POINT_SYMBOL}`
        }
      },
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'currency',
        align: 'center',
        render: (value) => {
          return value.toUpperCase()
        }
      },
      {
        title: intl.formatMessage({id: 'status'}),
        dataIndex: 'state',
        align: 'center',
        render: (value) => {
          return value.toUpperCase()
        }
      }
    ]
  }

  checkAmount = (rule, value, callback) => {
    if (value > 0) {
      callback()
      return
    }
    callback(this.props.intl.formatMessage({id: 'alert.shouldBePositive'}))
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.newPointExchange(values)
      }
    })
  }

  newPointExchange = (values) => {
    const {profile} = this.state

    const params = {
      point_exchange: {
        member_id: profile.id,
        currency: values.coin.toLowerCase(),
        amount: values.amount,
        fee: values.amount * FEE_PERCENT
      },
      two_factor: {
        type: 'app',
        otp: !!values.twoFactor ? values.twoFactor : ''
      }
    }

    newPointExchange(params)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'purchase.req.success'}))
        this.props.form.resetFields()
        this.setState({
          amount: 1
        })
        this.props.getAccounts()
        this.getHistory()
      })
  }

  getHistory = () => {
    getPointExchanges()
      .then(response => {
        let history = response.data
        if (!_.isEmpty(history)) {
          this.setState({history})
        }
      })
  }

  onChangeAmount = (amount) => {
    this.setState({amount})
  }

  render() {
    const {intl} = this.props
    const {getFieldDecorator} = this.props.form
    const {loader, amount, accounts, history, profile} = this.state
    const {tfaStatus} = profile || {}
    const result = accounts.find(account => account.currency.code.toLowerCase() === POINT_SYMBOL.toLowerCase())
    let balance = 0
    if (!_.isUndefined(result) && !_.isEmpty(result)) {
      balance = result.balance || 0
    }

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="exchange"/></h1>
        <Spin spinning={loader} size="large">
          <Row>
            <Col xxl={12} xl={12} lg={16} md={20} sm={24} xs={24} className={'gx-mb-2'}>
              <Card bordered={false}>
                <Form onSubmit={this.onSubmit}>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'balance'})}>
                    {getFieldDecorator('balance', {
                      initialValue: balance
                    })(
                      <Input suffix={POINT_SYMBOL} disabled/>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'coin'})}>
                    {getFieldDecorator('coin', {
                      rules: [{
                        required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                      }]
                    })(
                      <Select>
                        {
                          CONVERT_COINS.map(coin => {
                            return (
                              <Option key={coin} value={coin}>{coin}</Option>
                            )
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={`${POINT_SYMBOL} ${intl.formatMessage({id: 'amount'})}`}>
                    {getFieldDecorator('amount', {
                      initialValue: amount,
                      rules: [{
                        required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                      }, {
                        validator: this.checkAmount
                      }]
                    })(
                      <InputNumber
                        className="gx-w-100"
                        pattern="[0-9]*"
                        min={0}
                        max={TSF_AMOUNT_MAX}
                        onChange={this.onChangeAmount}/>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'fees'})}>
                    {getFieldDecorator('fees', {
                      initialValue: amount * FEE_PERCENT
                    })(
                      <Input suffix={POINT_SYMBOL} disabled/>
                    )}
                  </FormItem>
                  {
                    tfaStatus &&
                    <FormItem
                      {...formItemLayout}
                      label={intl.formatMessage({id: 'verificationCode'})}>
                      {getFieldDecorator('twoFactor', {
                        rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                      })(
                        <Input prefix={<Icon type="google" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder={intl.formatMessage({id: 'google.auth.code'})}/>
                      )}
                    </FormItem>
                  }
                  <Button type="primary" htmlType="submit" className='auth-form-button gx-mt-3'>
                    <FormattedMessage id="submit"/>
                  </Button>
                </Form>
              </Card>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className={'gx-mb-2'}>
              <Card bordered={false}>
                <Table className="gx-table-responsive"
                       columns={this.getColumns()}
                       dataSource={history}
                       pagination={{pageSize: 5}}
                       locale={getTableLocaleData(intl)}
                       rowKey={'id'}
                       size='middle'/>
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus, getAccounts, getProfile
}

const mapStateToProps = ({progress, accounts, user}) => {
  return {
    loader: progress.loader,
    accounts: accounts.accounts,
    profile: user.profile
  }
}

const WrappedConvertForm = Form.create()(Convert)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedConvertForm))
