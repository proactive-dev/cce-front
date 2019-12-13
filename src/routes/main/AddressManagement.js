import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { Button, Card, Col, Form, Input, Row, Spin, Typography } from 'antd'
import _ from 'lodash'
import CurrencySelect from '../../components/CurrencySelect'
import AddressTable from '../../components/AddressTable'
import { getAddresses, newAddress, deleteAddress } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'

const {Text} = Typography
const {TextArea} = Input
const Search = Input.Search

class AddressManagement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      accounts: [],
      addrs: [],
      currentSymbol: 'btc',
      searchCoin:''
    }
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
    this.buildData()
  }

  buildData() {
    getAddresses()
      .then(response => {
        const addrs = response.data
        this.setState({addrs})
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = (value) => {
    this.setState({currentSymbol: value})
  }

  checkLabel = (rule, value, callback) => {
    if (value && value.length > 20) {
      callback(this.props.intl.formatMessage({id: 'alert.inputAddrLabel'}))
      return
    }
    callback()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {currentSymbol} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          currency: currentSymbol,
          uid: values.address,
          extra: values.label
        }
        if (currentSymbol === 'xrp') {
          params['tag'] = values.tag
        }
        let that = this
        newAddress(params)
          .then(response => {

            IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'new.addr.success'}))
          })
      }
    })
  }

  onSearch = (value) => {
    this.setState({
      searchCoin: value
    })
  }

  handleDeleteAddr=(data)=>
  {
    deleteAddress(data.id)
    this.buildData()
    this.setState({searchCoin: ''})
  }

  render() {
    const {intl} = this.props
    const {loader, currentSymbol, addrs} = this.state
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="address.management"/></h1>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
        <div>
          <Row type='flex' gutter={12}>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-mb-2'}>
              <Card bordered={false} style={{height: '100%'}}>

                <Form onSubmit={this.handleSubmit}>
                  <Form.Item label={intl.formatMessage({id: 'coin'})} wrapperCol={{sm: 24}}
                             style={{width: '100%', margin: 0}}>
                    <CurrencySelect value={currentSymbol} onChange={this.handleChange}/>
                  </Form.Item>
                  <Form.Item label={intl.formatMessage({id: 'label'})} wrapperCol={{sm: 24}}
                             style={{width: '100%', margin: 0}}>
                    {getFieldDecorator('label', {
                      rules: [
                        {
                          required: true,
                          message: intl.formatMessage({id: 'alert.fieldRequired'})
                        },
                        {
                          validator: this.checkLabel
                        }
                      ]
                    })(<Input />)}
                  </Form.Item>

                  <Form.Item label={intl.formatMessage({id: 'address'})} wrapperCol={{sm: 24}}
                             style={{width: '100%', margin: 0}}>
                    {getFieldDecorator('address', {
                      rules: [
                        {
                          required: true,
                          message: intl.formatMessage({id: 'alert.fieldRequired'})
                        }
                      ]
                    })(<TextArea rows={4} />)}
                  </Form.Item>

                  {currentSymbol === 'xrp' && (
                    <Form.Item label={intl.formatMessage({id: 'tag'})} wrapperCol={{sm: 24}}
                               style={{width: '100%', margin: 0}}>
                      {getFieldDecorator('tag', {
                        rules: [
                          {required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}
                        ]
                      })(<TextArea rows={4} />)}
                    </Form.Item>
                  )}

                  <div className='gx-mt-2'>
                    <Button type='primary' block onClick={this.handleSubmit}><FormattedMessage id="submit"/></Button>
                  </div>
                </Form>
              </Card>
            </Col>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Card bordered={false} style={{height: '100%'}}>
                <Search
                  className="gx-mb-3"
                  addonBefore={intl.formatMessage({id: 'coin'})}
                  placeholder={intl.formatMessage({id: 'search.inputKey'})}
                  onSearch={this.onSearch}
                  style={{width:'50%'}}
                  enterButton/>
                <AddressTable addrs={addrs} filter={this.state.searchCoin} onDelete={this.handleDeleteAddr}/>
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

const WrappedAddressManagementForm = Form.create()(AddressManagement)
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedAddressManagementForm))
