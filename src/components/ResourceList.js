import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Waypoint from 'react-waypoint'
import ResourceItem from './ResouceItem'
import { fetch } from '../actions'
import { getSearchTotalRecords, isSearchFetching, getSearchResources } from '../selectors/search'

const mapStateToProps = state => ({
  totalRecords: getSearchTotalRecords(state),
  isFetching: isSearchFetching(state),
  resources: getSearchResources(state)
})

const mapDispatchToProps = (dispatch) => ({
  handleFetch: (props) => {
    const { resources, totalRecords } = props
    if (resources.length < totalRecords) {
      dispatch(fetch())
    }    
  }
})

class ResourceList extends Component {

  fetchResources = () => {
    this.props.handleFetch(this.props)
  }

  render() {
    const { resources, isFetching } = this.props
    if (resources) {
      const items = this.props.resources.map((record, index) => 
        <ResourceItem key={ record.id } record={ record } index={ index } />
      )
      let body = this.props.totalRecords > 0 ? items : ''
      return (
        <div id={ this.props.id } className='resoruce-list'>
          { this.props.totalRecords >= 0 && <div className='count'>{ this.props.totalRecords.toLocaleString('en') } Results</div> }
          <div className='resource-content'>{ body }</div>
          { isFetching && <div>Loading...</div> }
          <Waypoint onEnter={ this.fetchResources } />          
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

ResourceList.defaultProps = {
  totalRecords: -1,
  isFetching: false
}

ResourceList.propTypes = {
  resources: PropTypes.array,
  totalRecords: PropTypes.number,
  isFetching: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList)
