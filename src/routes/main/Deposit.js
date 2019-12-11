import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { Card, Col, Icon, Row, Select, Spin, Typography } from 'antd'
import _ from 'lodash'
import { CURRENCIES } from '../../constants/Currencies'
import DepositAddress from '../../components/DepositAddress'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'
import { getFixed } from '../../util/helpers'

const Option = Select.Option
const {Text} = Typography

class Deposit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      accounts: [],
      currentSymbol: 'btc'
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
  }

  handleChange = (value) => {
    this.setState({currentSymbol: value})
  }

  handleCopyQRCode(message) {
    IconNotification(SUCCESS, message)
  }

  render() {
    const {intl} = this.props
    const {loader, accounts, currentSymbol} = this.state
    const result = accounts.find(account => account.currency.code === currentSymbol)
    const account = result === undefined ? {} : result
    const balance = !_.isEmpty(account) ? getFixed(parseFloat(account.balance), parseInt(account.currency.precision)) : 0.0
    const locked = !_.isEmpty(account) ? getFixed(parseFloat(account.locked), parseInt(account.currency.precision)) : 0.0
    const total = !_.isEmpty(account) ? getFixed(parseFloat(account.balance) + parseFloat(account.locked), parseInt(account.currency.precision)) : 0.0
    const infoUrl = !_.isEmpty(account) ? account.currency.info_url : ''
    const confirm = !_.isEmpty(account) ? account.currency.confirmation : 0
    return (
      <div>
        <h2 className="title gx-mb-4"><FormattedMessage id="deposit"/></h2>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
        <div>
          <Row type='flex' gutter={12}>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-mb-2'}>
              <Card bordered={false} style={{height: '100%'}}>
                <Select
                  showSearch
                  style={{width: '100%'}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  defaultValue={currentSymbol}
                  onChange={this.handleChange}
                  // onFocus={handleFocus}
                  // onBlur={handleBlur}
                  // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    CURRENCIES.map((coin) => {
                        if (coin.visible)
                          return <Option value={coin.symbol} key={coin.symbol}>
                            {/*<img src={require(`assets/images/coins/${coin.symbol.toLowerCase()}.png`)}*/}
                            {/*     style={{maxWidth: 16}} alt={coin.code}/>*/}
                            &nbsp;<strong>{coin.symbol.toUpperCase()}</strong>&nbsp;-&nbsp;{coin.name}
                          </Option>
                      }
                    )}
                </Select>
                <div className={'gx-mt-3'}>
                  <Row>
                    <Col span={12}>
                      <p><FormattedMessage id="balance.total"/></p>
                    </Col>
                    <Col span={12}>
                      <p>{total}&nbsp;{currentSymbol.toUpperCase()}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <p><FormattedMessage id="balance.available"/></p>
                    </Col>
                    <Col span={12}>
                      <p>{balance}&nbsp;{currentSymbol.toUpperCase()}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <p><FormattedMessage id="locked"/></p>
                    </Col>
                    <Col span={12}>
                      <p>{locked}&nbsp;{currentSymbol.toUpperCase()}</p>
                    </Col>
                  </Row>
                </div>
                <div className={'gx-mt-2'}>
                  <ul>
                    <li><FormattedMessage id="deposit.note.1.first"/> <Text
                      type={'warning'}>{confirm}</Text> <FormattedMessage
                      id="deposit.note.1.second"/>
                    </li>
                    <li><FormattedMessage id="deposit.note.2.first"/>
                      <a href="/funds/transactions?kind=deposit" className="text-active">
                        &nbsp;{intl.formatMessage({id: 'history'})}&nbsp;</a><FormattedMessage
                        id="deposit.note.2.second"/>
                    </li>
                  </ul>
                </div>
                <div className={'gx-mt-2'}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={infoUrl}>
                    <Text type={'warning'}><Icon type="info-circle" theme="filled"/>&nbsp;<FormattedMessage
                      id="what's"/> {currentSymbol.toUpperCase()}?</Text>
                  </a>
                </div>
              </Card>
            </Col>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Card bordered={false} style={{height: '100%'}}>
                {
                  !_.isEmpty(account) &&
                  <DepositAddress symbol={currentSymbol} account={account} onCopyQRCode={this.handleCopyQRCode}/>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Deposit))
