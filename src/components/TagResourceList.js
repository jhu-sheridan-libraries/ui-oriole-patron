import React from 'react';
import { getTag } from '../apis/oriole';

class TagResourceList extends React.Component {

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

  getSubTag = (tag) => {
    let tokens = tag.split(' -- ')
    if (tokens.length > 1) {
      return tokens[1];
    } else {
      return undefined
    }
  }

  processResources = (resources) => {
    if (this.isTopLevel(this.state.tag)) {
      let subTags = {}
      resources.forEach(resource => {
        resource.tags.tagList.forEach(tag => {
          if (tag.startsWith(this.state.tag)) {
            let subTag = this.getSubTag(tag)
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
        <h4>{ subTag }</h4>
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
            <span>
              <a href={`${root}/databases/proxy/${record.altId}`} target='_blank' rel='noopener noreferrer'>
                { record.title }
              </a>
            </span>&nbsp;&nbsp;
            <span className='itemMoreInfo'>
              <small>
                <a href={`${root}/databases/database/${record.altId}`}>
                  [ More Info <img src={`${root}/icon-arrow-circle-green.svg`} alt=""/> ]
                </a>
              </small>
            </span>
          </li> )
        }) }
      </ul>
    )
  }

  render() {
    let { tag, resources, subTags } = this.state
    if (typeof tag === 'undefined') {
      return ''
    } else if (Object.keys(subTags).length === 0) {
      const subTag = this.getSubTag(tag)
      return this.renderSubTag(subTag, resources)
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

export default TagResourceList