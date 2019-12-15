import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Icon, Spin, Table } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getTableLocaleData } from '../../util/helpers'
import _ from 'lodash'
import { deleteApiToken, getApiTokens } from '../../api/axiosAPIs'
import { API_TOKEN_EDIT, API_TOKEN_NEW } from '../../constants/Paths'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'

class ApiTokens extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tokens: [],
      loader: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  fetchData = () => {
    getApiTokens()
      .then(response => {
        this.setState({tokens: response.data})
      })
      .catch(error => {
        console.log(error)
        this.setState({tokens: []})
      })
  }

  onEdit = (token) => {
    const {id, label, accessKey, trustedIpList} = token
    const ipString = trustedIpList ? trustedIpList.join(', ') : ''
    this.props.history.push({
      pathname: `/${API_TOKEN_EDIT}`,
      state: {token: {id, label, accessKey, ipString}}
    })
  }

  onDelete = (token) => {
    const {intl} = this.props
    deleteApiToken(token.id)
      .then(response => {
        this.fetchData()
        IconNotification(SUCCESS, intl.formatMessage({id: 'delete.token.success'}))
      })
  }

  onCreate = () => {
    this.props.history.push(`/${API_TOKEN_NEW}`)
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.fetchData()
  }

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'label'}),
        dataIndex: 'label',
        align: 'left'
      },
      {
        title: intl.formatMessage({id: 'access.key'}),
        dataIndex: 'accessKey',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'date'}),
        dataIndex: 'date',
        align: 'center'
      },
      {
        title: intl.formatMessage({id: 'operation'}),
        dataIndex: 'id',
        align: 'center',
        render: (value, record) => {
          return (
            <div>
              <Button type='link' onClick={() => this.onEdit(record)}>
                <Icon type="edit"/>
              </Button>
              <Button type='link' onClick={() => this.onDelete(record)}>
                <Icon type="delete"/>
              </Button>
            </div>
          )
        }
      }
    ]
  }

  render() {
    const {intl} = this.props
    const {loader, tokens} = this.state

    let data = []
    if (!_.isEmpty(tokens)) {
      _.forEach(tokens, function (token) {
        const regx = /[TZ]/gi
        const date = token.created_at.replace(regx, ' ').replace('.000', '')
        data.push({
          id: token.id,
          label: (!token.label || !token.label.length) ? ' - ' : token.label,
          accessKey: token.access_key,
          trustedIpList: token.trusted_ip_list,
          date: date
        })
      })
    }

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="api.tokens"/></h1>
        <Button type='primary' onClick={this.onCreate}><FormattedMessage id="api.tokens.create"/></Button>
        <Spin spinning={loader} size="large">
          <Table
            className={'gx-table-responsive'}
            columns={this.getColumns()}
            dataSource={data}
            locale={getTableLocaleData(intl)}
            rowKey="id"
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ApiTokens))
