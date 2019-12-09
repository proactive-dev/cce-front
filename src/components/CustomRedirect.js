import React, { Component } from 'react'

class CustomRedirect extends Component {

  UNSAFE_componentWillMount() {
    window.location = this.props.link || '/'
  }

  render() {
    return null
  }
}

export default CustomRedirect
