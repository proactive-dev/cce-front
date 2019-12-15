import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Col, Icon, Row, Spin, Table, Typography } from 'antd'
import { getAuthStatus } from '../../appRedux/actions/User'
import { getTableLocaleData } from '../../util/helpers'
import _ from 'lodash'
import { deleteApiToken, getApiTokens } from '../../api/axiosAPIs'
import { API_TOKEN_EDIT, API_TOKEN_NEW } from '../../constants/Paths'
import { IconNotification } from '../../components/IconNotification'
import { SUCCESS } from '../../constants/AppConfigs'

const {Text} = Typography

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

  buildData() {
    let that = this

    this.setState({loading: true})
    getApiTokens()
      .then(response => {
        that.setState({tokens: response.data, loading: false})
      })
      .catch(error => {
        console.log(error)
        that.setState({tokens: [], loading: false})
      })
  }

  handleEdit = (token) => {
    const {id, label, access_key, trusted_ip_list} = token
    const ipString = trusted_ip_list ? trusted_ip_list.join(', ') : ''
    this.props.history.push(`/${API_TOKEN_EDIT}?id=${id}&label=${label}&access_key=${access_key}&trusted_ip_list=${ipString}`)
  }

  handleDelete = (token) => {
    let that = this
    const {intl} = this.props
    deleteApiToken(token.id)
      .then(response => {
        that.buildData()
        IconNotification(SUCCESS, intl.formatMessage({id: 'delete.token.success'}))
      })
  }

  handleCreate = (token) => {
    this.props.history.push(`/${API_TOKEN_NEW}`)
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.buildData()
  }

  getColumns() {
    const {intl} = this.props
    return [
      {
        title: intl.formatMessage({id: 'label'}),
        dataIndex: 'label',
        align: 'left',
        render: (value) => {
          return (
            <Text>{value}</Text>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'access.key'}),
        dataIndex: 'access_key',
        align: 'center',
        render: (value) => {
          return (
            <Text>{value}</Text>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'date'}),
        dataIndex: 'date',
        align: 'center',
        render: (value) => {
          return (
            <Text>{value}</Text>
          )
        }
      },
      {
        title: intl.formatMessage({id: 'operation'}),
        //dataIndex: 'date',
        align: 'center',
        render: (value, record) => {
          return (
            <Row type={'flex'} justify={'center'}>
              <Col><Button type='link' size='large' className='gx-mt-0 gx-mb-0 gx-mr-3'
                           onClick={() => this.handleEdit(record)}><Icon type="edit"/></Button>
                <Button type='link' size='large' className='gx-mt-0 gx-mb-0 gx-ml-3'
                        onClick={() => this.handleDelete(record)}><Icon type="delete"/></Button>
              </Col>
            </Row>
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
          access_key: token.access_key,
          trusted_ip_list: token.trusted_ip_list,
          date: date
        })
      })
    }

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="api.tokens"/></h1>
        <Spin spinning={loader} size="large">
          {/* Components */}
        </Spin>
        <Button type='primary' onClick={this.handleCreate}><FormattedMessage id="api.tokens.create"/></Button>
        <Table className={'gx-table-responsive'}
               columns={this.getColumns()}
               dataSource={data}
               locale={getTableLocaleData}
               size='large'
        />
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
