import React from 'react'
import { injectIntl } from 'react-intl'
import { CURRENCIES } from '../constants/Currencies'
import { Select } from 'antd'

const Option = Select.Option

class CurrencySelect extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {intl, value} = this.props
    return (
      <div>
        <Select
          showSearch
          style={{width: '100%'}}
          defaultValue={value}
          onChange={this.props.onChange}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
          // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            CURRENCIES.map((coin) => {
                if (coin.visible)
                  return <Option value={coin.symbol} key={coin.symbol}>
                    {/*<img src={require(`assets/images/coins/${coin.symbol.toLowerCase()}.png`)}*/}
                    {/*     style={{maxWidth: 16}} alt={coin.code}/>*/}
                    &nbsp;<strong>{coin.symbol.toUpperCase()}</strong>&nbsp;-&nbsp;{coin.name}
                  </Option>
              }
            )}
        </Select>
      </div>
    )
  }
}

export default injectIntl(CurrencySelect)
