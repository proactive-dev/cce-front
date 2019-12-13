import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { Button, Card, Icon, Tabs } from 'antd'
import { BALANCES, DEPOSIT, WITHDRAWAL } from '../constants/Paths'
import { DEFAULT_PRECISION, ESTIMATE_SYMBOL } from '../constants/AppConfigs'

const TabPane = Tabs.TabPane

class AccountsOverview extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }
  }

  onVisibleBtnClick = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const {intl, styleName, accounts} = this.props
    const {visible} = this.state
    const mainEstimated = accounts.reduce((prev, account) => prev + parseFloat(account.estimated), 0.0)
    const estimateStr = visible ? (mainEstimated ? parseFloat(mainEstimated).toFixed(DEFAULT_PRECISION) : 0.00000000) : '********'

    return (
      <Card
        className={`gx-card-widget gx-card-tabs ${styleName}`}
        title={intl.formatMessage({id: 'balance'})}
        extra={
          <div>
            <Button size='small' type="primary" className="gx-m-1" href={`/${DEPOSIT}`}>
              {intl.formatMessage({id: 'deposit'})}
            </Button>
            <Button size='small' className="gx-m-1" href={`/${WITHDRAWAL}`}>
              {intl.formatMessage({id: 'withdrawal'})}
            </Button>
            <Button size='small' type="link" className="gx-m-1" href={`/${BALANCES}`}>
              <Icon type="right"/>
            </Button>
          </div>
        }>
        <Tabs>
          <TabPane className={'gx-pt-4'} key="0" tab={intl.formatMessage({id: 'accounts.main'})}>
            <span className={'gx-mt-4 gx-mb-5 gx-ml-2 gx-mr-3'}>{intl.formatMessage({id: 'estimated.value'})}</span>
            <Icon type={visible ? 'eye' : 'eye-invisible'} onClick={this.onVisibleBtnClick}/>
            <h2 className={'gx-mt-4 gx-mb-4 gx-ml-2'}>{estimateStr} {ESTIMATE_SYMBOL}</h2>
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

export default injectIntl(AccountsOverview)
