import React from 'react'
import { injectIntl } from 'react-intl'
import { Popover } from 'antd'
import { MARKETS } from '../../constants/Markets'

class MarketSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      popoverVisible: false,
      market: props.value
    }
  }

  menus = () => (
    <ul className="gx-popover-scroll" style={{overflowY: 'scroll'}}>
      {MARKETS.map(market => {
          return market.visible ?
            <li className="gx-media gx-pointer gx-p-2" key={market.id}
                onClick={e => this.onMenuChange(market)}>
              {market.name}
            </li>
            : null
        }
      )}
    </ul>
  )

  onMenuChange = (market) => {
    this.setState({popoverVisible: false, market})
    this.props.onChange(market.id)
  }

  handleVisibleChange = (visible) => {
    this.setState({popoverVisible: visible})
  }

  render() {
    const {popoverVisible, market} = this.state
    return (
      <Popover
        overlayClassName="gx-popover-horizontal"
        placement="bottomRight"
        content={this.menus()}
        visible={popoverVisible}
        onVisibleChange={this.handleVisibleChange}
        trigger="click">
        <span className="gx-pointer gx-flex-row gx-align-items-center gx-fs-xl gx-font-weight-semi-bold">
          {market.name}
          <i className="icon icon-chevron-down gx-pl-2"/>
        </span>
      </Popover>
    )
  }
}

export default injectIntl(MarketSelector)
