import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Spin, Table } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getInvests, newInvest } from '../../api/axiosAPIs'
import _ from 'lodash'
import { getTableLocaleData, getTimeForTable } from '../../util/helpers'

const FormItem = Form.Item
const Option = Select.Option

const UNITS = [25, 700000, 1200000]
const PRODUCT_CURRENCY = 'TSF'
const AYEARTIMESSTEMP = 31536000

class ProfitProgram extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      productCount: 0,
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
        dataIndex: 'unit',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'set'}),
        dataIndex: 'count',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'available'}),
        dataIndex: 'availableAt',
        align: 'center',
        render: (value) => {
          return getTimeForTable(value)
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
      invest: {
        member_id: profile.id,
        currency: PRODUCT_CURRENCY.toLowerCase(),
        unit: values.coins,
        count: values.productCount
      },
      two_factor: {
        type: 'app',
        otp: twoFactor
      }
    }

    newInvest(params)
      .then(response => {
        this.setState({
          unit: UNITS[0],
          productCount: 1,
          twoFactor: ''
        })
        this.props.getAccounts()
        this.getHistory()
      })
  }

  getHistory() {
    getInvests()
      .then(response => {
        let history = response.data
        if (!_.isEmpty(history)) {
          this.setState({history})
        }
      })
  }

  onChangeCount = (productCount) => {
    this.setState({productCount: productCount})
  }

  onChangeTwoFactor = (event) => {
    const twoFactor = event.target.value
    this.setState({twoFactor})
  }

  render() {
    const {intl} = this.props
    const {getFieldDecorator} = this.props.form
    const {loader, productCount, accounts, history} = this.state
    const result = accounts.find(account => account.currency.code === PRODUCT_CURRENCY.toLowerCase())
    let balance = 0
    if (!_.isUndefined(result) && !_.isEmpty(result)) {
      balance = result.balance || 0
    }
    let dataList = []
    history.map(item => {
      let data = item
      let availableAt = item.created_at + 3 * AYEARTIMESSTEMP
      data.availableAt = availableAt
      dataList.push(data)
    })

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="profit.program"/></h1>
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
                          UNITS.map(unit => {
                            return (
                              <Option key={unit} value={unit}>{unit}</Option>
                            )
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label={intl.formatMessage({id: 'product'})}
                    wrapperCol={{sm: 24}}
                    className={'gx-w-100 gx-m-0'}>
                    {getFieldDecorator('productCount', {
                      rules: [{
                        required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})
                      }, {
                        validator: this.checkAmount
                      }]
                    })(
                      <InputNumber
                        className="gx-w-100"
                        min={0}
                        value={productCount}
                        onChange={this.onChangeCount}/>
                    )}
                  </FormItem>
                  {
                    this.tfaStatus() &&
                    <FormItem
                      label={intl.formatMessage({id: '2fa'})}
                      wrapperCol={{sm: 24}}
                      className={'gx-w-100 gx-m-2'}>
                      {getFieldDecorator('twoFactor', {
                        rules: [{required: false, message: intl.formatMessage({id: 'alert.fieldRequired'})}]
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
  getAuthStatus
}

const mapStateToProps = ({progress, accounts, user}) => {
  return {
    loader: progress.loader,
    accounts: accounts.accounts,
    profile: user.profile
  }
}

const WrappedProfitProgramForm = Form.create()(ProfitProgram)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedProfitProgramForm))
