import React from 'react'
import { Button, Card, Col, Row } from 'antd'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

const UserSecurityCard = ({title, content = null, btnTitle, btnType = 'primary', path}) => {
  return (
    <Card className='gx-h-100'>
      <Row type="flex" className='gx-align-items-center'>
        <Col xl={18} lg={16} md={16} sm={12} xs={24}>
          <p className='gx-fs-lg'>
            <FormattedMessage id={title}/>
          </p>
          {
            !_.isEmpty(content) && <FormattedMessage id={content}/>
          }
        </Col>
        <Col xl={6} lg={8} md={8} sm={12} xs={24} className="gx-text-right">
          <Button
            type={btnType}
            className="gx-w-100 gx-mt-3"
            href={`/${path}`}>
            <FormattedMessage id={btnTitle}/>
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default UserSecurityCard
