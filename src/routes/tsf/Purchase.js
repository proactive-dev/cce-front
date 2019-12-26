import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Divider, Form, InputNumber, Result, Row, Spin, Statistic } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { getPurchaseOptions, newPurchase, preparePurchase } from '../../api/axiosAPIs'
import _ from 'lodash'
import { USER } from '../../constants/Paths'
import { IconNotification } from '../../components/IconNotification'
import { ERROR, PURCHASE_TIME_LIMIT } from '../../constants/AppConfigs'
import { getFiatFixed } from '../../util/helpers'

const FormItem = Form.Item
const {Countdown} = Statistic

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
    md: {span: 10},
    lg: {span: 10}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
    md: {span: 14},
    lg: {span: 14}
  }
}

const PURCHASE_COIN = 'ETH'
const PRODUCT_COIN = 'TSF'
const FIAT_CURRENCY = 'USD'

class Purchase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      balance: 0,
      curStep: 0,
      rate: 0,
      products: [],
      product: {},
      productRate: 0,
      accounts: {},
      productCount: 0,
      amount: 0,
      fee: 0,
      isExistProduct: true,
      errorMsg: 'alert.invalidData'
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, accounts} = nextProps
    if (loader !== prevState.loader || (!_.isEmpty(accounts) && accounts !== prevState.accounts)) {
      return {loader, accounts}
    }
    return null
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {curStep} = this.state
        if (curStep === 0) {
          this.preparePurchase()
        } else if (curStep === 1) {
          this.newPurchase()
        } else {
          this.reset()
        }
      }
    })
  }

  checkAmount = (rule, value, callback) => {
    if (value > 0) {
      callback()
      return
    }
    callback(this.props.intl.formatMessage({id: 'alert.shouldBePositive'}))
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.props.getAccounts()
    this.fetchPurchaseOptions()
  }

  fetchPurchaseOptions = () => {
    let params = {currency: PURCHASE_COIN, fiat: FIAT_CURRENCY, product_currency: PRODUCT_COIN}
    getPurchaseOptions(params)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const {rate, product_rate, products} = response.data
          if (!rate || !product_rate || _.isEmpty(products) || _.isUndefined(products)) {
            this.setState({errorMsg: 'alert.emptyData', isExistProduct: false})
          } else if (rate > 0 && product_rate > 0) {
            const product = products[0]
            this.setState({rate, products, product, productRate: product_rate, isExistProduct: true})
          } else {
            this.setState({errorMsg: 'alert.invalidData', isExistProduct: false})
          }
        }
      })
  }

  preparePurchase = () => {
    const {productCount, product} = this.state
    const {intl} = this.props
    let params = {product_id: product.id, product_count: productCount, currency: PURCHASE_COIN.toLowerCase()}

    preparePurchase(params)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const {rate, amount, fee} = response.data
          if (!rate || !amount || (!fee && fee !== 0)) {
            IconNotification(ERROR, intl.formatMessage({id: 'alert.emptyData'}))
          } else if (rate > 0 && amount > 0 && fee >= 0) {
            this.setState({rate, amount, fee, curStep: 1})
          } else {
            IconNotification(ERROR, intl.formatMessage({id: 'alert.invalidData'}))
          }
        }
      })
  }

  newPurchase = () => {
    const {productCount, product} = this.state
    let params = {product_id: product.id, product_count: productCount, currency: PURCHASE_COIN.toLowerCase()}

    newPurchase(params)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const {rate, amount, fee} = response.data
          this.setState({rate, amount, fee, curStep: 2})
          this.props.getAccounts()
          this.fetchPurchaseOptions()
        }
      })
  }

  reset = () => {
    this.setState({curStep: 0, productCount: 0, amount: 0, fee: 0})
  }

  onChangeCount = (productCount) => {
    this.setState({productCount})
  }

  onPrev = () => {
    const {curStep} = this.state
    this.setState({curStep: curStep - 1})
  }

  goHome = () => {
    this.props.history.push('/')
  }

  goUserCenter = () => {
    this.props.history.push(`/${USER}`)
  }

  onCountDownCompleted = () => {
    this.setState({curStep: 0})
  }

  render() {
    const {intl} = this.props
    const {loader, curStep, rate, product, productRate, accounts, productCount, amount, fee, isExistProduct, errorMsg} = this.state
    const {getFieldDecorator} = this.props.form
    const {sales_price, label} = product
    const result = accounts.find(account => account.currency.code.toLowerCase() === PRODUCT_COIN.toLowerCase())

    let balance = 0
    if (!_.isUndefined(result) && !_.isEmpty(result)) {
      balance = result.balance || 0
    }
    const fiatBalance = getFiatFixed(balance * rate)
    const totalFiat = getFiatFixed(productCount * sales_price * productRate)

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="purchase"/></h1>
        <Spin className={'gx-mb-4'} spinning={loader} size="large">
          {
            !isExistProduct &&
            <Result
              status="warning"
              title={intl.formatMessage({id: 'alert.invalidRequest'})}
              subTitle={intl.formatMessage({id: errorMsg})}
              extra={[
                <Fragment>
                  <Button key={'home'} type="primary" onClick={this.goHome}>
                    <FormattedMessage id="go.home"/>
                  </Button>
                  <Button key={'user'} type="primary" onClick={this.goUserCenter}>
                    <FormattedMessage id="go.user"/>
                  </Button>
                </Fragment>
              ]}/>
          }
          {
            (curStep === 1) &&
            <Fragment>
              <FormattedMessage id="deadline"/>&nbsp;
              <Countdown value={Date.now() + PURCHASE_TIME_LIMIT} onFinish={this.onCountDownCompleted}/>
              <Divider/>
            </Fragment>
          }
          {
            curStep < 2 &&
            <Form onSubmit={this.onSubmit}>
              {
                (curStep < 2) && isExistProduct &&
                <FormItem
                  {...formItemLayout}
                  label={intl.formatMessage({id: 'balance'})}>
                  {balance}&nbsp;{PURCHASE_COIN}&nbsp;/&nbsp;{fiatBalance}&nbsp;{FIAT_CURRENCY}
                </FormItem>
              }
              {
                (curStep === 0) && isExistProduct &&
                <Fragment>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'product'})}>
                    {label}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'amount'})}>
                    {getFieldDecorator('amount', {
                      initialValue: productCount,
                      rules: [{
                        required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                      }, {
                        validator: this.checkAmount
                      }]
                    })(
                      <InputNumber
                        pattern="[0-9]*"
                        min={0}
                        onChange={this.onChangeCount}/>
                    )}
                    &nbsp;<FormattedMessage id="set"/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={`${PRODUCT_COIN} ${intl.formatMessage({id: 'price'})}`}>
                    {productRate}&nbsp;{FIAT_CURRENCY}
                  </FormItem>
                  <Divider/>
                  <div className="gx-text-right">
                    <Button type="primary" htmlType="submit">
                      <FormattedMessage id="next"/>
                    </Button>
                  </div>
                </Fragment>
              }
              {
                (curStep === 1) &&
                <Fragment>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'product'})}>
                    {label}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'amount'})}>
                    {productCount} <FormattedMessage id="set"/>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'total'})}>
                    {totalFiat}&nbsp;{FIAT_CURRENCY}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={`${PRODUCT_COIN} ${intl.formatMessage({id: 'price'})}`}>
                    {productRate}&nbsp;{FIAT_CURRENCY}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={`${intl.formatMessage({id: 'needed'})} ${PURCHASE_COIN}`}>
                    {amount}&nbsp;{PURCHASE_COIN}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'gas'})}>
                    {fee}&nbsp;{PURCHASE_COIN}
                  </FormItem>
                  <Divider/>
                  <Row className="gx-mt-4">
                    <Col xl={12} lg={12} sm={12} xs={12} className="gx-text-left">
                      <Button onClick={this.onPrev}>
                        <FormattedMessage id="prev"/>
                      </Button>
                    </Col>
                    <Col xl={12} lg={12} sm={12} xs={12} className="gx-text-right">
                      <Button type="primary" htmlType="submit">
                        <FormattedMessage id="purchase"/>
                      </Button>
                    </Col>
                  </Row>
                </Fragment>
              }
            </Form>
          }
          {
            curStep === 2 &&
            <Result
              status="success"
              title={intl.formatMessage({id: 'success'})}
              subTitle={intl.formatMessage({id: 'purchase.req.success'})}
              extra={[
                <Fragment>
                  <Button key={'home'} type="primary" onClick={this.goHome}>
                    <FormattedMessage id="go.home"/>
                  </Button>
                  <Button key={'reset'} type="primary" onClick={this.onSubmit}>
                    <FormattedMessage id="reset"/>
                  </Button>
                </Fragment>
              ]}/>
          }
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
const WrappedTSFPurchaseForm = Form.create()(Purchase)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedTSFPurchaseForm))
