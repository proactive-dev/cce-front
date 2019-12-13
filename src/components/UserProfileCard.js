import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Avatar, Button, Card, Checkbox, Tag } from 'antd'

class ApiTokenCard extends Component {

  render() {
    const {data} = this.props
    const {email, name, isAdmin, level, activationStatus, verificationStatus, commissionStatus} = data || {}

    return (
      <Card className="gx-flex-row gx-align-items-center">
        <Avatar icon='user' alt="" size={64}/>
        <span className="h4 gx-m-4">{name || email}</span>
        {
          activationStatus ?
            <Tag color="blue"><FormattedMessage id="email.activated"/></Tag>
            :
            <Tag color="red"><FormattedMessage id="email.deactivated"/></Tag>
        }
        {
          verificationStatus ?
            <Tag color="blue"><FormattedMessage id="id.verified"/></Tag>
            :
            <Tag color="red"><FormattedMessage id="id.unverified"/></Tag>
        }
        <Tag color="orange">{level}</Tag>
        {
          isAdmin &&
          <Tag color="gold"><FormattedMessage id="administrator"/></Tag>
        }
        {
          !activationStatus &&
          <Button type='link' className="gx-m-1" onClick={this.props.onActivate}>
            <u><FormattedMessage id="email.activation"/></u>
          </Button>
        }
        <Checkbox
          className="gx-link"
          checked={commissionStatus}
          onChange={this.props.onChangeFeeConfig}>
          <FormattedMessage id="commission.config"/>
        </Checkbox>
      </Card>
    )
  }
}

export default ApiTokenCard
