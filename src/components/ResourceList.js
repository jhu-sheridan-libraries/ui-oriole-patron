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
    if (resources.length < totalRecords) { // fetch when there're more records
      dispatch(fetch())
    }    
  }
})

class ResourceList extends Component {
  render() {
    const { resources, isFetching, totalRecords, id, handleFetch } = this.props
    if (resources) {
      const items = resources.map((record, index) => 
        <ResourceItem key={ record.id } record={ record } index={ index } />
      )
      let body = totalRecords > 0 ? items : ''
      return (
        <div id={ id } className='resoruce-list'>
          { totalRecords >= 0 && <div className='count'>{ totalRecords.toLocaleString('en') } Results</div> }
          <div className='resource-content'>{ body }</div>
          { isFetching && <div>Loading...</div> }
          <Waypoint onEnter={ handleFetch(this.props) } />          
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

ResourceList.defaultProps = {
  totalRecords: -1,
  isFetching: false,
  resources: []
}

ResourceList.propTypes = {
  resources: PropTypes.array,
  totalRecords: PropTypes.number,
  isFetching: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList)
