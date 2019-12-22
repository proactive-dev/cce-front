import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Card, Spin, Tabs } from 'antd'
import _ from 'lodash'
import MarketOverview from '../../components/MarketOverview'
import { MARKETS } from '../../constants/Markets'
import { isStableCoin, removeDuplicates } from '../../util/helpers'
import { STABLE_SYMBOL } from '../../constants/AppConfigs'

const {TabPane} = Tabs

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loader: false,
      tickers: {},
      filter: ''
    }

    // Get Guote Units
    let quoteUnits = MARKETS.map(market => market.quoteUnit)
    quoteUnits = removeDuplicates(quoteUnits)
    quoteUnits.unshift('')
    // Collect Stable coin markets to USD.
    quoteUnits = quoteUnits.filter(quoteUnit => !isStableCoin(quoteUnit))
    quoteUnits.push(`usd${STABLE_SYMBOL}`)
    this.quoteUnits = quoteUnits
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader, tickers} = nextProps
    if ((loader !== prevState.loader) || (!_.isEmpty(tickers) && tickers !== prevState.tickers)) {
      return {loader, tickers}
    }
    return null
  }

  onTabChange = (activeKey) => {
    this.setState({filter: activeKey})
  }

  render() {
    const {intl} = this.props
    const {loader, tickers, filter} = this.state
    let filteredMarkets = MARKETS
    if (!_.isEmpty(filter)) {
      filteredMarkets = filteredMarkets.filter(market => {
        const quoteUnit = market.quoteUnit
        if (filter.includes(STABLE_SYMBOL)) {
          return isStableCoin(quoteUnit)
        } else {
          return quoteUnit.toLowerCase().includes(filter.toLowerCase())
        }
      })
    }

    return (
      <Spin spinning={loader} size="large">
        <Card
          className="gx-card-full gx-card-widget gx-p-4 gx-pl-2 gx-pr-2"
          bordered={false}>
          <Tabs className="gx-mt-3" activeKey={filter} size={'large'} onChange={this.onTabChange}>
            {
              this.quoteUnits.map((quoteUnit) =>
                <TabPane
                  key={quoteUnit}
                  tab={`${_.isEmpty(quoteUnit) ? intl.formatMessage({id: 'all'}) : quoteUnit.toUpperCase()}${intl.formatMessage({id: 'markets'})}`}/>
              )
            }
          </Tabs>
          <MarketOverview tickers={tickers} markets={filteredMarkets}/>
        </Card>
      </Spin>
    )
  }
}

const mapStateToProps = ({progress, markets}) => {
  return {
    loader: progress.loader,
    tickers: markets.tickers
  }
}

export default connect(mapStateToProps, null)(injectIntl(Home))
