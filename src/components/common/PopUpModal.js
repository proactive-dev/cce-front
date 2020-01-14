import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'antd'

class PopUpModal extends React.Component {

  onCancel = () => {
    this.props.onClose()
  }

  onOk = () => {
    this.props.onOK()
  }

  render() {
    const {isModalOpened, data} = this.props

    return (
      <Modal
        style={{
          fontSize: 16
        }}
        visible={isModalOpened}
        onCancel={this.onCancel}
        onOk={this.onOk}
        title={<FormattedMessage id={data.title}/>}
      >
        <div style={{maxHeight: 300, margin: 'auto'}}>
          <p>{<FormattedMessage id={data.desc}/>}</p>
        </div>
      </Modal>
    )
  }
}

export default PopUpModal
