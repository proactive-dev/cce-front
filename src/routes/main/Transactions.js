import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin, Tabs } from 'antd'
import _ from 'lodash'
import { getAuthStatus } from '../../appRedux/actions/User'
import TransactionHistoryTable from '../../components/TransactionHistoryTable'
import { getDeposits, getWithdraws } from '../../api/axiosAPIs'
import { CSVLink } from 'react-csv'
import { convertToDate, getFixed } from '../../util/helpers'
import { HISTORY_TYPE_DEPOSIT, HISTORY_TYPE_WITHDRAWAL, REGX } from '../../constants/AppConfigs'
import { CURRENCIES } from '../../constants/Currencies'

const TabPane = Tabs.TabPane

class Transactions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      kind: HISTORY_TYPE_DEPOSIT,
      transactions: [],
      exportData: [],
      exportReady: true
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

    const {location} = this.props
    if (!_.isEmpty(location.state) && location.state.kind) {
      this.setState({kind: location.state.kind, transactions: []})
      if (location.state.kind === HISTORY_TYPE_WITHDRAWAL) {
        this.fetchWithdraws()
        return
      }
    }
    this.fetchDeposits()

  }

  fetchDeposits = () => {
    getDeposits()
      .then(response => {
        if (response.data) {
          this.onSetData(response.data)
        }
      })
  }

  fetchWithdraws = () => {
    getWithdraws()
      .then(response => {
        if (response.data) {
          this.onSetData(response.data)
        }
      })
  }

  onSetData(data) {
    let exportData = this.buildExportData(data)
    let transactions = []
    data.map(transaction => {
      let tx = transaction
      let currency = CURRENCIES.find(item => item.symbol === tx.currency)
      tx.precision = currency.precision
      if (tx.currency === currency.feeSymbol) {
        tx.feeSymbolPrecision = currency.precision
      } else {
        let feeSymbol = CURRENCIES.find(item => item.feeSymbol === currency.feeSymbol)
        tx.feeSymbolPrecision = feeSymbol.precision
      }
      transactions.push(tx)
    })
    this.setState({transactions: transactions, exportData, exportReady: true})
  }

  buildExportData(data) {
    const {intl} = this.props
    const {kind} = this.state

    let exportData = []
    exportData.push([
      intl.formatMessage({id: 'date'}),
      intl.formatMessage({id: 'status'}),
      intl.formatMessage({id: 'coin'}),
      intl.formatMessage({id: 'amount'}),
      intl.formatMessage({id: 'commission'}),
      'TxID'
    ])

    for (let i = 0; i < data.length; i++) {
      const transaction = data[i]
      let currency = CURRENCIES.find(item => item.symbol === transaction.currency)
      let precision = currency.precision
      let feeSymbolPrecision = 0
      if (transaction.currency === currency.feeSymbol) {
        feeSymbolPrecision = currency.precision
      } else {
        let feesymbol = CURRENCIES.find(item => item.feeSymbol === currency.feeSymbol)
        feeSymbolPrecision = feesymbol.precision
      }
      const date = transaction.created_at.replace(REGX, ' ').replace('.000', '')
      const status = intl.formatMessage({id: `${kind}.${transaction.aasm_state}`}).toUpperCase()
      const coin = transaction.currency.toUpperCase()
      const amount = getFixed(transaction.amount, precision)
      const commission = getFixed(transaction.fee, feeSymbolPrecision)
      const txID = transaction.txid
      exportData.push([
        date,
        status,
        coin,
        amount,
        commission,
        txID
      ])
    }
    return exportData
  }

  onChangeKind = activeKey => {
    this.setState({kind: activeKey, transactions: []})
    if (activeKey === HISTORY_TYPE_DEPOSIT) {
      this.fetchDeposits()
    } else {
      this.fetchWithdraws()
    }
  }

  render() {
    const {intl} = this.props
    const {loader, kind, transactions, exportData, exportReady} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="transaction.history"/></h1>
        <Spin spinning={loader} size="large">
          <Tabs
            size='large'
            onChange={this.onChangeKind}
            activeKey={kind}>
            <TabPane
              className="gx-p-1"
              key={HISTORY_TYPE_DEPOSIT}
              tab={intl.formatMessage({id: 'deposit'})}/>
            <TabPane
              className="gx-p-1"
              key={HISTORY_TYPE_WITHDRAWAL}
              tab={intl.formatMessage({id: 'withdrawal'})}/>
          </Tabs>
          <div className="gx-text-right">
            {
              exportReady &&
              <CSVLink
                className="gx-text-right"
                data={exportData}
                filename={`${convertToDate(new Date())}_${kind === HISTORY_TYPE_DEPOSIT ? HISTORY_TYPE_DEPOSIT : 'withdrawal'}.csv`}>
                {intl.formatMessage({id: `export.${kind === HISTORY_TYPE_DEPOSIT ? HISTORY_TYPE_DEPOSIT : 'withdrawal'}.history`})}
              </CSVLink>
            }
          </div>
          <TransactionHistoryTable
            data={transactions}
            kind={kind}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Transactions))
