import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { getCoinFixed, getFixed } from '../util/helpers'
import { Table } from 'antd'


class MainAccounts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
//    this.props.getAccounts()
//    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
//    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickTrade(symbol) {
    //this.setState({curSymbol: symbol})
  }

  handleClickDeposit(symbol) {
    //this.setState({curSymbol: symbol})
  }

  handleClickWithdraw(symbol) {
    //this.setState({curSymbol: symbol})
  }

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'coin'}),
        dataIndex: 'symbol',
        align: 'left',
        render: (value) => {
          return <div><img src={require(`assets/images/coins/${value.toLowerCase()}.png`)}
                           alt={value} title={value} style={{maxWidth: 16}}/>
            <span className="gx-fs-lg gx-p-2">{value.toUpperCase()}</span>
          </div>
        }
      },
      {
        title: intl.formatMessage({id: 'name'}),
        dataIndex: 'name',
        align: 'center',
        render: (value, record) => {
          return <div className={'fullName'}>
            <a target="_blank"
               rel="noopener noreferrer"
               title={`${value} Info`}
               href={record.infoUrl}
            >{value}</a></div>
        }
      },
      {
        title: intl.formatMessage({id: 'balance.total'}),
        dataIndex: 'totalBalance',
        align: 'center',
        render: (value, record) => {
          return <div className={'total f-right'}>{getFixed(value, record.precesion)}</div>
        }
      },
      {
        title: intl.formatMessage({id: 'balance.available'}),
        dataIndex: 'availableBalance',
        align: 'center',
        render: (value, record) => {
          return <div className={'useable f-right'}>{getFixed(value, record.precesion)}</div>
        }
      },
      {
        title: intl.formatMessage({id: 'locked'}),
        dataIndex: 'locked',
        align: 'center',
        render: (value, record) => {
          return <div className={'locked f-right'}>{getFixed(value, record.precesion)}</div>
        }
      },
      {
        title: intl.formatMessage({id: 'btc.value'}),
        dataIndex: 'btcVal',
        align: 'center',
        render: (value) => {
          return <div className={'equalValue f-right'}>{getCoinFixed(value, 'btc')}</div>
        }
      },
      {
        title: '',
        align: 'center',
        render: (record) => {
          return <div className={'equalValue f-right'}>
            <Link
              onClick={() => this.handleClickDeposit(record.symbol)}>{intl.formatMessage({id: 'deposits'})}</Link>&nbsp;&nbsp;&nbsp;
            <Link
              onClick={() => this.handleClickWithdraw(record.symbol)}>{intl.formatMessage({id: 'withdraws'})}</Link>&nbsp;&nbsp;&nbsp;
            <Link onClick={() => this.handleClickTrade(record.symbol)}>{intl.formatMessage({id: 'trade'})}</Link>
          </div>
        }
      }
    ]
  }

  render() {
    const {accountData} = this.props
    return (
      <div>
        <Table className={'gx-table-responsible '}
               columns={this.getColumns()}
               dataSource={accountData}
               pagination={false}
               rowKey="at"
               size='middle'/>
      </div>
    )
  }
}

export default withRouter(injectIntl(MainAccounts))
