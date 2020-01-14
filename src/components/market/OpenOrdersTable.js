import React from 'react'
import { Modal, Popconfirm, Select, Table } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getFixed, getTableLocaleData, getTimeForTable } from '../../util/helpers'
import { clearOrder, clearOrderAsks, clearOrderBids, clearOrders } from '../../api/axiosAPIs'
import { IconNotification } from '../common/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'

const Option = Select.Option

const CANCEL_MENUS = [
  'cancel.none',
  'cancel.all',
  'cancel.bids',
  'cancel.asks'
]
const CANCEL_CONFIRM_MSG = {
  'cancel.all': 'confirm.cancel.all.orders',
  'cancel.bids': 'confirm.cancel.bids',
  'cancel.asks': 'confirm.cancel.asks'
}

class OpenOrdersTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cancelType: CANCEL_MENUS[0],
      confirmPopupOpened: false
    }
  }

  cancelOrder = order => {
    clearOrder(order.market, order.id)
      .then(response => {
        this.props.onRefresh()
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  cancelAll = () => {
    clearOrders(this.props.marketId)
      .then(response => {
        this.props.onRefresh()
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  cancelBids = () => {
    clearOrderBids(this.props.marketId)
      .then(response => {
        this.props.onRefresh()
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  cancelAsks = () => {
    clearOrderAsks(this.props.marketId)
      .then(response => {
        this.props.onRefresh()
        IconNotification(SUCCESS, this.props.intl.formatMessage({id: 'success'}))
      })
  }

  onCancel = () => {
    this.setState({cancelType: CANCEL_MENUS[0], confirmPopupOpened: false})
  }

  onOk = () => {
    const {cancelType} = this.state
    if (cancelType === 'cancel.all') {
      this.cancelAll()
    } else if (cancelType === 'cancel.bids') {
      this.cancelBids()
    } else if (cancelType === 'cancel.asks') {
      this.cancelAsks()
    }
    this.setState({cancelType: CANCEL_MENUS[0], confirmPopupOpened: false})
  }

  onGroupCancel = (value) => {
    this.setState({cancelType: value, confirmPopupOpened: value !== CANCEL_MENUS[0]})
  }

  getConfirmMessage = () => {
    const {intl} = this.props
    const {cancelType} = this.state
    let message = CANCEL_CONFIRM_MSG[cancelType]
    return !!message ? intl.formatMessage({id: message}) : ''
  }

  getColumns = () => {
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
        title: intl.formatMessage({id: 'pair'}),
        dataIndex: 'marketName',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'side'}),
        dataIndex: 'kind',
        align: 'center',
        render: (value) => {
          return <FormattedMessage id={value}/>
        }
      },
      {
        title: intl.formatMessage({id: 'price'}),
        dataIndex: 'price',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.priceFixed)
        }
      },
      {
        title: intl.formatMessage({id: 'amount'}),
        dataIndex: 'origin_volume',
        align: 'center',
        render: (value, record) => {
          return getFixed(value, record.amountFixed)
        }
      },
      {
        title: intl.formatMessage({id: 'filled%'}),
        dataIndex: 'filled',
        align: 'center',
        render: (value, record) => {
          return getFixed((record.origin_volume - record.volume) * 100 / record.origin_volume, 2)
        }
      },
      {
        title: intl.formatMessage({id: 'total'}),
        dataIndex: 'total',
        align: 'center',
        render: (value, record) => {
          return getFixed(record.origin_volume * record.price, record.priceFixed)
        }
      },
      {
        title: (
          <Select style={{width: 120}}
                  defaultValue={CANCEL_MENUS[0]}
                  value={this.state.cancelType}
                  disabled={!this.props.marketId}
                  size={'small'}
                  onChange={this.onGroupCancel}>
            {
              CANCEL_MENUS.map((menu, index) =>
                <Option key={menu} value={menu}>
                  {index === 0 ? '---' : intl.formatMessage({id: menu})}
                </Option>
              )
            }
          </Select>
        ),
        dataIndex: 'id',
        align: 'center',
        render: (value, record) => {
          return (
            <Popconfirm
              title={intl.formatMessage({id: 'confirm.cancel.order'})}
              onConfirm={e => this.cancelOrder(record)}
              okText={intl.formatMessage({id: 'ok'})}
              cancelText={intl.formatMessage({id: 'cancel'})}>
              <u
                className="gx-link gx-m-2">
                {intl.formatMessage({id: 'cancel'})}
              </u>
            </Popconfirm>
          )
        }
      }
    ]
  }

  render() {
    const {dataSource, intl, marketId, pagination} = this.props
    const {confirmPopupOpened} = this.state

    return (
      <div>
        <Table
          className={'gx-table-responsive gx-mt-2 gx-mb-2'}
          columns={this.getColumns()}
          dataSource={dataSource}
          pagination={pagination}
          locale={getTableLocaleData(intl)}
          onChange={this.props.onChange}
          rowKey={'id'}
          size={marketId ? 'small' : 'middle'}/>
        <Modal
          visible={confirmPopupOpened}
          onOk={this.onOk}
          onCancel={this.onCancel}
          title={<FormattedMessage id={'confirm'}/>}>
          <div className={'gx-text-center'}>
            <p>{this.getConfirmMessage()}</p>
          </div>
        </Modal>
      </div>
    )
  }
}

export default injectIntl(OpenOrdersTable)
