import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../selectors/resource'
import { fetchRecord } from '../actions'
import { Container } from 'reactstrap'


const mapStateToProps = (state) => {
  return {
    resource: selectors.getResource(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleFetch: (props) => {
    const { resource } = props
    if (typeof resource === 'undefined') { // If resource not in Store
      dispatch(fetchRecord(props.match.params.altId))
    }
  }
})

class ResourceDetail extends Component {

  render() {
    const record = this.props.resource

    if (typeof record !== 'undefined') {

      document.title = "Johns Hopkins Libraries Databases: " + record.title

      let tagsList = []
      for (var i = 0; i < record.tags.tagList.length; i++) {
        tagsList.push(record.tags.tagList[i])
      }
      tagsList = tagsList.sort()
      tagsList = tagsList.join("; ")

      return (
        <Container className="main-container">
          <div className='item' itemscope itemtype="http://schema.org/DigitalDocument">
            <span className='itemTitle'><a href={ "http://proxy.library.jhu.edu/login?url=" + record.url } target='_new'><div itemprop="name">{ record.title }</div></a></span><p />
            <span className='itemDescription'><b>URL:</b> <div itemprop="url">{ "http://proxy.library.jhu.edu/login?url=" + record.url }</div></span><p />
            <span className='itemDescription'><b>URL:</b> <div itemprop="url">{ window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/databases/proxy/" + record.altId }</div></span><p />
            <span className='itemDescription'><b>About this Database:</b> <div itemprop="description">{ record.description }</div></span><p />
            <span className='itemDescription'><b>Creator:</b> <div itemprop="creator">{ record.creator }</div></span><p />
            <span className='itemDescription'><b>Publisher:</b> <div itemprop="publisher">{ record.publisher }</div></span><p />
            <span className='itemDescription'><b>Recommended for these subject areas:</b> <div itemprop="keywords">{ tagsList }</div></span><p />
            <p></p>
            </div>
        </Container>
        )
    } else {
      return (
        <div></div>
      )
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail)
