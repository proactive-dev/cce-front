import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin, Table } from 'antd'
import _ from 'lodash'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getCoinFixed, getFiatFixed, getTableLocaleData, getTimeForTable } from '../../util/helpers'
import { getPurchaseAffiliates, getPurchaseConfigs } from '../../api/axiosAPIs'

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
      pagination: {},
      pldPrice: 0
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
    const {pagination} = this.state
    this.props.getAuthStatus()
    this.fetchData({page: pagination.current})
  }

  fetchData = ({page, perPage}) => {
    getPurchaseConfigs()
      .then(response => {
        if (!_.isEmpty(response.data) && !_.isEmpty(response.data.purchase)) {
          this.setState({pldPrice: response.data.purchase.pld_usd || 0.0})
        }
      })

    getPurchaseAffiliates({page, perPage, currency: CURRENCY})
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const {total_length, referrals} = response.data
          const pageCount = Math.ceil(total_length / perPage)
          const pagination = {...this.state.pagination}
          pagination.total = total_length
          this.setState({referrals, pageCount, pagination})
        }
      })
  }

  onChangeTable = (pagination, filters, sorter) => {
    this.setState({pagination, page: pagination.current})
    this.fetchData({page: pagination.current})
  }

  getColumns() {
    const {intl} = this.props
    const {pldPrice} = this.state

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
        dataIndex: 'total',
        align: 'center',
        render: (value, record) => {
          return `${getCoinFixed(value, record.currency)} ${record.currency.toUpperCase()} ≈ (${getFiatFixed(value * pldPrice)} ${USD})`
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
  getAuthStatus
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AffiliateHistory))
