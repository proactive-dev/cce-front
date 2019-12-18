import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Divider, Form, InputNumber, Result, Row, Spin, Statistic } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { getPurchaseOptions, newPurchase, preparePurchase } from '../../api/axiosAPIs'
import { isMobile } from 'react-device-detect'
import _ from 'lodash'
import { USER } from '../../constants/Paths'
import { IconNotification } from '../../components/IconNotification'
import { ERROR } from '../../constants/AppConfigs'

const FormItem = Form.Item
const {Countdown} = Statistic

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
    md: {span: 6},
    lg: {span: 6}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
    md: {span: 16},
    lg: {span: 16}
  }
}

const currency = 'ETH'
const fiatCurrency = 'USD'
const PRODUCT_CURRENCY = 'TSF'

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
      isExistProduct: false,
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

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {curStep} = this.state
        if (curStep === 0) {
          this.doPreparePurchase()
        } else if (curStep === 1) {
          this.doNewPurchase()
        } else {
          this.doReset()
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
    let params = {currency: currency, fiat: fiatCurrency, product_currency: PRODUCT_CURRENCY}
    getPurchaseOptions(params)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const {rate, product_rate, products} = response.data
          if (rate > 0 && product_rate > 0 && !_.isEmpty(products)) {
            const product = products[0]
            this.setState({rate, products, product, productRate: product_rate, isExistProduct: true})
          } else {
            if (!rate && !!products && !product_rate) {
              this.setState({errorMsg: 'alert.emptyData'})
            } else {
              this.setState({errorMsg: 'alert.invalidData'})
            }
          }
        }
      })
  }

  doPreparePurchase = () => {
    const {productCount, product} = this.state
    const {intl} = this.props
    let params = {product_id: product.id, product_count: productCount, currency: currency.toLowerCase()}

    preparePurchase(params)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const {rate, amount, fee} = response.data
          if (rate > 0 && amount > 0 && fee >= 0) {
            this.setState({rate, amount, fee, curStep: 1})
          } else {
            if (!rate && !amount && !fee) {
              IconNotification(ERROR, intl.formatMessage({id: 'alert.emptyData'}))
            } else {
              IconNotification(ERROR, intl.formatMessage({id: 'alert.invalidData'}))
            }
          }
        }
      })
  }

  doNewPurchase = () => {
    const {productCount, product} = this.state
    let params = {product_id: product.id, product_count: productCount, currency: currency.toLowerCase()}

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

  doReset = () => {
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

  goUser = () => {
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
    const result = accounts.find(account => account.currency.code === PRODUCT_CURRENCY.toLowerCase())

    let balance = 0
    if (!_.isUndefined(result) && !_.isEmpty(result)) {
      balance = result.balance || 0
    }
    const fiatBalance = (balance * rate).toFixed(2).toString()
    const totalFiat = (productCount * sales_price * productRate).toFixed(2).toString()
    const deadline = Date.now() + 1000 * 60 * 10

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="purchase"/></h1>
        <Spin className="gx-auth-container" spinning={loader} size="large">
          <div className={!isMobile ? 'gx-offset-3' : 'gx-ml-0'} style={!isMobile ? {marginRight: '30%'} : {}}>
            <Form
              onSubmit={this.handleSubmit}>
              {
                !isExistProduct &&
                <div>
                  <Result
                    status="warning"
                    title={intl.formatMessage({id: 'alert.request'})}
                    subTitle={intl.formatMessage({id: errorMsg})}
                    extra={[
                      <div key={'btn'}>
                        <Button className="gx-text-center" type="primary" onClick={this.goUser}>
                          <FormattedMessage id="go.user"/>
                        </Button>
                        <Button className="gx-text-center" type="primary" onClick={this.goHome}>
                          <FormattedMessage id="go.home"/>
                        </Button>
                      </div>
                    ]}/>
                </div>
              }
              {
                (curStep === 1) &&
                <div>
                  <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'deadline'})}>
                    <Countdown value={deadline} onFinish={this.onCountDownCompleted}/>
                  </FormItem>
                  <Divider/>
                </div>
              }
              {
                ((curStep === 0 || curStep === 1) && isExistProduct) &&
                <FormItem
                  {...formItemLayout}
                  label={intl.formatMessage({id: 'balance'})}>
                  <div>{balance} {currency} / {fiatBalance} {fiatCurrency}</div>
                </FormItem>
              }
              {
                (curStep === 0 && isExistProduct) &&
                <div>
                  <FormItem
                    className="gx-mt-0 gx-mb-0"
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'product'})}>
                    {getFieldDecorator('product', {
                      initialValue: productCount,
                      rules: [{
                        required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                      }, {
                        validator: this.checkAmount
                      }]
                    })(
                      <div>
                        {label}
                        <InputNumber
                          className="gx-ml-2 gx-mr-2"
                          min={0}
                          value={productCount}
                          onChange={this.onChangeCount}/>
                        <FormattedMessage id="set"/>
                      </div>
                    )}
                  </FormItem>
                  <FormItem
                    className="gx-mt-0 gx-mb-0"
                    {...formItemLayout}
                    label={intl.formatMessage({id: 'price'})}>
                    {getFieldDecorator('balance')(
                      <div>{productRate} {fiatCurrency}</div>
                    )}
                  </FormItem>
                  <Divider/>
                  <div className="gx-text-right">
                    <Button type="primary" htmlType="submit">
                      <FormattedMessage id="next"/>
                    </Button>
                  </div>
                </div>
              }
              {
                (curStep === 1) &&
                <div>
                  <div>
                    <FormItem
                      className="gx-mt-0 gx-mb-0"
                      {...formItemLayout}
                      label={intl.formatMessage({id: 'product'})}>
                      <div>{label}</div>
                    </FormItem>
                    <FormItem
                      className="gx-mt-0 gx-mb-0"
                      {...formItemLayout}
                      label={intl.formatMessage({id: 'amount'})}>
                      <div>{productCount} <FormattedMessage id="set"/></div>
                    </FormItem>
                    <FormItem
                      className="gx-mt-0 gx-mb-0"
                      {...formItemLayout}
                      label={intl.formatMessage({id: 'total'})}>
                      <div>{totalFiat} {fiatCurrency}</div>
                    </FormItem>
                    <FormItem
                      className="gx-mt-0 gx-mb-0"
                      {...formItemLayout}
                      label={intl.formatMessage({id: 'price'})}>
                      {getFieldDecorator('balance')(
                        <div>{productRate} {fiatCurrency}</div>
                      )}
                    </FormItem>
                    <FormItem
                      className="gx-mt-0 gx-mb-0"
                      {...formItemLayout}
                      label={`${intl.formatMessage({id: 'needed'})} ${currency}`}>
                      {getFieldDecorator('balance')(
                        <div>{amount} {currency}</div>
                      )}
                    </FormItem>
                    <FormItem
                      className="gx-mt-0 gx-mb-0"
                      {...formItemLayout}
                      label={intl.formatMessage({id: 'gas'})}>
                      {getFieldDecorator('gas')(
                        <div>{fee} {currency}</div>
                      )}
                    </FormItem>

                  </div>
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
                </div>
              }
              {
                curStep === 2 &&
                <b>
                  <FormattedMessage id="purchase.req.success"/>
                  <Divider/>
                  <div className="gx-text-right">
                    <Button type="primary" htmlType="submit">
                      <FormattedMessage id="reset"/>
                    </Button>
                  </div>
                </b>
              }
            </Form>
          </div>
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
