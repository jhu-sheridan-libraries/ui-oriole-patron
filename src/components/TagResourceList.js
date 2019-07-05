import React from 'react';
import { getTag } from '../apis/oriole';

export default class TagResourceList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      resources: [],
      tag: props.tag,
      subTags: {},
    }
  }

  isTopLevel = (tag) => {
    return !(tag.includes(' -- '))
  }

  processResources = (resources) => {
    const { tag } = this.state
    if (this.isTopLevel(tag)) {
      let subTags = {}
      resources.forEach(resource => {
        resource.tags.tagList.forEach(t => {
          if (t.startsWith(tag)) {
            let subTag = t.split(' -- ')[1]
            if (!(subTag in subTags)) {
              subTags[subTag] = []
            }
            subTags[subTag].push(resource)
          }
        })
      })
      subTags = Object.keys(subTags).sort().reduce((r, k) => (r[k] = subTags[k], r), {})
      this.setState({ subTags })
    }
    this.setState({ resources })
  }

  componentDidMount() {
    getTag(this.state.tag).then(resources => this.processResources(resources))
  }

  renderSubTag = (subTag, resources) => {
    resources.sort((a, b) => a.title > b.title ? 1 : -1)
    return (
      <div>
        <h4><div key={subTag}>
          { subTag }
        </div></h4>
        { this.renderResources(resources) }
      </div>
    )
  }

  renderResources = (resources) => {
    let root = this.props.root || ''
    return (
      <ul>
        { resources.map(record => {
          return ( <li key={record.altId}>
            <a href={`${root}/databases/proxy/${record.altId}`} target='_blank'>
              { record.title }
            </a>
          </li> )
        }) }
      </ul>
    )
  }

  render() {
    let { tag, resources, subTags } = this.state
    if (typeof tag === 'undefined') {
      return <div></div>
    } else if (Object.keys(subTags).length === 0) {
      return this.renderResources(resources)
    } else {
      const blocks = Object.keys(subTags).map((key) => this.renderSubTag(key, subTags[key]))
      return (
        <div>
          <div id="tagDetailTitle"><h1>{this.state.tag}</h1></div>
          { blocks }
        </div>
      )
    }
  }
}
