import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as selectors from '../selectors/resource'
import { fetchRecord } from '../actions'


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

  componentDidMount () {
    //this.props.handleFetch(this.props) // this is what passes the altId to the fetch action
  }

  render() {
    const record = this.props.resource
    if (typeof record !== 'undefined') {
      return (
        <div className='item'>
          <span className='itemTitle'><a href={ "http://proxy.library.jhu.edu/login?url=" + record.url } target='_new'>{ record.title }</a></span><br /> 
          <span className='itemDescription'>{ record.description } </span>
          <p></p>
        </div>
        )
    } else {
      return (
        <div></div>
      )
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail)
