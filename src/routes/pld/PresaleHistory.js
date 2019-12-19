import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Spin, Table } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getTableLocaleData, getTimeForTable } from '../../util/helpers'
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
    this.props.getAuthStatus()
    this.fetchData()
  }

  fetchData = () => {
    let {page, perPage} = this.state
    let reqParams = {page, perPage: perPage, currency: CURRENCY}

    getPurchases(reqParams)
      .then(response => {
        const totalLength = response.data.total_length
        const purchases = response.data.purchases
        const pageCount = Math.ceil(totalLength / perPage)
        this.setState({purchases, pageCount})
      })
  }

  onChangeTable = (pagination, filters, sorter) => {
    this.setState({pagination, page: pagination.current})
    this.fetchData()
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
          return `${value} ${record.currency.toUpperCase()}`
        }
      },
      {
        title: intl.formatMessage({id: 'filled%'}),
        dataIndex: 'filled_volume',
        align: 'center',
        render: (value, record) => {
          return `${value} ${record.currency.toUpperCase()}`
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
          <FormattedMessage id="purchase"/>
          &nbsp;{CURRENCY}&nbsp;
          <FormattedMessage id="history"/>
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
