import React, { Component } from 'react'

class CustomRedirect extends Component {

  componentWillMount() {
    window.location = this.props.link || '/'
  }

  render() {
    return null
  }
}

export default CustomRedirect
