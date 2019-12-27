import React from 'react'
import { injectIntl } from 'react-intl'
import { Input, Tree } from 'antd'
import _ from 'lodash'

const TreeNode = Tree.TreeNode
const Search = Input.Search

const KEY = 'email'
const KEY_TITLE = 'title'
const KEY_CHILDREN = 'children'

const dataList = []
const generateList = (tree) => {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    const data = {}
    data[KEY] = node[KEY]
    data[KEY_TITLE] = node[KEY_TITLE]
    dataList.push(data)
    if (node[KEY_CHILDREN]) {
      generateList(node[KEY_CHILDREN])
    }
  }
}

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node[KEY_CHILDREN]) {
      if (node[KEY_CHILDREN].some(item => item[KEY] === key)) {
        parentKey = node[KEY]
      } else {
        let pKey = getParentKey(key, node[KEY_CHILDREN])
        if (pKey) {
          parentKey = pKey
        }
      }
    }
  }
  return parentKey
}

class ReferralTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchKey: '',
      expandedKeys: [],
      autoExpandParent: true,
      hasDataList: false
    }
    this.expendedKeyList = []
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  onSearch = (value) => {
    const expandedKeys = dataList.map((item) => {
      if (item[KEY_TITLE].indexOf(value) > -1) {
        return getParentKey(item[KEY], this.props.treeData)
      }
      return null
    }).filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      searchKey: value,
      expandedKeys,
      autoExpandParent: true
    })
  }

  renderTreeNodes = (data) => {
    const {searchKey} = this.state
    return data.map((item) => {
      const itemTitle = item[KEY_TITLE]
      const index = itemTitle.indexOf(searchKey)
      const beforeStr = itemTitle.substr(0, index)
      const afterStr = itemTitle.substr(index + searchKey.length)
      const titleComponent = index > -1 ? (
        <span>
          {beforeStr}
          <span className="gx-text-red">{searchKey}</span>
          {afterStr}
        </span>
      ) : (
        <span>{itemTitle}</span>
      )
      if (item[KEY_CHILDREN]) {
        return (
          <TreeNode title={titleComponent} key={item[KEY]} dataRef={item}>
            {this.renderTreeNodes(item[KEY_CHILDREN])}
          </TreeNode>
        )
      }
      return <TreeNode title={titleComponent} key={item[KEY]}/>
    })
  }

  generateKeyList = (tree) => {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      this.expendedKeyList.push(node[KEY])
      if (node[KEY_CHILDREN]) {
        this.generateKeyList(node[KEY_CHILDREN])
      }
    }
  }

  render() {
    const {intl, treeData} = this.props
    const {expandedKeys, autoExpandParent} = this.state
    let keyList = []
    if (_.isEmpty(dataList) && !_.isEmpty(treeData)) {
      generateList(treeData)
    }

    if (_.isEmpty(this.expendedKeyList) && !_.isEmpty(treeData)) {
      this.generateKeyList(treeData)
    }

    if (_.isEmpty(expandedKeys) && !_.isEmpty(this.expendedKeyList)) {
      keyList = this.expendedKeyList
    } else if (!_.isEmpty(expandedKeys)) {
      keyList = expandedKeys
    }

    return (
      <div>
        <Search
          className="gx-mb-3 gx-mw-400"
          addonBefore={intl.formatMessage({id: 'search.id'})}
          placeholder={intl.formatMessage({id: 'search.inputKey'})}
          onSearch={this.onSearch}
          enterButton/>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={keyList}
          autoExpandParent={autoExpandParent}>
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    )
  }
}

export default injectIntl(ReferralTree)
