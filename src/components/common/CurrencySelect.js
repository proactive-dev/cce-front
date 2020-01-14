import React from 'react'
import { Select } from 'antd'
import { CURRENCIES } from '../../constants/Currencies'

const {Option} = Select

class CurrencySelect extends React.Component {
  render() {
    const {value} = this.props
    return (
      <Select
        showSearch
        className={'gx-w-100'}
        value={value}
        onChange={this.props.onChange}>
        {
          CURRENCIES.map((currency) => {
            return currency.visible ?
              <Option value={currency.symbol} key={currency.symbol}>
                <img src={require(`assets/images/coins/${currency.symbol.toLowerCase()}.png`)}
                     style={{maxWidth: 16}} alt={currency.symbol}/>
                &nbsp;<strong>{currency.symbol.toUpperCase()}</strong>&nbsp;-&nbsp;{currency.name}
              </Option>
              : null
          })
        }
      </Select>
    )
  }
}

export default CurrencySelect
