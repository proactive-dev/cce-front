import React from 'react'
import {Select} from 'antd'
import countries from '../util/countryData'

const Option = Select.Option

class CountrySelect extends React.Component {
  onChange = (e) => {
    this.props.onChange(e)
  }

  render() {
    return (
      <Select
        showSearch
        style={{width: '100%'}}
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        value={this.props.value}
        onChange={this.onChange}
      >
        {countries.map(country =>
          <Option key={country.code} value={country.code}>
            {country.name}
          </Option>
        )}
      </Select>
    )
  }
}

export default CountrySelect
