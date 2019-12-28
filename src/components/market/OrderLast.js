import React from 'react'
import { Icon } from 'antd'

const OrderLast = (props) => {
  const {value, trend} = props

  let className = 'gx-text-black'
  if (trend > 0) {
    className = 'gx-text-green'
  } else if (trend < 0) {
    className = 'gx-text-red'
  }

  return (
    <div className={`gx-text-center h3 gx-m-1 ${className}`}>
      {value}
      {trend > 0 && (
        <Icon type="arrow-up"/>
      )}
      {trend < 0 && (
        <Icon type="arrow-down"/>
      )}
    </div>
  )
}

export default OrderLast
