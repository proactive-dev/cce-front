import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { getAuthStatus, getProfile } from '../../appRedux/actions/User'
import { Card, Col, Row, Spin, Tabs } from 'antd'
import _ from 'lodash'
import { getAccounts } from '../../appRedux/actions/Accounts'
import UserProfileCard from '../../components/UserProfileCard'
import AccountsOverview from '../../components/AccountsOverview'
import ApiTokenCard from '../../components/ApiTokenCard'
import LoginHistoryTable from '../../components/LoginHistoryTable'
import UserSecurityCard from '../../components/UserSecurityCard'
import { ADDR_MANAGEMENT, CHANGE_PWD, G_AUTH_DISABLE, G_AUTH_ENABLE, VERIFICATION } from '../../constants/Paths'

const TabPane = Tabs.TabPane

class UserCenter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      profile: {},
      accounts: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, profile, accounts} = nextProps
    if (loader !== prevState.loader || profile !== prevState.profile || accounts !== prevState.accounts) {
      return {loader, profile, accounts}
    }
    return null
  }

  componentDidMount() {
    this.props.getAuthStatus()
    this.props.getProfile()
    this.props.getAccounts()
  }

  activate = () => {

  }

  updateFeeConfiguration = () => {

  }

  render() {
    const {intl} = this.props
    const {loader, profile, accounts} = this.state
    const {verificationStatus, tfaStatus, logins} = profile || {}

    return (
      <Spin spinning={loader} size="large">
        <UserProfileCard
          data={profile}
          onActivate={this.activate}
          onChangeFeeConfig={this.updateFeeConfiguration}/>
        <Tabs size='large'>
          <TabPane
            className="gx-p-1"
            key="0"
            tab={intl.formatMessage({id: 'overview'})}>
            <Row>
              <Col className="gx-mt-2 gx-mb-2"
                   xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                <AccountsOverview
                  styleName="gx-h-100"
                  accounts={accounts}/>
              </Col>
              <Col className="gx-mt-2 gx-mb-2"
                   xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                <ApiTokenCard/>
              </Col>
            </Row>
            <Card
              className="gx-card-full gx-card-widget gx-mt-2 gx-mb-2"
              bordered={false}
              title={intl.formatMessage({id: 'overview'})}>
              <LoginHistoryTable
                data={_.reverse(logins || []).slice(0, 5)}
                pagination={false}
              />
            </Card>
          </TabPane>
          <TabPane
            className="gx-p-1"
            key="1"
            tab={intl.formatMessage({id: 'security'})}>
            <Row>
              <Col className="gx-mt-2 gx-mb-2" xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                <UserSecurityCard
                  title={'google.auth'}
                  btnTitle={tfaStatus ? 'disable' : 'enable'}
                  btnType={tfaStatus ? 'default' : 'primary'}
                  path={tfaStatus ? G_AUTH_DISABLE : G_AUTH_ENABLE}
                  content={'google.auth.usage'}/>
              </Col>
              <Col className="gx-mt-2 gx-mb-2" xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                <UserSecurityCard
                  title={'address.management'}
                  btnTitle={'manage'}
                  path={ADDR_MANAGEMENT}
                  content={'address.management.description'}/>
              </Col>
            </Row>
            <Row>
              <Col className="gx-mt-2 gx-mb-2" xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                <UserSecurityCard
                  title={'login.password'}
                  btnTitle={'change'}
                  path={CHANGE_PWD}/>
              </Col>
              {
                !verificationStatus &&
                <Col className="gx-mt-2 gx-mb-2" xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                  <UserSecurityCard
                    title={'id.verification'}
                    btnTitle={'submit'}
                    path={VERIFICATION}/>
                </Col>
              }
            </Row>
          </TabPane>
        </Tabs>
      </Spin>
    )
  }
}

const mapDispatchToProps = {
  getAuthStatus, getProfile, getAccounts
}

const mapStateToProps = ({progress, user, accounts}) => {
  return {
    loader: progress.loader,
    profile: user.profile,
    accounts: accounts.accounts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserCenter))
