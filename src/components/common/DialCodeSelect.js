import React from 'react'
import { Select } from 'antd'
import countries from '../../util/countryData'

const Option = Select.Option

class DialCodeSelect extends React.Component {
  render() {
    return (
      <Select
        style={{width: '85px'}}
        value={this.props.value}
        dropdownMatchSelectWidth={false}
        optionLabelProp="title"
        showSearch
        optionFilterProp="key"
        filterOption={(input, option) => option.key.toLowerCase().indexOf(input.toLowerCase()) > -1}
        onChange={(value, option) => this.props.onChange(option.props.title)}
      >
        {countries.map(country =>
          <Option
            title={country.dialCode}
            key={`${country.dialCode} ${country.name}`}
            value={country.code}
            style={{maxWidth: '260px'}}
          >
            {country.name}
            <span className="gx-float-right">{country.dialCode}</span>
          </Option>
        )}
      </Select>
    )
  }
}

export default DialCodeSelect
