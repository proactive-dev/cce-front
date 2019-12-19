import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin, Table } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getCoinFixed, getFixed, getTableLocaleData, getTimeForTable } from '../../util/helpers'
import { getPurchaseAffiliates } from '../../api/axiosAPIs'
import { getAccounts } from '../../appRedux/actions/Accounts'
import _ from 'lodash'

const CURRENCY = 'PLD'
const USD = 'USD'

class AffiliateHistory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      referrals: [],
      page: 1,
      pageCount: 1,
      perPage: 10,
      pagination: {}
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
    this.fetchData()
  }

  fetchData = () => {
    let {page, perPage} = this.state
    let reqParams = {page, perPage: perPage, currency: CURRENCY}

    getPurchaseAffiliates(reqParams)
      .then(response => {
        const totalLength = response.data.total_length
        const referrals = response.data.referrals
        const pageCount = Math.ceil(totalLength / perPage)
        this.setState({referrals, pageCount})
      })
  }

  onChangeTable = (pagination, filters, sorter) => {
    this.setState({pagination, page: pagination.current})
    this.fetchData()
  }

  getColumns() {
    const {intl} = this.props
    const {accounts} = this.state
    const result = accounts.find(account => account.currency.code === CURRENCY.toLowerCase())
    const account = (_.isUndefined(result) || _.isEmpty(result)) ? {} : result
    const pldPrice = !_.isEmpty(account) ? getFixed(parseFloat(account.balance), parseInt(account.currency.precision)) : 0.0

    return [
      {
        title: intl.formatMessage({id: 'date'}),
        dataIndex: 'at',
        align: 'center',
        render: (value) => {
          return getTimeForTable(value)
        }
      },
      {
        title: intl.formatMessage({id: 'amount'}),
        dataIndex: 'amount',
        align: 'center',
        render: (value, record) => {
          return `${value} ${record.currency.toUpperCase()} ≈ (${getCoinFixed(value * pldPrice, USD)}} ${USD})`
        }
      },
      {
        title: intl.formatMessage({id: 'referee'}),
        dataIndex: 'referee',
        align: 'center'
      }
    ]
  }

  render() {
    const {intl} = this.props
    const {loader, referrals, pagination} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4">
          {CURRENCY}&nbsp;
          <FormattedMessage id="purchase"/>&nbsp;
          <FormattedMessage id="affiliate.history"/>
        </h1>
        <Spin spinning={loader} size="large">
          <Table className="gx-table-responsive gx-mt-4 gx-mb-4"
                 columns={this.getColumns()}
                 dataSource={referrals}
                 pagination={pagination}
                 locale={getTableLocaleData(intl)}
                 onChange={this.onChangeTable}
                 rowKey={'id'}
                 size='middle'/>
        </Spin>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus, getAccounts
}

const mapStateToProps = ({progress, accounts}) => {
  return {
    loader: progress.loader,
    accounts: accounts.accounts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AffiliateHistory))
