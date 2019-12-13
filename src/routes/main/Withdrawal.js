import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import CurrencySelect from '../../components/CurrencySelect'
import BalanceInfo from '../../components/BalanceInfo'
import { Button, Card, Checkbox, Col, Form, Input, Row, Select, Spin, Typography } from 'antd'
import _ from 'lodash'
import { getCoinBySymbol, getFixed } from '../../util/helpers'
import { getAddresses, newWithdraw } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import { Link } from 'react-router-dom'

const {Text} = Typography
const Option = Select.Option
const InputGroup = Input.Group

class Withdrawal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      accounts: [],
      currentSymbol: 'btc',
      addrs: [],
      address: '',
      getAmount: 0,
      account: {},
      twoFactor: '',
      checkedAddrTag: false
    }
  }

  updateStateAddrs(symbol) {
    getAddresses()
      .then(response => {
        let addrs = response.data
        addrs = addrs.filter(addr => {
          return addr.currency === symbol
        })
        this.setState({addrs})
        const {accounts} = this.state
        const result = accounts.find(account => account.currency.code === symbol)
        let account = result === undefined ? {} : result
        this.setState({account: account})
      })
      .catch(error => {
        console.log(error)
      })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, accounts} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    if (!_.isEmpty(accounts) && accounts !== prevState.accounts) {
      return {accounts}
    }
    return null
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.props.getAccounts()
    const {symbol} = this.props
    if (symbol) {
      this.setState({currentSymbol: symbol})
      this.updateStateAddrs(symbol)
    } else
      this.updateStateAddrs(this.state.currentSymbol)
  }

  handleChange = (value) => {
    this.setState({currentSymbol: value})
    this.updateStateAddrs(value)
    this.props.form.setFieldsValue({
      amount: '',
      address: ''
    })
  }

  handleAmountChange = (e) => {
    const coin = getCoinBySymbol(this.state.currentSymbol)
    const {account} = this.state
    let val = parseFloat(e.target.value)
    let amount = 0
    if (!isNaN(val)) {
      amount = parseFloat(e.target.value) - coin.withdraw.fee
      amount = getFixed(amount, account.currency.precision)
    }
    if (amount < 0)
      amount = 0
    this.setState({getAmount: amount})
  }

  handleChangeAddress = (value) => {
    this.setState({address: value})
  }

  handleClickAddrTag = (event) => {
    this.setState({checkedAddrTag: event.target.checked})
  }

  handleSubmit = e => {
    e.preventDefault()
    const {currentSymbol, addrs} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const result = addrs.find(addr => addr.id === values.address)
        if (result === undefined)
          return
        const addr = result
        const param = {
          withdraw: {
            member_id: addr.member_id,
            currency: addr.currency,
            sum: parseFloat(values.amount),
            fund_source: addr.id
          },
          two_factor: {
            type: 'app',
            otp: values.twoFactor
          }
        }

        if (currentSymbol === 'xrp') {
          param.withdraw.tag = values.addrTag
        }

        let that = this
        newWithdraw(currentSymbol, param)
          .then(response => {
            this.props.getAccounts()
            that.updateStateAddrs(currentSymbol)
            IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'withdrawal.req.success'}))
          })
      }
    })
  }

  checkAmount = (rule, value, callback) => {
    let amount = parseFloat(value)
    if (amount > 0) {
      const coin = getCoinBySymbol(this.state.currentSymbol)
      if (amount < coin.withdraw.minAmount) {
        callback(this.props.intl.formatMessage({id: 'must.be.min'}) + String(coin.withdraw.minAmount))
        return
      } else if (Math.floor(amount) > 10000000) {
        callback(this.props.intl.formatMessage({id: 'alert.shouldBeSmallerThanMax'}))
        return
      } else {
        callback()
        return
      }
    }
    callback(this.props.intl.formatMessage({id: 'alert.shouldBePositive'}))
  }

  setAmountAvailable = () => {
    const {account} = this.state
    const balance = !_.isEmpty(account) ? getFixed(parseFloat(account.balance), parseInt(account.currency.precision)) : 0.0
    this.props.form.setFieldsValue({
      amount: balance
    })
    this.handleAmountChange({target: {value: balance}})
  }

  render() {
    const {intl} = this.props
    const {getFieldDecorator} = this.props.form
    const {loader, currentSymbol, addrs, getAmount, account} = this.state

    const coin = getCoinBySymbol(currentSymbol)
    const balance = !_.isEmpty(account) ? getFixed(parseFloat(account.balance), parseInt(account.currency.precision)) : 0.0
    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="withdrawal"/></h1>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
        <div>
          <Row type='flex' gutter={12}>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-mb-2'}>
              <Card bordered={false} style={{height: '100%'}}>
                <CurrencySelect value={currentSymbol} onChange={this.handleChange}/>
                <BalanceInfo account={account} symbol={currentSymbol}/>
                <div>
                  <Text type="warning"><FormattedMessage id="important"/></Text>
                  <ul type='warning' className={'gx-mt-2'}>
                    <li className={'gx-text-warning'}>
                      <FormattedMessage id="min.withdrawal"/>: {coin.withdraw.minAmount} {currentSymbol.toUpperCase()}
                    </li>
                    <li className={'gx-text-warning'}><FormattedMessage id="withdrawal.notice"/></li>
                  </ul>
                </div>
              </Card>
            </Col>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Card bordered={false} style={{height: '100%'}}>
                <Form onSubmit={this.handleSubmit}>
                  <div>
                    <Text strong>{currentSymbol.toUpperCase()} <FormattedMessage id="withdrawal.address"/></Text>
                  </div>
                  {_.isEmpty(addrs) && (
                    <div className='gx-ml-3 gx-mt-2'>
                      <Text><FormattedMessage id="no.whitelist.address"/> <Link className='gx-text-underline' to=''>
                        <FormattedMessage id="address.management"/>
                      </Link></Text>
                    </div>
                  )}
                  <Form.Item className={'gx-mt-2'} wrapperCol={{sm: 24}} style={{width: '100%', margin: 0}}>
                    {getFieldDecorator('address', {
                      rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                    })(
                      <Select
                        style={{width: '100%'}}
                        onChange={this.handleChangeAddress}
                      >
                        {
                          !_.isEmpty(addrs) &&
                          addrs.map((addr) => {
                            return <Option value={addr.id} key={addr.id}>
                              <strong>{addr.label}</strong>
                            </Option>
                          })
                        }
                      </Select>
                    )}
                  </Form.Item>
                  <div className={'gx-mt-3'}>
                    <Text strong><FormattedMessage id="amount"/></Text>
                    <a className='gx-text-underline gx-mr-3' style={{float: 'right'}}
                       onClick={this.setAmountAvailable}><FormattedMessage id="available"/>: {balance}</a>
                  </div>
                  <div className={'gx-mt-2'}>
                    <InputGroup compact>
                      <Form.Item wrapperCol={{sm: 24}} style={{width: '100%', margin: 0}}>
                        {getFieldDecorator('amount', {
                          rules: [{
                            required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                          }, {
                            validator: this.checkAmount
                          }]
                        })(
                          <Input onChange={this.handleAmountChange}
                                 addonAfter={currentSymbol.toUpperCase()}/>
                        )}
                      </Form.Item>
                    </InputGroup>
                  </div>
                  {currentSymbol === 'xrp' && (
                    <div>
                      <div className={'gx-mt-3'}>
                        <Text strong>{currentSymbol.toUpperCase()} <FormattedMessage id="withdrawal.tag"/></Text>
                        <Checkbox
                          style={{float: 'right'}}
                          checked={this.state.checkedAddrTag}
                          onChange={this.handleClickAddrTag}
                        >
                          <FormattedMessage id="no.tag"/>
                        </Checkbox>
                      </div>
                      <div className={'gx-mt-2'}>
                        <InputGroup compact>
                          <Form.Item wrapperCol={{sm: 24}} style={{width: '100%', margin: 0}}>
                            {getFieldDecorator('addrTag', {
                              rules: [{
                                required: !this.state.checkedAddrTag,
                                message: intl.formatMessage({id: 'alert.fieldRequired'})
                              }]
                            })(
                              <Input/>
                            )}
                          </Form.Item>
                        </InputGroup>
                      </div>
                    </div>
                  )}
                  <div className={'gx-mt-3'}>
                    <Text strong><FormattedMessage id="google.auth.code"/></Text>
                  </div>
                  <div className={'gx-mt-2'}>
                    <InputGroup compact>
                      <Form.Item wrapperCol={{sm: 24}} style={{width: '100%', margin: 0}}>
                        {getFieldDecorator('twoFactor', {
                          rules: [{required: false, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                        })(
                          <Input/>
                        )}
                      </Form.Item>
                    </InputGroup>
                  </div>

                  <div className={'gx-mt-2'}>
                    <Row type='flex' gutter={12}>
                      <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-mb-2'}
                           align={'center'}>
                        <Text><FormattedMessage id="transaction.fee"/>: {coin.withdraw.fee}</Text>
                      </Col>
                      <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-mb-2'}
                           align={'center'}>
                        <Text><FormattedMessage id="you.will.get"/>: {getAmount}</Text>
                      </Col>
                    </Row>
                  </div>
                  <Button type='primary' block onClick={this.handleSubmit}><FormattedMessage id="submit"/></Button>
                </Form>

              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus,
  getAccounts
}

const mapStateToProps = ({progress, accounts}) => {
  return {
    loader: progress.loader,
    accounts: accounts.accounts
  }
}

const WrappedWithdrawalForm = Form.create()(Withdrawal)
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedWithdrawalForm))
