import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Checkbox, Col, Form, Input, Row, Tabs } from 'antd'
import _ from 'lodash'
import MainAccounts from '../../components/MainAccounts'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { DEFAULT_PRECISION, ESTIMATE_SYMBOL } from '../../constants/AppConfigs'
import { DEPOSIT, WITHDRAWAL } from '../../constants/Paths'

const Search = Input.Search

const MARKETS = [{name: 'XRP/BTC', code: 'xrpbtc'}, {name: 'BTC/ETH', code: 'btceth'}]

class Balances extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      accounts: [],
      searchText: '',
      hideZero: false
    }
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.props.getAccounts()
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

  onSearch = (value) => {
    this.setState({searchText: value})
  }

  handleHideZero = (e) => {
    this.setState({hideZero: !e.target.checked})
  }

  goTrade = (pair) => {
    // TODO
  }

  goDeposit = (symbol) => {
    this.props.history.push({
      pathname: `/${DEPOSIT}`,
      state: {currency: symbol}
    })
  }

  goWithdrawal = (symbol) => {
    this.props.history.push({
      pathname: `/${WITHDRAWAL}`,
      state: {currency: symbol}
    })
  }

  render() {
    const {intl} = this.props
    const {loader, accounts, searchText, hideZero} = this.state
    const {TabPane} = Tabs

    let filteredAccounts = accounts
    if (searchText.length) {
      filteredAccounts = filteredAccounts.filter(account => {
        return account.currency.code.toLowerCase().includes(searchText.toLowerCase())
      })
    }
    if (hideZero) {
      filteredAccounts = filteredAccounts.filter(account => {
        return parseFloat(account.balance) + parseFloat(account.locked)
      })
    }
    let data = []
    let mainEstimated = 0
    _.forEach(filteredAccounts, function (value) {
      if (value.currency.visible) {
        let estimation = parseFloat(value.estimated)
        data.push({
          name: value.currency.name,
          symbol: value.currency.code,
          infoUrl: value.currency.info_url,
          locked: parseFloat(value.locked),
          available: parseFloat(value.balance),
          total: parseFloat(value.balance) + parseFloat(value.locked),
          precision: parseInt(value.currency.precision),
          estimation: estimation,
          markets: MARKETS.filter(market => {
            return market.name.toLowerCase().includes(value.currency.code.toLowerCase())
          })
        })
        mainEstimated += estimation
      }
    })

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="balances"/></h1>
        <Tabs defaultActiveKey="1">
          {/*<TabPane tab={intl.formatMessage({id: 'accounts.all'})} key="1">*/}
          {/*  Content of Tab Pane 1*/}
          {/*</TabPane>*/}
          <TabPane tab={intl.formatMessage({id: 'accounts.main'})} key="2">
            <Row className="gx-m-2">
              <Col span={16} xl={16} lg={16} md={16} sm={24} xs={24}>
                <Form layout="inline">
                  <Form.Item>
                    <Search
                      onSearch={this.onSearch}
                      style={{maxWidth: '200px'}}
                      enterButton/>
                  </Form.Item>
                  <Form.Item>
                    <Checkbox
                      checked={!this.state.hideZero}
                      onChange={this.handleHideZero}>
                      {intl.formatMessage({id: 'balance.zero'})}
                    </Checkbox>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={8} xl={8} lg={8} md={8} sm={24} xs={24}
                   className='gx-float-right gx-m-auto'>
                <label>{intl.formatMessage({id: 'estimated.value'})}</label>：
                <strong>
                  {mainEstimated ? parseFloat(mainEstimated).toFixed(DEFAULT_PRECISION) : 0.00000000} {ESTIMATE_SYMBOL}
                </strong>
              </Col>
            </Row>
            <MainAccounts
              dataSource={data}
              onDeposit={this.goDeposit}
              onWithdrawal={this.goWithdrawal}
              onTrade={this.goTrade}/>
          </TabPane>
          {/*<TabPane tab={intl.formatMessage({id: 'accounts.lending'})} key="3">*/}
          {/*  Content of Tab Pane 3*/}
          {/*</TabPane>*/}
        </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Balances))
