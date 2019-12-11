import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { Checkbox, Col, Form, Input, Row, Spin, Tabs } from 'antd'
import MainAccounts from '../../components/MainAccounts'
import _ from 'lodash'

const Search = Input.Search


class Balances extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      accounts: {},
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

  render() {
    const {intl} = this.props
    const {loader, accounts, searchText, hideZero} = this.state
    const {TabPane} = Tabs

    let filteredAccounts = accounts.accounts
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
      let btcEstimated = parseFloat(value.estimated)
      data.push({
        name: value.currency.name,
        symbol: value.currency.code,
        infoUrl: value.currency.info_url,
        locked: parseFloat(value.locked),
        availableBalance: parseFloat(value.balance),
        totalBalance: parseFloat(value.balance) + parseFloat(value.locked),
        precesion: parseInt(value.currency.precision),
        btcVal: btcEstimated
      })
      mainEstimated += btcEstimated
    })

    return (
      <div>
        <h2 className="title gx-mb-4"><FormattedMessage id="Balances"/></h2>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
        <Tabs defaultActiveKey="1">
          {/*<TabPane tab={intl.formatMessage({id: 'accounts.all'})} key="1">*/}
          {/*  Content of Tab Pane 1*/}
          {/*</TabPane>*/}
          <TabPane tab={intl.formatMessage({id: 'accounts.main'})} key="2">
            <div>
              <Row>
                <Col span={16}>
                  <Form layout="inline">
                    <Form.Item>
                      <Search
                        className="gx-mb-3"
                        onSearch={this.onSearch}
                        style={{maxWidth: '180px'}}
                        enterButton/>
                    </Form.Item>
                    <Form.Item>
                      <Checkbox checked={!this.state.hideZero}
                                onChange={this.handleHideZero}>{intl.formatMessage({id: 'balance.zero'})}</Checkbox>
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={8}>
                  <div style={{float: 'right'}}>
                    <label>{intl.formatMessage({id: 'estimated.value'})}</label>：
                    <span><strong>{mainEstimated ? parseFloat(mainEstimated).toFixed(8) : 0.00000000} BTC</strong></span>
                  </div>
                </Col>
              </Row>
            </div>
            <MainAccounts accountData={data}/>
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