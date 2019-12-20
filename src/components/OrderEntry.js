import React from 'react'
import _ from 'lodash'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { newOrderAsk, newOrderBid } from '../api/axiosAPIs'
import { getAccounts } from '../appRedux/actions/Accounts'
import { expToFixed, getFixed } from '../util/helpers'
import { getAuthStatus } from '../appRedux/actions/User'
import { Button, Row, Col, Form, InputNumber } from 'antd'

const MAX_FIXED = 8

class OrderEntry extends React.Component {
  state = {
    marketId: null,
    accounts: [],
    price: '',
    amount: '',
    total: '',
    message: '',
    status: false,
    bidFixed: 0,
    askFixed: 0,
    totalFixed: 0
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {accounts} = nextProps
    if ((!_.isEmpty(accounts) && accounts !== prevState.accounts)) {
      return {accounts}
    }
    return null
  }

  // UNSAFE_componentWillReceiveProps(newProps) {
  //   if (newProps.price !== this.state.price) {
  //     this.setPrice(newProps.price)
  //   }
  //   if (newProps.market && (newProps.market.id !== this.state.marketId)) {
  //     this.setMarket(newProps.market)
  //   }
  // }

  componentDidMount() {
    this.props.getAccounts()

    const {market, ticker} = this.props
    if (market && !_.isEmpty(ticker)) {
      this.setMarket(market, ticker)
    }
  }

  setMarket(market, ticker) {
    const bidFixed = market.bid.fixed || MAX_FIXED
    const askFixed = market.ask.fixed || MAX_FIXED
    const totalFixed = bidFixed + askFixed < MAX_FIXED ? bidFixed + askFixed : MAX_FIXED

    this.setState({marketId: market.id, price: ticker.last, bidFixed, askFixed, totalFixed})
  }

  getFixedCount = (value) => {
    let numbers = (typeof (value) !== 'string') ? String(value).split('.') : value.split('.')
    if (numbers.length < 2) {
      return 0
    }

    return numbers[1].length
  }

  setPrice(price) {
    const {amount, totalFixed} = this.state
    let total = parseFloat(price) * parseFloat(amount)
    total = getFixed(total, totalFixed)
    this.setState({price, total})
  }

  onChangePrice(event) {
    this.setState({message: ''})

    const {bidFixed} = this.state
    let price = event.target.value ? event.target.value : ''
    if (this.getFixedCount(price) >= bidFixed) {
      price = getFixed(price, bidFixed)
    }

    this.setPrice(price)
  }

  setAmount(amount) {
    this.setState({amount})

    const {price, totalFixed} = this.state
    let total = parseFloat(price) * parseFloat(amount)
    total = getFixed(total, totalFixed)
    this.setState({total})
  }

  onChangeAmount(event) {
    this.setState({message: ''})

    const {askFixed} = this.state
    let amount = event.target.value ? event.target.value : ''
    if (this.getFixedCount(amount) >= askFixed) {
      amount = getFixed(amount, askFixed)
    }
    this.setAmount(amount)
  }

  setTotal(total) {
    this.setState({total})

    const {price} = this.props
    const {askFixed} = this.state
    if (parseFloat(price) > 0) {
      if (total !== '') {
        let amount = parseFloat(total) / parseFloat(price)
        amount = getFixed(amount, askFixed)
        this.setState({amount})
      } else {
        this.setState({amount: ''})
      }
    } else {
      this.setState({amount: getFixed(0, askFixed)})
    }
  }

  onChangeTotal(event) {
    this.setState({message: ''})

    const {totalFixed} = this.state
    let total = event.target.value ? event.target.value : ''
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

  checkValidate() {
    const {intl, price} = this.props
    const amount = this.state.amount

    if (price === '' || parseFloat(price) === 0) {
      this.setState({status: false, message: intl.formatMessage({id: 'input.price'})})
      return false
    }
    if (amount === '' || parseFloat(amount) === 0) {
      this.setState({status: false, message: intl.formatMessage({id: 'input.amount'})})
      return false
    }

    return true
  }

  onSubmit(isBid) {
    if (!this.checkValidate()) {
      return
    }

    const {market, intl} = this.props

    let formData = new FormData()
    if (isBid) {
      formData.append('order_bid[ord_type]', 'limit')
      formData.append('order_bid[price]', this.state.price)
      formData.append('order_bid[origin_volume]', this.state.amount)
      formData.append('order_bid[total]', this.state.total)
      newOrderBid(this.props.market.id, formData)
        .then(response => {
          this.setState({
            status: true,
            message: intl.formatMessage({id: response.data.message}),
            amount: '',
            total: ''
          })
          this.props.getAccounts()
          this.props.getMarketData(market.id)
        })
        .catch(error => {
          if (error.response) {
            this.setState({status: false, message: intl.formatMessage({id: error.response.data.message})})
          } else {
            this.setState({status: false, message: intl.formatMessage({id: 'failed'})})
          }
        })
    } else {
      formData.append('order_ask[ord_type]', 'limit')
      formData.append('order_ask[price]', this.state.price)
      formData.append('order_ask[origin_volume]', this.state.amount)
      formData.append('order_ask[total]', this.state.total)
      newOrderAsk(this.props.market.id, formData)
        .then(response => {
          this.setState({
            status: true,
            message: intl.formatMessage({id: response.data.message}),
            amount: '',
            total: ''
          })
          this.props.getAccounts()
          this.props.getMarketData(market.id)
        })
        .catch(error => {
          if (error.response) {
            this.setState({status: false, message: intl.formatMessage({id: error.response.data.message})})
          } else {
            this.setState({status: false, message: intl.formatMessage({id: 'failed'})})
          }
        })
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {intl, market, ticker, kind, accounts, authStatus} = this.props
    const {bidFixed, askFixed, totalFixed} = this.state
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
              rules: [{
                required: true,
                message: intl.formatMessage({id: 'alert.fieldRequired'})
              }]
            })(
              <InputNumber defaultValue={this.state.price} min={bidMin} step={bidMin} size={'small'}
                           suffix={market.quoteUnit.toUpperCase()}/>
            )}
          </Form.Item>

