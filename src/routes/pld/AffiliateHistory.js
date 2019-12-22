import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin, Table } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getFiatFixed, getTableLocaleData, getTimeForTable } from '../../util/helpers'
import { getPurchaseAffiliates, getPurchaseConfigs } from '../../api/axiosAPIs'
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
    this.props.getAuthStatus()
    this.fetchData()
  }

  fetchData = () => {
    let {page, perPage} = this.state
    getPurchaseConfigs().then(response => {
      if (!_.isEmpty(response.data) && !_.isEmpty(response.data.purchase)) {
        this.setState({pldPrice: response.data.purchase.pld_usd})
      }
    })

    let reqParams = {page, perPage: perPage, currency: CURRENCY}

    getPurchaseAffiliates(reqParams)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const totalLength = response.data.total_length
          const referrals = response.data.referrals
          const pageCount = Math.ceil(totalLength / perPage)
          this.setState({referrals, pageCount})
        }
      })
  }

  onChangeTable = (pagination, filters, sorter) => {
    this.setState({pagination, page: pagination.current})
    this.fetchData()
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
          return `${value} ${record.currency.toUpperCase()} ≈ (${getFiatFixed(value * pldPrice)}} ${USD})`
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
