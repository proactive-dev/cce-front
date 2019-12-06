import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Card, Icon, Spin } from 'antd'
import _ from 'lodash'
import { getRefData } from '../../api/axiosAPIs'
import { gerRefLink } from '../../util/helpers'
import AffiliateTree from '../../components/AffiliateTree'
import AffiliateLink from '../../components/AffiliateLink'

class Affiliate extends Component {

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
    getRefData()
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
    const {loader} = this.props
    this.setState({loader})
  }

  render() {
    const {intl} = this.props
    const {loader, refId, totalCount, treeData} = this.state
    const refLink = gerRefLink(refId)

    return (
      <Spin spinning={loader} size="large">
        <h2 className="title gx-mb-4"><FormattedMessage id="affiliate"/></h2>
        {
          !_.isEmpty(refId) && <AffiliateLink link={refLink}/>
        }
        <Card className="gx-card">
          <span className="gx-mb-4 gx-flex-row">
            <Icon type="user" className="gx-fs-xxl gx-ml-4 gx-mr-4"/>
            <h2>{intl.formatMessage({id: 'affiliate.direct.downline.users'}, {count: totalCount})}</h2>
          </span>
          <AffiliateTree
            treeData={treeData}
          />
        </Card>
      </Spin>
    )
  }
}

const mapStateToProps = ({progress}) => {
  const {loader} = progress
  return {loader}
}

export default connect(mapStateToProps, null)(injectIntl(Affiliate))