          <Form.Item label={intl.formatMessage({id: 'amount'})}>
            {getFieldDecorator('amount', {
              rules: [{
                required: true,
                message: intl.formatMessage({id: 'alert.fieldRequired'})
              }]
            })(
              <InputNumber defaultValue={this.state.amount} min={askMin} step={askMin} size={'small'}
                           suffix={market.baseUnit.toUpperCase()}/>
            )}
          </Form.Item>

          <Form.Item label={intl.formatMessage({id: 'total'})}>
            {getFieldDecorator('total', {
              rules: [{
                required: true,
                message: intl.formatMessage({id: 'alert.fieldRequired'})
              }]
            })(
              <InputNumber defaultValue={this.state.total} min={0} size={'small'}
                           suffix={market.quoteUnit.toUpperCase()}/>
            )}
          </Form.Item>
        </Form>

        {/*<label htmlFor={`FormRow-${kind}-price`}>{intl.formatMessage({id: 'price'})}:</label>*/}
        {/*<div>*/}
        {/*  <input*/}
        {/*    type="number"*/}
        {/*    id={`FormRow-${kind}-price`}*/}
        {/*    name="price"*/}
        {/*    step={bidMin}*/}
        {/*    min={bidMin}*/}
        {/*    value={this.state.price}*/}
        {/*    onChange={(event) => this.onChangePrice(event)}*/}
        {/*  />*/}
        {/*  <span>{market.quoteUnit.toUpperCase()}</span>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <label htmlFor={`FormRow-${kind}-amount`}>{intl.formatMessage({id: 'amount'})}:</label>*/}
        {/*  <div>*/}
        {/*    <input*/}
        {/*      type="number"*/}
        {/*      id={`FormRow-${kind}-amount`}*/}
        {/*      name="amount"*/}
        {/*      step={askMin}*/}
        {/*      min={askMin}*/}
        {/*      value={this.state.amount}*/}
        {/*      onChange={(event) => this.onChangeAmount(event)}*/}
        {/*    />*/}
        {/*    <span>{market.baseUnit.toUpperCase()}</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  <label htmlFor={`FormRow-${kind}-total`}>{intl.formatMessage({id: 'total'})}:</label>*/}
        {/*  <div>*/}
        {/*    <input*/}
        {/*      type="number"*/}
        {/*      id={`FormRow-${kind}-total`}*/}
        {/*      name="total"*/}
        {/*      min={0}*/}
        {/*      step={1}*/}
        {/*      value={this.state.total}*/}
        {/*      onChange={(event) => this.onChangeTotal(event)}*/}
        {/*    />*/}
        {/*    <span>{market.quoteUnit.toUpperCase()}</span>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div style={{maxHeight: '35px', flexBasis: '16px', margin: '-3px 0px 3px'}}>*/}
        {/*  <label style={{flexBasis: '25%'}}/>*/}
        {/*  <div style={{flexBasis: '75%'}}>*/}
        {/*    <div>*/}
        {/*      {this.state.message}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <Row type="flex" align="middle" justify={'center'}>
          <Col>
            {authStatus ? (
              <button onClick={() => this.onSubmit(kind === 'buy')}>
                {intl.formatMessage({id: this.props.kind})}&nbsp;{this.props.market.baseUnit.toUpperCase()}
              </button>
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
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({accounts}) => {
  return {
    accounts: accounts.accounts
  }
}

const mapDispatchToProps = dispatch => ({
  getAuthStatus,
  getAccounts
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

