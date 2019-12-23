import React from 'react'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { newOrderAsk, newOrderBid } from '../api/axiosAPIs'
import { getAccounts } from '../appRedux/actions/Accounts'
import { expToFixed, getFixed } from '../util/helpers'
import { getAuthStatus } from '../appRedux/actions/User'
import { getPrice} from '../appRedux/actions/Markets'
import { Button, Col, Form, InputNumber, Row } from 'antd'

const MAX_FIXED = 8

class OrderEntry extends React.Component {
  state = {
    marketId: null,
    accounts: [],
    bidFixed: 0,
    askFixed: 0,
    totalFixed: 0,
    authStatus: false,
    price: '0.00000000'
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {accounts, authStatus, price} = nextProps
    if ((authStatus !== prevState.authStatus)
      || (!_.isEmpty(accounts) && accounts !== prevState.accounts)
      || (price !== prevState.price))
    {
      return {authStatus, accounts, price}
    }

    return null
  }

  componentDidMount() {
    this.props.getAccounts()
    this.props.getPrice()

    const {market, lastPrice} = this.props
    if (market) {
      this.setMarket(market, lastPrice)
    }
  }

  setMarket(market, lastPrice) {
    const bidFixed = market.bid.fixed || MAX_FIXED
    const askFixed = market.ask.fixed || MAX_FIXED
    const totalFixed = bidFixed + askFixed < MAX_FIXED ? bidFixed + askFixed : MAX_FIXED

    this.setState({marketId: market.id, price: lastPrice, bidFixed, askFixed, totalFixed})
  }

  getFixedCount = (value) => {
    let numbers = (typeof (value) !== 'string') ? String(value).split('.') : value.split('.')
    if (numbers.length < 2) {
      return 0
    }

    return numbers[1].length
  }

  setPrice(price) {
    const amount = this.props.form.getFieldValue('amount')
    const {totalFixed} = this.state

    let total = parseFloat(price) * parseFloat(amount)
    total = getFixed(total, totalFixed)
    this.props.form.setFieldsValue({
      price: price,
      total: total
    })
  }

  onChangePrice = value => {
    const {bidFixed} = this.state
    let price = value ? value : ''
    if (this.getFixedCount(price) >= bidFixed) {
      price = getFixed(price, bidFixed)
    }

    this.setPrice(price)
  }

  setAmount(amount) {
    const price = this.props.form.getFieldValue('price')
    const {totalFixed} = this.state
    let total = parseFloat(price) * parseFloat(amount)
    total = getFixed(total, totalFixed)

    this.props.form.setFieldsValue({
      amount: amount,
      total: total
    })
  }

  onChangeAmount = value => {
    const {askFixed} = this.state
    let amount = value ? value : ''
    if (this.getFixedCount(amount) >= askFixed) {
      amount = getFixed(amount, askFixed)
    }
    this.setAmount(amount)
  }

  setTotal(total) {
    const {price} = this.props
    const {askFixed} = this.state
    let amount = ''
    if (parseFloat(price) > 0) {
      if (total !== '') {
        amount = parseFloat(total) / parseFloat(price)
        amount = getFixed(amount, askFixed)
      }
    } else {
      amount = getFixed(0, askFixed)
    }

    this.props.form.setFieldsValue({
      amount: amount,
      total: total
    })
  }

  onChangeTotal = value => {
    const {totalFixed} = this.state
    let total = value ? value : ''
    if (this.getFixedCount(total) >= totalFixed) {
      total = getFixed(total, totalFixed)
    }
    this.setTotal(total)
  }

  onClickWallet(kind, balance) {
    const {totalFixed, askFixed} = this.state
    if (kind === 'buy') {
      this.setTotal(getFixed(balance, totalFixed))
    } else if (kind === 'sell') {
      this.setAmount(getFixed(balance, askFixed))
    }
  }

  checkAmount = (rule, value, callback) => {
    let amount = parseFloat(value)
    if (amount > 0) {
      callback()
      return
    }
    callback(this.props.intl.formatMessage({id: 'input.amount'}))
  }

  checkPrice = (rule, value, callback) => {
    let amount = parseFloat(value)
    if (amount > 0) {
      callback()
      return
    }
    callback(this.props.intl.formatMessage({id: 'input.price'}))
  }

