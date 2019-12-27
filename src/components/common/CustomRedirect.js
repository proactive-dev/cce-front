import { Component } from 'react'

class CustomRedirect extends Component {

  UNSAFE_componentWillMount() {
    window.location = this.props.path || '/'
  }

  render() {
    return null
  }
}

export default CustomRedirect
