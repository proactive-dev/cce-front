import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { Button, Card, Col, Form, Input, Row, Spin } from 'antd'
import CurrencySelect from '../../components/CurrencySelect'
import AddressTable from '../../components/AddressTable'
import { deleteAddress, getAddresses, newAddress } from '../../api/axiosAPIs'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import { isXRP } from '../../util/helpers'

const {TextArea, Search} = Input

class AddressManagement extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      addressData: [],
      currentSymbol: 'btc',
      searchCoin: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.fetchAddresses()
  }

  fetchAddresses = () => {
    getAddresses()
      .then(response => {
        const addressData = response.data || []
        this.setState({addressData})
      })
  }

  onSelectCurrency = (value) => {
    this.setState({currentSymbol: value})
  }

  checkLabel = (rule, value, callback) => {
    if (value && value.length > 20) {
      callback(this.props.intl.formatMessage({id: 'alert.inputAddrLabel'}))
      return
    }
    callback()
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {currentSymbol} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          currency: currentSymbol,
          uid: values.address,
          extra: values.label
        }
        if (isXRP(currentSymbol)) {
          params['tag'] = values.tag
        }
        newAddress(params)
          .then(response => {
            this.fetchAddresses()
            this.props.form.resetFields()
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

  handleDeleteAddr = (data) => {
    deleteAddress(data.id).then(response => {
      this.fetchAddresses()
      this.setState({searchCoin: ''})
    })
  }

  render() {
    const {intl} = this.props
    const {loader, currentSymbol, addressData} = this.state
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="address.management"/></h1>
        <Spin spinning={loader} size="large">
          <Row type='flex' gutter={12}>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-mb-2'}>
              <Card bordered={false}>
                <Form onSubmit={this.onSubmit}>
                  <Form.Item
                    label={intl.formatMessage({id: 'coin'})}
                    wrapperCol={{sm: 24}}
                    className={'gx-w-100 gx-m-0'}>
                    <CurrencySelect value={currentSymbol} onChange={this.onSelectCurrency}/>
                  </Form.Item>
                  <Form.Item
                    label={intl.formatMessage({id: 'label'})}
                    wrapperCol={{sm: 24}}
                    className={'gx-w-100 gx-m-0'}>
                    {getFieldDecorator('label', {
                        rules: [{
                          required: true,
                          message: intl.formatMessage({id: 'alert.fieldRequired'})
                        },
                          {
                            validator: this.checkLabel
                          }]
                      }
                    )(<Input/>)}
                  </Form.Item>
                  <Form.Item
                    label={intl.formatMessage({id: 'address'})}
                    wrapperCol={{sm: 24}}
                    className={'gx-w-100 gx-m-0'}>
                    {getFieldDecorator('address', {
                        rules: [{
                          required: true,
                          message: intl.formatMessage({id: 'alert.fieldRequired'})
                        }]
                      }
                    )(<TextArea rows={4}/>)}
                  </Form.Item>
                  {
                    isXRP(currentSymbol) && (
                      <Form.Item
                        label={intl.formatMessage({id: 'tag'})}
                        wrapperCol={{sm: 24}}
                        className={'gx-w-100 gx-m-0'}>
                        {getFieldDecorator('tag', {
                          rules: [
                            {required: true, message: intl.formatMessage({id: 'alert.fieldRequired'})}
                          ]
                        })(<TextArea rows={4}/>)}
                      </Form.Item>
                    )
                  }
                  <Button type="primary" className='auth-form-button gx-mt-3' onClick={this.onSubmit}>
                    <FormattedMessage id="submit"/>
                  </Button>
                </Form>
              </Card>
            </Col>
            <Col span={12} xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card bordered={false}>
                <Search
                  className="gx-mb-3 gx-w-50"
                  addonBefore={intl.formatMessage({id: 'coin'})}
                  placeholder={intl.formatMessage({id: 'search.inputKey'})}
                  onSearch={this.onSearch}
                  enterButton/>
                <AddressTable
                  data={addressData}
                  filter={this.state.searchCoin}
                  onDelete={this.handleDeleteAddr}/>
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

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

const WrappedAddressManagementForm = Form.create()(AddressManagement)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(WrappedAddressManagementForm))
