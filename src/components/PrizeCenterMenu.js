import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import { goPrizeCenter } from '../api/axiosAPIs'
import { PRIZE_CENTER_LINK } from '../constants/AppConfigs'
import { connect } from 'react-redux'

class PrizeCenterMenu extends Component {

  onClick = () => {
    const {profile} = this.props
    let formData = new FormData()
    formData.append('user', profile.id)

    goPrizeCenter(formData)
      .then(response => {
        window.location = PRIZE_CENTER_LINK
      })
      .catch(error => {
        window.location = PRIZE_CENTER_LINK
      })
  }

  render() {
    return (
      <Link to="#" onClick={this.onClick}>
        <FormattedMessage id="prize.center"/>
      </Link>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    profile: user.profile
  }
}

export default connect(mapStateToProps, null)(withRouter(injectIntl(PrizeCenterMenu)))
