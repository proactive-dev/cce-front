import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button, Card, Checkbox, Col, Form, Input, Row, Select, Spin, Typography } from 'antd'
import _ from 'lodash'
import { getCurrencyBySymbol, getFixed, isXRP } from '../../util/helpers'
import { getAddresses, getWithdraws, newWithdraw } from '../../api/axiosAPIs'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import CurrencySelect from '../../components/CurrencySelect'
import BalanceInfo from '../../components/BalanceInfo'
import { IconNotification } from '../../components/IconNotification'
import { HISTORY_TYPE_WITHDRAWAL, SUCCESS } from '../../constants/AppConfigs'
import { CURRENCIES } from '../../constants/Currencies'
import { ADDR_MANAGEMENT, TRANSACTIONS } from '../../constants/Paths'
import TransactionHistoryTable from '../../components/TransactionHistoryTable'

const {Text} = Typography
const {Option} = Select

class Withdrawal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      accounts: [],
      currentSymbol: CURRENCIES[0].symbol,
      addrs: [],
      address: '',
      getAmount: 0,
      account: {},
      twoFactor: '',
      addrTagChecked: false,
      withdraws: []
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
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, accounts} = nextProps
    if ((loader !== prevState.loader) || (!_.isEmpty(accounts) && accounts !== prevState.accounts)) {
      return {loader, accounts}
    }
    return null
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.props.getAccounts()
    this.fetchWithdraws()

    const {location} = this.props
    if (!_.isEmpty(location.state) && !_.isEmpty(location.state.currency)) {
      this.setState({currentSymbol: location.state.currency})
      this.updateStateAddrs(location.state.currency)
    }
  }

  fetchWithdraws = () => {
    getWithdraws()
      .then(response => {
        if (response.data) {
          let data = response.data
          let withdraws = []
          data.map(withdraw => {
            let tx = withdraw
            let currency = CURRENCIES.find(item => item.symbol === tx.currency)
            tx.precision = currency.precision
            if (tx.currency === currency.feeSymbol) {
              tx.feeSymbolPrecision = currency.precision
            }  else {
              let feeSymbol = CURRENCIES.find(item => item.feeSymbol === currency.feeSymbol)
              tx.feeSymbolPrecision = feeSymbol.precision
            }
            withdraws.push(tx)
          })
          this.setState({withdraws})
        }
      })
  }

  onSelectCurrency = (value) => {
    this.setState({currentSymbol: value})
    this.updateStateAddrs(value)
    this.props.form.resetFields()
  }

  handleAmountChange = (e) => {
    const {account, currentSymbol} = this.state
    const coin = getCurrencyBySymbol(currentSymbol)
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

  onSelectAddress = (value) => {
    this.setState({address: value})
  }

  handleClickAddrTag = (event) => {
    this.setState({addrTagChecked: event.target.checked})
  }

  onSubmit = e => {
    e.preventDefault()
    const {currentSymbol, addrs} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
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

        if (isXRP(currentSymbol)) {
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

  goTransactions = () => {
    this.props.history.push({
      pathname: `/${TRANSACTIONS}`,
      state: {kind: HISTORY_TYPE_WITHDRAWAL}
    })
  }

  checkAmount = (rule, value, callback) => {
    let amount = parseFloat(value)
    if (amount > 0) {
      const coin = getCurrencyBySymbol(this.state.currentSymbol)
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
    const {loader, currentSymbol, addrs, getAmount, account, addrTagChecked, withdraws} = this.state

    const coin = getCurrencyBySymbol(currentSymbol)
    const balance = !_.isEmpty(account) ? getFixed(parseFloat(account.balance), parseInt(account.currency.precision)) : 0.0
    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="withdrawal"/></h1>
        <Spin spinning={loader} size="large">
          <Row type='flex' gutter={12}>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-p-1'}>
              <Card className="gx-h-100" bordered={false}>
                <CurrencySelect value={currentSymbol} onChange={this.onSelectCurrency}/>
                <BalanceInfo account={account} symbol={currentSymbol}/>
                <div className={'gx-mt-5 gx-mb-4 gx-ml-2 gx-mr-2 gx-text-warning'}>
                  <FormattedMessage id="important"/>
                  <ul className={'gx-mt-2'}>
                    <li>
                      <FormattedMessage id="min.withdrawal"/>: {coin.withdraw.minAmount} {currentSymbol.toUpperCase()}
                    </li>
                    <li><FormattedMessage id="withdrawal.notice"/></li>
                  </ul>
                </div>
              </Card>
            </Col>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-p-1'}>
              <Card className="gx-h-100 gx-p-1" bordered={false}>
                <Form onSubmit={this.onSubmit}>
                  <Text strong>{currentSymbol.toUpperCase()} <FormattedMessage id="withdrawal.address"/></Text>
                  {
                    _.isEmpty(addrs) && (
                      <div className='gx-ml-3 gx-mt-2'>
                        <FormattedMessage id="no.whitelist.address"/>&nbsp;
                        <Link className='gx-text-underline' to={`/${ADDR_MANAGEMENT}`}>
                          <FormattedMessage id="address.management"/>
                        </Link>
                      </div>
                    )
                  }
                  <Form.Item wrapperCol={{sm: 24}} className={'gx-w-100 gx-m-2'}>
                    {getFieldDecorator('address', {
                      rules: [{required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                    })(
                      <Select
                        className={'gx-w-100'}
                        onChange={this.onSelectAddress}>
                        {
                          !_.isEmpty(addrs) &&
                          addrs.map((addr) => {
                            return (
                              <Option value={addr.id} key={addr.id}>
                                <strong>{addr.label}</strong>
                              </Option>
                            )
                          })
                        }
                      </Select>
                    )}
                  </Form.Item>
                  {
                    isXRP(currentSymbol) && (
                      <div>
                        <span className={'gx-font-weight-bold'}>
                          {currentSymbol.toUpperCase()} <FormattedMessage id="withdrawal.tag"/>
                        </span>
                        <Checkbox
                          className={'gx-float-right'}
                          checked={addrTagChecked}
                          onChange={this.handleClickAddrTag}>
                          <FormattedMessage id="no.tag"/>
                        </Checkbox>
                        <Form.Item wrapperCol={{sm: 24}} className={'gx-w-100 gx-m-2'}>
                          {getFieldDecorator('addrTag', {
                            rules: [{
                              required: !addrTagChecked,
                              message: intl.formatMessage({id: 'alert.fieldRequired'})
                            }]
                          })(
                            <Input disabled={addrTagChecked}/>
                          )}
                        </Form.Item>
                      </div>
                    )
                  }
                  <span className={'gx-font-weight-bold'}><FormattedMessage id="amount"/></span>
                  <span
                    className='gx-text-underline gx-text-primary gx-link gx-float-right gx-mr-2'
                    onClick={this.setAmountAvailable}>
                    <FormattedMessage id="available"/>: {balance}
                  </span>
                  <Form.Item wrapperCol={{sm: 24}} className={'gx-w-100 gx-m-2'}>
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
                  <span className={'gx-font-weight-bold'}><FormattedMessage id="google.auth.code"/></span>
                  <Form.Item wrapperCol={{sm: 24}} className={'gx-w-100 gx-m-2'}>
                    {getFieldDecorator('twoFactor', {
                      rules: [{required: false, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
                    })(
                      <Input/>
                    )}
                  </Form.Item>
                  <div className={'gx-m-3'}>
                    <FormattedMessage id="transaction.fee"/>: {coin.withdraw.fee}
                    <span className={'gx-float-right'}><FormattedMessage id="you.will.get"/>: {getAmount}</span>
                  </div>
                  <Button type="primary" className='auth-form-button gx-mt-1' onClick={this.onSubmit}>
                    <FormattedMessage id="submit"/>
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
          <Card title={intl.formatMessage({id: 'history'})}>
            <div className="gx-text-right" style={{height: '10px'}}>
              <Button type="link" className="gx-m-2"
                      onClick={this.goTransactions}>
                <u>{intl.formatMessage({id: 'view.all'})}</u>
              </Button>
            </div>
            <TransactionHistoryTable
              data={_.reverse(withdraws || []).slice(0, 5)}
              kind={HISTORY_TYPE_WITHDRAWAL}/>
          </Card>
        </Spin>
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
