import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getAccounts } from '../../appRedux/actions/Accounts'
import { Button, Card, Col, Icon, Row, Spin, Typography } from 'antd'
import _ from 'lodash'
import DepositAddress from '../../components/DepositAddress'
import CurrencySelect from '../../components/CurrencySelect'
import BalanceInfo from '../../components/BalanceInfo'
import { IconNotification } from '../../components/IconNotification'
import { HISTORY_TYPE_DEPOSIT, SUCCESS } from '../../constants/AppConfigs'
import { CURRENCIES } from '../../constants/Currencies'
import { TRANSACTIONS } from '../../constants/Paths'
import TransactionHistoryTable from '../../components/TransactionHistoryTable'
import { getDeposits } from '../../api/axiosAPIs'

const {Text} = Typography

class Deposit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      accounts: [],
      currentSymbol: CURRENCIES[0].symbol,
      deposits: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, accounts} = nextProps
    if ((loader !== prevState.loader) || (!_.isEmpty(accounts) && accounts !== prevState.accounts)) {
      return {loader, accounts}
    }
    return null
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.props.getAccounts()
    this.fetchDeposits()

    const {location} = this.props
    if (!_.isEmpty(location.state) && !_.isEmpty(location.state.currency)) {
      this.setState({currentSymbol: location.state.currency})
    }
  }

  fetchDeposits = () => {
    getDeposits()
      .then(response => {
        if (response.data) {
          let deposits = []
          response.data.map(deposit => {
            let tx = deposit
            let currency = CURRENCIES.find(item => item.symbol === tx.currency)
            tx.precision = currency.precision
            deposits.push(tx)
          })
          this.setState({deposits})
        }
      })
  }

  onSelectCurrency = (value) => {
    this.setState({currentSymbol: value})
  }

  onCopyAddress = () => {
    IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'alert.copied'}))
  }

  goTransactions = () => {
    this.props.history.push({
      pathname: `/${TRANSACTIONS}`,
      state: {kind: HISTORY_TYPE_DEPOSIT}
    })
  }

  render() {
    const {intl} = this.props
    const {loader, accounts, currentSymbol, deposits} = this.state
    const result = accounts.find(account => account.currency.code === currentSymbol)
    const account = result === undefined ? {} : result
    const infoUrl = !_.isEmpty(account) ? account.currency.info_url : ''
    const confirm = !_.isEmpty(account) ? account.currency.confirmation : 0
    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="deposit"/></h1>
        <Spin spinning={loader} size="large">
          <Row className="gx-m-0">
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-p-1'}>
              <Card className="gx-h-100" bordered={false}>
                <CurrencySelect value={currentSymbol} onChange={this.onSelectCurrency}/>
                <BalanceInfo account={account} symbol={currentSymbol}/>
                <ul className={'gx-mt-5 gx-mb-4 gx-ml-2 gx-mr-2'}>
                  <li>
                    <FormattedMessage id="deposit.note.1.first"/>&nbsp;
                    <Text type={'warning'}>{confirm}</Text>&nbsp;
                    <FormattedMessage id="deposit.note.1.second"/>
                  </li>
                  <li>
                    <FormattedMessage id="deposit.note.2.first"/>&nbsp;
                    <span className="gx-text-primary gx-link" onClick={this.goTransactions}>
                      {intl.formatMessage({id: 'history'})}&nbsp;
                    </span>
                    <FormattedMessage id="deposit.note.2.second"/>
                  </li>
                </ul>
                <a
                  className={'gx-m-2'}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={infoUrl}>
                  <Icon type="info-circle" theme="filled"/>&nbsp;
                  <FormattedMessage id="what's"/>&nbsp;
                  {currentSymbol.toUpperCase()}?
                </a>
              </Card>
            </Col>
            <Col span={12} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} className={'gx-p-1'}>
              <Card className="gx-h-100 gx-p-1" bordered={false}>
                {
                  !_.isEmpty(account) &&
                  <DepositAddress
                    symbol={currentSymbol}
                    account={account}
                    onCopy={this.onCopyAddress}/>
                }
              </Card>
            </Col>
          </Row>
          <Card
            className="gx-m-1"
            title={intl.formatMessage({id: 'history'})}
            bordered={false}
            extra={
              <Button type="link" className="gx-m-2"
                      onClick={this.goTransactions}>
                <u>{intl.formatMessage({id: 'view.all'})}</u>
              </Button>
            }>
            <TransactionHistoryTable
              data={_.reverse(deposits || []).slice(0, 5)}
              kind={HISTORY_TYPE_DEPOSIT}/>
          </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Deposit))
