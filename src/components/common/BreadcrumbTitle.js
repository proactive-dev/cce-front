import React from 'react'
import { Breadcrumb } from 'antd'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

const BreadcrumbTitle = ({data}) => {
  return (
    <Breadcrumb separator=">" className="title gx-mb-2 h2">
      {
        data.map(item =>
          <Breadcrumb.Item key={item.title}>
            {
              (_.isEmpty(item.link) || _.isUndefined(item.link)) ?
                <FormattedMessage id={item.title}/>
                :
                <Link to={item.link}>
                  <FormattedMessage id={item.title}/>
                </Link>
            }
          </Breadcrumb.Item>
        )
      }
    </Breadcrumb>
  )
}

export default BreadcrumbTitle
