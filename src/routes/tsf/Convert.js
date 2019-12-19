import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Spin, Table } from 'antd'
import { getAuthStatus, getProfile } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { getPointExchanges, newPointExchange } from '../../api/axiosAPIs'
import { getTableLocaleData, getTimeForTable } from '../../util/helpers'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import _ from 'lodash'

const FormItem = Form.Item
const Option = Select.Option

const Coins = ['TSF', 'ETH']
const POINT = 'TSFP'

class Convert extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      amount: 1,
      accounts: [],
      history: [],
      twoFactor: ''
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
          return `${value} TSFP`
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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.doNewInvest(values)
      }
    })
  }

  tfaStatus = () => {
    const {profile} = this.state
    return profile && profile.tfaStatus
  }

  doNewInvest = (values) => {
    const {profile, twoFactor} = this.state

    const params = {
      point_exchange: {
        member_id: profile.id,
        currency: values.coins.toLowerCase(),
        amount: values.amount,
        fee: values.amount / 100
      },
      two_factor: {
        type: 'app',
        otp: twoFactor
      }
    }
    
    newPointExchange(params)
      .then(response => {
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'purchase.req.success'}))
        this.setState({
          unit: Coins[0],
          amount: 1,
          twoFactor: ''
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

  onChangeCount = (amount) => {
    this.setState({amount: amount})
  }

  onChangeTwoFactor = (event) => {
    const twoFactor = event.target.value
    this.setState({twoFactor})
  }

  render() {
    const {intl} = this.props
    const {getFieldDecorator} = this.props.form
    const {loader, amount, accounts, history} = this.state
    const result = accounts.find(account => account.currency.code === POINT.toLowerCase())
    let balance = 0
    if (!_.isUndefined(result) && !_.isEmpty(result)) {
      balance = result.balance || 0
    }

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="exchange"/></h1>
        <Spin spinning={loader} size="large">
          <Row type='flex' gutter={12}>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-mb-2'}>
              <Card bordered={false}>
                <Form onSubmit={this.handleSubmit}>
                  <FormItem
                    label={intl.formatMessage({id: 'balance'})}
                    wrapperCol={{sm: 24}}
                    className={'gx-w-100 gx-m-0'}>
                    <Input value={balance} disabled/>
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'coin'})}
                    wrapperCol={{sm: 24}}
                    className={'gx-w-100 gx-m-0'}>
                    {getFieldDecorator('coins', {
                      rules: [{
                        required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                      }]
                    })(
                      <Select>
                        {
                          Coins.map(unit => {
                            return (
                              <Option key={unit} value={unit}>{unit}</Option>
                            )
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'amount'})}
                    wrapperCol={{sm: 24}}
                    className={'gx-w-100 gx-m-0'}>
                    {getFieldDecorator('amount', {
                      rules: [{
                        required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                      }, {
                        validator: this.checkAmount
                      }]
                    })(
                      <InputNumber
                        className="gx-w-100"
                        min={0}
                        value={amount}
                        onChange={this.onChangeCount}/>
                    )}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'fees'})}
                    wrapperCol={{sm: 24}}
                    className={'gx-w-100 gx-m-0'}>
                    <Input value={amount / 100} disabled/>
                  </FormItem>
                  {
                    this.tfaStatus() &&
                    <FormItem
                      label={intl.formatMessage({id: '2fa'})}
                      wrapperCol={{sm: 24}}
                      className={'gx-w-100 gx-m-2'}>
                      {getFieldDecorator('twoFactor', {
                        rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                      })(
                        <Input onChange={this.onChangeTwoFactor}/>
                      )}
                    </FormItem>
                  }
                  <Button type="primary" htmlType="submit" className='auth-form-button gx-mt-3'>
                    <FormattedMessage id="submit"/>
                  </Button>
                </Form>
              </Card>
            </Col>
            <Col span={12} xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card>
                <Table className="gx-table-responsive"
                       columns={this.getColumns()}
                       dataSource={history}
                       pagination={false}
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
