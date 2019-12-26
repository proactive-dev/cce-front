import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Card, Icon, Spin } from 'antd'
import _ from 'lodash'
import { getRefData } from '../../api/axiosAPIs'
import { gerRefLink } from '../../util/helpers'
import ReferralTree from '../../components/ReferralTree'
import ReferralLink from '../../components/ReferralLink'

class Referral extends Component {

  state = {
    loader: false,
    refId: '',
    totalCount: 0,
    treeData: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {loader} = nextProps
    if (loader !== prevState.loader) {
      return {loader}
    }
    return null
  }

  loadRefData = () => {
    getRefData(null, true)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          const {referral_id, map, count} = response.data
          this.setState({
            refId: referral_id,
            totalCount: count,
            treeData: map
          })
        }
      })
  }

  componentDidMount() {
    this.loadRefData()
  }

  render() {
    const {intl} = this.props
    const {loader, refId, totalCount, treeData} = this.state
    const refLink = gerRefLink(refId)

    return (
      <div>
        <h1 className="gx-mt-4 gx-mb-4"><FormattedMessage id="referral"/></h1>
        <Spin spinning={loader} size="large">
          {
            !_.isEmpty(refId) && <ReferralLink link={refLink}/>
          }
          <Card className="gx-card">
            <span className="gx-mb-2 gx-flex-row">
              <Icon type="user" className="gx-fs-xl gx-ml-2 gx-mr-2"/>
              <h3>{intl.formatMessage({id: 'affiliate.direct.downline.users'}, {count: totalCount})}</h3>
            </span>
            <ReferralTree treeData={treeData}/>
          </Card>
        </Spin>
      </div>
    )
  }
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, null)(injectIntl(Referral))
