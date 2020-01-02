import React from 'react'
import { Radio } from 'antd'
import { isMobile } from 'react-device-detect'

const INTERVALS = isMobile ? [
  {title: '1m', value: 1},
  {title: '5m', value: 5},
  {title: '30m', value: 30},
  {title: '1h', value: 60},
  {title: '2h', value: 120},
  {title: '6h', value: 360},
  {title: '12h', value: 720},
  {title: '1d', value: 1440},
  {title: '1w', value: 10080}
] : [
  {title: '1m', value: 1},
  {title: '5m', value: 5},
  {title: '15m', value: 15},
  {title: '30m', value: 30},
  {title: '1h', value: 60},
  {title: '2h', value: 120},
  {title: '4h', value: 240},
  {title: '6h', value: 360},
  {title: '12h', value: 720},
  {title: '1d', value: 1440},
  {title: '1w', value: 10080}
]

class TradeRangeSwitch extends React.Component {
  state = {
    unit: 60
  }

  onChangeUnit = e => {
    let unit = e.target.value
    this.setState({unit})
    this.props.setRange(unit)
  }

  render() {
    const {unit} = this.state

    return (
      <Radio.Group size='small' value={unit} onChange={this.onChangeUnit}>
        {
          INTERVALS.map(interval => {
            return (
              <Radio.Button key={interval['value']} value={interval['value']}>
                {interval['title']}
              </Radio.Button>
            )
          })
        }
      </Radio.Group>
    )
  }
}

export default TradeRangeSwitch
