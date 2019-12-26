import React from 'react'
import { injectIntl } from 'react-intl'
import { Icon, Typography } from 'antd'

const {Text, Title} = Typography
const OrderLast = (props) => {
  const {value, trend} = props

  let className = 'gx-text-black'
  if (trend > 0) {
    className = 'gx-text-green'
  } else if (trend < 0) {
    className = 'gx-text-red'
  }

  return (
    <div className={' gx-text-center gx-mt-1 gx-mb-1'}>
      <Text strong className={className + ' gx-fs-lg'}>{value}
        {trend > 0 && (
          <Icon type="arrow-up"/>
        )}
        {trend < 0 && (
          <Icon type="arrow-down"/>
        )}
      </Text>
    </div>
  )
}

export default injectIntl(OrderLast)
