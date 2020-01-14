import React from 'react'
import _ from 'lodash'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Form, Input } from 'antd'
import { expToFixed, getFixed } from '../../util/helpers'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { ERROR, ORDER_BUY, ORDER_SELL, SUCCESS } from '../../constants/AppConfigs'
import { LOGIN, REGISTER } from '../../constants/Paths'
import { IconNotification } from '../common/IconNotification'
import { newOrderAsk, newOrderBid } from '../../api/axiosAPIs'

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 18}
  }
}

const MAX_FIXED = 8

class OrderEntry extends React.Component {
  constructor(props) {
    super(props)

    const {market, lastPrice} = this.props
    this.bidFixed = market.bid.fixed || MAX_FIXED
    this.askFixed = market.ask.fixed || MAX_FIXED
    this.totalFixed = this.bidFixed + this.askFixed < MAX_FIXED ? this.bidFixed + this.askFixed : MAX_FIXED

    this.state = {
      accounts: [],
      price: lastPrice,
      priceInvalid: false,
      amountInvalid: false,
      totalInvalid: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {accounts, price} = nextProps
    if ((!_.isEmpty(accounts) && (accounts !== prevState.accounts))
      || (price !== prevState.price)) {
      return {accounts, price}
    }

    return null
  }

  componentDidMount() {
    this.props.getAccounts()
  }

  onChangePrice = e => {
    let price = e.target.value
    if (!!price && price > 0) {
      this.setState({priceInvalid: false})
      const {amountInvalid} = this.state
      if (!amountInvalid) {
        const amount = this.props.form.getFieldValue('amount')
        let total = price * amount
        total = getFixed(total, this.totalFixed)
        this.props.form.setFieldsValue({total})
      }
    } else {
      this.setState({priceInvalid: true})
    }
  }

  setAmount = (amount) => {
    const price = this.props.form.getFieldValue('price')
    let total = price * amount
    total = getFixed(total, this.totalFixed)

    this.props.form.setFieldsValue({amount, total})
  }

  onChangeAmount = e => {
    let amount = e.target.value
    if (!!amount && amount > 0) {
      this.setState({amountInvalid: false})
      this.props.form.setFieldsValue({amount})
      if (!this.state.priceInvalid) {
        this.setAmount(amount)
      }
    } else {
      this.setState({amountInvalid: true})
    }
  }

  setTotal(total) {
    if (!this.state.priceInvalid && !this.state.amountInvalid) {
      const price = this.props.form.getFieldValue('price')
      const amount = getFixed(total / price, this.askFixed)
      this.props.form.setFieldsValue({amount, total})
    }
  }

  onClickWallet(kind, balance) {
    if (kind === ORDER_BUY) {
      this.setTotal(getFixed(balance, this.totalFixed))
    } else if (kind === ORDER_SELL) {
      this.setAmount(getFixed(balance, this.askFixed))
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {market, intl, kind, accounts} = this.props
    const {priceInvalid, amountInvalid} = this.state
    const isBid = kind === ORDER_BUY
    const marketId = market.id
    let {price, amount} = this.props.form.getFieldsValue()
    if (priceInvalid || amountInvalid) {
      return
    }
    price = parseFloat(getFixed(price, this.bidFixed))
    amount = parseFloat(getFixed(amount, this.askFixed))
    let total = parseFloat(getFixed(price * amount, this.totalFixed))
    this.props.form.setFieldsValue({price, amount, total})

    // total validation with balance
    let compareName = isBid ? market.quoteUnit : market.baseUnit
    let account = accounts.find(item => item.currency.code === compareName) || {}
    let balance = account.balance ? parseFloat(account.balance) : 0.0
    if (balance < total) {
      this.setState({totalInvalid: true})
      return
    }

    let formData = new FormData()
    if (isBid) {
      formData.append('order_bid[ord_type]', 'limit')
      formData.append('order_bid[price]', price)
      formData.append('order_bid[origin_volume]', amount)
      formData.append('order_bid[total]', total)
      newOrderBid(marketId, formData)
        .then(response => {
          this.props.form.resetFields()
          this.props.onRefresh()
          IconNotification(SUCCESS, intl.formatMessage({id: 'success'}))
        })
    } else {
      formData.append('order_ask[ord_type]', 'limit')
      formData.append('order_ask[price]', price)
      formData.append('order_ask[origin_volume]', amount)
      formData.append('order_ask[total]', total)
      newOrderAsk(marketId, formData)
        .then(response => {
          this.props.form.resetFields()
          this.props.onRefresh()
          IconNotification(SUCCESS, intl.formatMessage({id: 'success'}))
        })
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {intl, authStatus, market, kind, isSmall, accounts} = this.props
    const {priceInvalid, amountInvalid, totalInvalid, price} = this.state
    const isBid = kind === ORDER_BUY
    const fixed = isBid ? this.bidFixed : this.askFixed

    const bidMin = expToFixed((1 / Math.pow(10, this.bidFixed)))
    const askMin = expToFixed((1 / Math.pow(10, this.askFixed)))
    // const totalMin = expToFixed((1 / Math.pow(10, this.totalFixed)))

    let balance = 0.0
    let compareName = ''
    if (market) {
      compareName = isBid ? market.quoteUnit : market.baseUnit
      let account = accounts.find(item => item.currency.code === compareName) || {}
      balance = account.balance || 0.0
    }
    let validationMsg = ''
    if (priceInvalid) {
      validationMsg = 'input.price'
    } else if (amountInvalid) {
      validationMsg = 'input.amount'
    } else if (totalInvalid) {
      validationMsg = 'INSUFFICIENT_BALANCE'
    }

    return (
      <div>
        <div className={isSmall ? 'gx-mt-3 gx-mb-3' : 'gx-mb-2'}>
          {
            !isSmall &&
            <span className={'h4'}>
              {intl.formatMessage({id: kind})}&nbsp;{market.baseUnit.toUpperCase()}
            </span>
          }
          <span className={isSmall ? 'gx-pointer' : 'gx-float-right gx-pointer'}
                onClick={() => this.onClickWallet(kind, balance)}>
            <img className='gx-size-15' src={require('assets/images/wallet.svg')} alt="wallet"/>&nbsp;
            {authStatus ? getFixed(balance, fixed) : '-'}&nbsp;
            {compareName.toUpperCase()}
          </span>
        </div>
        <Form>
          <Form.Item
            {...formItemLayout}
            {...priceInvalid && {
              validateStatus: ERROR
            }}
            className={'gx-mb-0'}
            label={intl.formatMessage({id: 'price'})}>
            {getFieldDecorator('price', {
              initialValue: price
            })(
              <Input
                className={'gx-w-100'}
                type={'number'}
                size={'small'}
                min={bidMin}
                step={bidMin}
                onChange={this.onChangePrice}
                addonAfter={market.quoteUnit.toUpperCase()}/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            {...amountInvalid && {
              validateStatus: ERROR
            }}
            className={'gx-mb-0'}
            label={intl.formatMessage({id: 'amount'})}>
            {getFieldDecorator('amount')(
              <Input
                className={'gx-w-100'}
                type={'number'}
                size={'small'}
                min={askMin}
                step={askMin}
                onChange={this.onChangeAmount}
                addonAfter={market.baseUnit.toUpperCase()}/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            className={'gx-mb-0'}
            label={intl.formatMessage({id: 'total'})}>
            {getFieldDecorator('total')(
              <Input
                className={'gx-w-100'}
                type={'number'}
                size={'small'}
                min={0}
                addonAfter={market.quoteUnit.toUpperCase()}/>
            )}
          </Form.Item>
          <div className={'gx-text-danger'} style={{height: '16px'}}>
            {validationMsg ? intl.formatMessage({id: validationMsg}) : ''}
          </div>
          {authStatus ? (
            <div
              className={`gx-border gx-text-center gx-mt-2 gx-p-2 gx-pointer ${isBid ? 'gx-text-green' : 'gx-text-red'}`}
              onClick={this.onSubmit}>
              {intl.formatMessage({id: kind})}&nbsp;{market.baseUnit.toUpperCase()}
            </div>
          ) : (
            <div className={'gx-border gx-text-center gx-mt-3 gx-p-2'}>
              <Link to={`/${LOGIN}`} className="gx-m-1">{intl.formatMessage({id: 'auth.login'})}</Link>
              <FormattedMessage id="or"/>
              <Link to={`/${REGISTER}`} className="gx-m-1">{intl.formatMessage({id: 'auth.register'})}</Link>
              <FormattedMessage id="to.trade"/>
            </div>
          )}
        </Form>
      </div>
    )
  }
}

const mapStateToProps = ({accounts, markets}) => {
  return {
    accounts: accounts.accounts,
    price: markets.price
  }
}

const mapDispatchToProps = dispatch => ({
  getAccounts
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
