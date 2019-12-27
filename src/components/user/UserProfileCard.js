import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Avatar, Button, Card, Checkbox, Col, Row, Tag } from 'antd'

class ApiTokenCard extends Component {

  render() {
    const {data} = this.props
    const {email, name, isAdmin, level, activationStatus, verificationStatus, commissionStatus} = data || {}

    return (
      <Card>
        <Row type="flex" className='gx-align-items-center'>
          <Col xl={2} lg={3} md={4} sm={6} xs={8}>
            <Avatar icon='user' alt="" size={64}/>
          </Col>
          <Col xl={22} lg={21} md={20} sm={18} xs={16}>
            <Row className='gx-w-100'>
              <Col span={24}>
                <span className="h4 gx-m-2">{name || email}</span>
                <Tag color={activationStatus ? 'blue' : 'red'} className="gx-m-1">
                  <FormattedMessage id={activationStatus ? 'email.activated' : 'email.deactivated'}/>
                </Tag>
                <Tag color={verificationStatus ? 'blue' : 'red'} className="gx-m-1">
                  <FormattedMessage id={activationStatus ? 'id.verified' : 'id.unverified'}/>
                </Tag>
                <Tag color="orange" className="gx-m-1">{level}</Tag>
                {
                  isAdmin &&
                  <Tag color="gold" className="gx-m-1"><FormattedMessage id="administrator"/></Tag>
                }
                {
                  !activationStatus &&
                  <Button type='link' className="gx-m-1" onClick={this.props.onActivate}>
                    <u><FormattedMessage id="email.activation"/></u>
                  </Button>
                }
              </Col>
              <Col span={24}>
                <Checkbox
                  className="gx-link gx-m-2"
                  checked={commissionStatus}
                  onChange={this.props.onChangeFeeConfig}>
                  <FormattedMessage id="commission.config"/>
                </Checkbox>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default ApiTokenCard
