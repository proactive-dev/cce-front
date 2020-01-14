import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Icon } from 'antd'
import TfaModal from '../user/TfaModal'
import { ADMIN } from '../../constants/Paths'
import { postTfa } from '../../api/axiosAPIs'

class AdminMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpened: false
    }
  }

  authenticate = (data) => {
    let formData = new FormData()
    formData.append('two_factor[type]', 'app')
    formData.append('two_factor[otp]', data.authCode)

    postTfa(formData)
      .then(response => {
        this.props.history.push(`/${ADMIN}`)
        this.setState({isModalOpened: false})
      })
  }

  showAuthModal = () => {
    this.setState({isModalOpened: true})
  }

  onCloseModal = () => {
    this.setState({isModalOpened: false})
  }

  render() {
    return (
      <div>
        <Link to="#" onClick={this.showAuthModal}>
          {!this.props.noIcon && <Icon className={'gx-mr-2'} type="dashboard"/>}
          <FormattedMessage id="admin.page"/>
        </Link>
        <TfaModal
          isOpened={this.state.isModalOpened}
          onOk={this.authenticate}
          onClose={this.onCloseModal}/>
      </div>
    )
  }
}

export default withRouter(injectIntl(AdminMenu))
