import React from 'react'
import { isMobile } from 'react-device-detect'
import ExchangeDesktop from '../../components/market/ExchangeDesktop'
import ExchangeMobile from '../../components/market/ExchangeMobile'
import { EXCHANGE } from '../../constants/Paths'

class Exchange extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      marketId: null
    }
  }

  UNSAFE_componentWillMount() {
    let marketId = this.props.match.params.market
    this.setState({marketId: marketId})
  }

  onSelectMarket = (market) => {
    this.props.history.push(`/${EXCHANGE}/${market}`)
  }

  render() {
    return isMobile ?
      <ExchangeMobile
        marketId={this.state.marketId}
        onSelectMarket={this.onSelectMarket}
      />
      :
      <ExchangeDesktop
        marketId={this.state.marketId}
        onSelectMarket={this.onSelectMarket}
      />
  }
}

export default Exchange