  onSubmit = e => {
    e.preventDefault()
    const {market, intl, kind} = this.props
    const isBid = kind === 'buy' ? true : false

    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = new FormData()
        if (isBid) {
          formData.append('order_bid[ord_type]', 'limit')
          formData.append('order_bid[price]', values.price)
          formData.append('order_bid[origin_volume]', values.amount)
          formData.append('order_bid[total]', values.total)
          newOrderBid(this.props.market.id, formData)
            .then(response => {
              this.setState({
                message: intl.formatMessage({id: response.data.message}),
                amount: '',
                total: ''
              })
              this.props.getAccounts()
              this.props.getMarketData(market.id)
            })
        } else {
          formData.append('order_ask[ord_type]', 'limit')
          formData.append('order_ask[price]', values.price)
          formData.append('order_ask[origin_volume]', values.amount)
          formData.append('order_ask[total]', values.total)
          newOrderAsk(this.props.market.id, formData)
            .then(response => {
              this.setState({
                message: intl.formatMessage({id: response.data.message}),
                amount: '',
                total: ''
              })
              this.props.getAccounts()
              this.props.getMarketData(market.id)
            })
        }
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {intl, market, kind, accounts} = this.props
    const {bidFixed, askFixed, totalFixed, authStatus} = this.state
    const fixed = kind === 'sell' ? askFixed : bidFixed

    let balance = 0.0
    let compareName = ''

    const bidMin = expToFixed((1 / Math.pow(10, bidFixed)))
    const askMin = expToFixed((1 / Math.pow(10, askFixed)))
    const totalMin = expToFixed((1 / Math.pow(10, totalFixed)))

    if (market) {
      compareName = (kind === 'sell') ? market.baseUnit : market.quoteUnit
      _.forEach(accounts, account => {
        if (compareName.toString() === account.currency.code.toString()) {
          balance = account.balance
        }
      })
    }

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
      }
    }

    return (
      <div>
        <Row type="flex" align="middle">
          <Col span={12}>
            <h3>{intl.formatMessage({id: kind})}&nbsp;{market.baseUnit.toUpperCase()}</h3>
          </Col>
          <Col span={12}>
            <Button className='gx-border-0 gx-float-right' onClick={() => this.onClickWallet(kind, balance)}>
              <img src={require('assets/images/wallet.svg')} alt="wallet" style={{width: 18, height: 18}}/>&nbsp;
              {authStatus ? (
                '' + parseFloat(balance).toFixed(fixed) + ' ' + compareName.toUpperCase()
              ) : (
                '- ' + compareName.toUpperCase()
              )}
            </Button>
          </Col>
        </Row>
        <Form {...formItemLayout} onSubmit={this.onSubmit}>
          <Form.Item label={intl.formatMessage({id: 'price'})}>
            {getFieldDecorator('price', {
              initialValue:this.state.price,
              rules: [{
                required: true,
                message: intl.formatMessage({id: 'alert.fieldRequired'})
              }, {
                validator: this.checkPrice
              }]
            })(
              <InputNumber min={bidMin}
                           step={bidMin}
                           size={'medium'}
                           suffix={market.quoteUnit.toUpperCase()}
                           onChange={this.onChangePrice}
                           style={{width: '100%'}}/>
            )}
          </Form.Item>

          <Form.Item label={intl.formatMessage({id: 'amount'})}>
            {getFieldDecorator('amount', {
              rules: [{
                required: true,
                message: intl.formatMessage({id: 'alert.fieldRequired'})
              }, {
                validator: this.checkAmount
              }]
            })(
              <InputNumber min={askMin}
                           step={askMin}
                           size={'medium'}
                           suffix={market.baseUnit.toUpperCase()}
                           onChange={this.onChangeAmount}
                           style={{width: '100%'}}/>
            )}
          </Form.Item>

          <Form.Item label={intl.formatMessage({id: 'total'})}>
            {getFieldDecorator('total', {
              rules: [{
                required: true,
                message: intl.formatMessage({id: 'alert.fieldRequired'})
              }]
            })(
              <InputNumber min={0}
                           size={'medium'}
                           suffix={market.quoteUnit.toUpperCase()}
                           onChange={this.onChangeTotal}
                           style={{width: '100%'}}/>
            )}
          </Form.Item>
        </Form>

        <div>
          {authStatus ? (
            <Button block onClick={() => this.onSubmit(kind === 'buy')}
                    className={kind === 'buy' ? 'gx-text-green' : 'gx-text-red'}>
              {intl.formatMessage({id: this.props.kind})}&nbsp;{this.props.market.baseUnit.toUpperCase()}
            </Button>
          ) : (
            <div>
              <Link to="/login">{intl.formatMessage({id: 'login'})}</Link>
              <span>
                    &nbsp;
                {intl.formatMessage({id: 'or'})}
                &nbsp;
                <Link to="/register">{intl.formatMessage({id: 'register'})}</Link>
                  </span>
              &nbsp;{intl.formatMessage({id: 'to.trade'})}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({accounts, user, markets}) => {
  return {
    accounts: accounts.accounts,
    authStatus: user,
    price: markets.price
  }
}

const mapDispatchToProps = dispatch => ({
  getAuthStatus,
  getAccounts,
  getPrice
  // setPrice: payload => {
  //   dispatch(cacheActions.setPrice(payload))
  // },
})

const WrappedOrderEntryForm = Form.create()(OrderEntry)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    injectIntl(WrappedOrderEntryForm)
  )
)

