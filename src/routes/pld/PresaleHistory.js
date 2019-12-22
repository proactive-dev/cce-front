import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin, Table } from 'antd'
import _ from 'lodash'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getCoinFixed, getTableLocaleData, getTimeForTable } from '../../util/helpers'
import { getPurchases } from '../../api/axiosAPIs'

const CURRENCY = 'PLD'

class PresaleHistory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      purchases: [],
      page: 1,
      pageCount: 1,
      perPage: 10,
      pagination: {}
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
    getPurchases({page, perPage, currency: CURRENCY})
      .then(response => {
        if (_.isEmpty(response.data)) {
          const {total_length, purchases} = response.data
          const pageCount = Math.ceil(total_length / perPage)
          const pagination = {...this.state.pagination}
          pagination.total = total_length
          this.setState({purchases, pageCount, pagination})
        }
      })
  }

  onChangeTable = (pagination, filters, sorter) => {
    this.setState({pagination, page: pagination.current})
    this.fetchData({page: pagination.current})
  }

  getColumns() {
    const {intl} = this.props
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
        title: intl.formatMessage({id: 'product'}),
        dataIndex: 'product_name',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'pack'}),
        dataIndex: 'product_count',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'paid'}),
        dataIndex: 'amount',
        align: 'center',
        render: (value, record) => {
          return `${getCoinFixed(value, record.currency)} ${record.currency.toUpperCase()}`
        }
      },
      {
        title: intl.formatMessage({id: 'filled'}),
        dataIndex: 'filled_volume',
        align: 'center',
        render: (value, record) => {
          return `${getCoinFixed(value, record.currency)} ${record.currency.toUpperCase()}`
        }
      },
      {
        title: intl.formatMessage({id: 'status'}),
        dataIndex: 'state',
        align: 'center',
        render: (value) => {
          return value.toUpperCase()
        }
      }
    ]
  }

  render() {
    const {intl} = this.props
    const {loader, purchases, pagination} = this.state

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4">
          {CURRENCY}&nbsp;
          <FormattedMessage id="purchase.history"/>
        </h1>
        <Spin spinning={loader} size="large">
          <Table className="gx-table-responsive gx-mt-4 gx-mb-4"
                 columns={this.getColumns()}
                 dataSource={purchases}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PresaleHistory))
