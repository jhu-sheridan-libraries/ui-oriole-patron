import React from 'react';
import { Container } from 'reactstrap'
import { getTags, getTag } from '../apis/oriole'

class TagResourceList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      resources: [],
      tag: props.match.params.tag,
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
            // only push if it's not already there.  Eliminates dupes
            if (subTags[subTag].includes(resource) === false) {
              subTags[subTag].push(resource)
            }
          }
        })
      })
      // Bump Core Databases to the top
      // First, create an array of the subTags in the desired order
      let desiredOrderArray = Object.keys(subTags).filter(key => key !== "Core Databases").sort()
      desiredOrderArray.unshift("Core Databases")
      // Order by the desired order array in the sort function in this line:
      subTags = Object.keys(subTags).sort((a,b) => { return desiredOrderArray.indexOf(a) - desiredOrderArray.indexOf(b) }).reduce((r, k) => (r[k] = subTags[k], r), {})
      this.setState({ subTags })
    }
    this.setState({ resources })
  }

  componentDidMount() {
    if (!this.state.children) {
      getTags().then(tags => {
        this.setState({ children: tags[this.state.tag] })
      })
    }
    getTag(this.state.tag).then(resources => {
      this.setState({ records: this.processResources(resources) })
    })
  }

  renderSubTag = (subTag, resources) => {
    // Must sort case insensitive here
    resources.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
    return (
      <div key={subTag}>
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
      document.title = tag
      const blocks = Object.keys(subTags).map((key) => this.renderSubTag(key, subTags[key]))
      return (
        <div>
          <Container className="main-container">
            <div id="tagDetailTitle"><h2>{this.state.tag}</h2></div>
            { blocks }
          </Container>
        </div>
      )
    }
  }
}

export default TagResourceList
