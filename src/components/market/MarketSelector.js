import React from 'react'
import { injectIntl } from 'react-intl'
import { Select } from 'antd'
import { MARKETS } from '../../constants/Markets'

const {Option} = Select

class MarketSelector extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {value} = this.props
    return (
      <Select
        showSearch
        className={'gx-w-100'}
        value={value}
        onChange={this.props.onChange}>
        {
          MARKETS.map((market) => {
            if (market.visible)
              return (
                <Option value={market.id} key={market.id}>
                  {market.name}
                </Option>
              )
          })
        }
      </Select>
    )
  }
}

export default injectIntl(MarketSelector)
