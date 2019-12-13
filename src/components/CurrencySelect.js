import React from 'react'
import { Select } from 'antd'
import { CURRENCIES } from '../constants/Currencies'

const {Option} = Select

class CurrencySelect extends React.Component {
  render() {
    const {value} = this.props
    return (
      <Select
        showSearch
        style={{width: '100%'}}
        defaultValue={value}
        onChange={this.props.onChange}
      >
        {
          CURRENCIES.map((currency) => {
              if (currency.visible)
                return (
                  <Option value={currency.symbol} key={currency.symbol}>
                    {/*<img src={require(`assets/images/coins/${currency.symbol.toLowerCase()}.png`)}*/}
                    {/*     style={{maxWidth: 16}} alt={currency.symbol}/>*/}
                    &nbsp;<strong>{currency.symbol.toUpperCase()}</strong>&nbsp;-&nbsp;{currency.name}
                  </Option>
                )
            }
          )}
      </Select>
    )
  }
}

export default CurrencySelect
