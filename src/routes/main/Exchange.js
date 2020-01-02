import React from 'react'
import ExchangeDesktop from '../../components/market/ExchangeDesktop'
import ExchangeMobile from '../../components/market/ExchangeMobile'
import { isMobile } from 'react-device-detect'
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
    if (isMobile) {
      return (
        <ExchangeMobile marketId={this.state.marketId} onSelectMarket={this.onSelectMarket}/>
      )
    } else {
      return (
        <ExchangeDesktop marketId={this.state.marketId} onSelectMarket={this.onSelectMarket}/>
      )
    }
  }
}

export default Exchange
