import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import axios from 'axios'
import _ from 'lodash'
import { hideLoader, showLoader } from '../../appRedux/actions/Progress'
import { IconNotification } from '../../components/IconNotification'
import MainApp from './MainApp'
import Error404 from '../../routes/common/Error404'
import Error500 from '../../routes/common/Error500'
import { ERROR } from '../../constants/AppConfigs'
import {
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
  HTTP_UNAUTHORIZED,
  LOGIN_FAIL,
  LOGIN_REQUIRED,
  RESET_PWD_FAIL,
  TFA_FAIL,
  TFA_REQUIRED
} from '../../constants/ResponseCode'
import { E_404, E_500, LOGIN, LOGIN_AUTH } from '../../constants/Paths'

class RootApp extends Component {

  processError = (error) => {
    const {intl} = this.props

    let msg = null
    if (error.response) {
      const {status, statusText, data} = error.response
      switch (status) {
        case HTTP_BAD_REQUEST:
        case HTTP_UNAUTHORIZED:
          if (!!data && !!data.code) {
            switch (data.code) {
              case LOGIN_REQUIRED:
                if (!this.props.pathname || !this.props.pathname.includes(LOGIN)) {
                  this.props.history.push(`/${LOGIN}`)
                } else {
                  msg = intl.formatMessage({id: 'wrong.id.or.password'})
                }
                break
              case TFA_REQUIRED:
                this.props.history.push(`/${LOGIN_AUTH}`)
                break
              case LOGIN_FAIL:
                msg = intl.formatMessage({id: 'wrong.id.or.password'})
                break
              case TFA_FAIL:
                msg = intl.formatMessage({id: 'TFA_CODE_INCORRECT'})
                break
              case RESET_PWD_FAIL:
                msg = intl.formatMessage({id: 'INVALID_PARAMS'})
                break
              default:
                msg = data.code
            }
          } else {
            msg = statusText
          }
          break
        case HTTP_NOT_FOUND:
          this.props.history.push(`/${E_404}`)
          break
        case HTTP_INTERNAL_SERVER_ERROR:
          this.props.history.push(`/${E_500}`)
          break
        default:
          msg = statusText
      }
    }
    if (!_.isEmpty(msg)) {
      IconNotification(ERROR, intl.formatMessage({id: msg}))
    }
  }

  UNSAFE_componentWillMount() {
    // Add a request interceptor
    if (axios.interceptors.request.handlers.length < 1) {
      axios.interceptors.request.use(config => {
          if (config.needLoader) {
            this.props.showLoader()
          }
          return config
        },
        error => {
          return Promise.reject(error)
        })
    }

    // Add a response interceptor
    if (axios.interceptors.response.handlers.length < 1) {
      axios.interceptors.response.use(
        response => {
          if (response.config.needLoader) {
            this.props.hideLoader()
          }
          // console.log('response:', response)
          return response
        },
        error => {
          if (!!error.config && error.config.needLoader) {
            this.props.hideLoader()
          }
          this.processError(error)
          return Promise.reject(error)
        })
    }
  }

  render() {
    const {match} = this.props

    return (
      <Switch>
        <Route exact path={`/${E_404}`} component={Error404}/>
        <Route exact path={`/${E_500}`} component={Error500}/>
        <Route path={match.url} component={MainApp}/>
      </Switch>
    )
  }
}

const mapDispatchToProps = {
  hideLoader, showLoader
}

const mapStateToProps = ({settings}) => {
  const {pathname} = settings
  return {pathname}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(RootApp)))
