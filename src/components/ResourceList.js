import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Waypoint from 'react-waypoint'
import ResourceItem from './ResourceItem'
import { fetch } from '../actions'
import * as selectors from '../selectors/search'
import Columns from 'react-columns'

const mapStateToProps = state => ({
  totalRecords: selectors.getTotalRecords(state),
  isFetching: selectors.isFetching(state),
  resources: selectors.getResources(state)
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
    let queries = [{
      columns: 2,
      query: 'min-width: 500px'
    }, {
      columns: 3,
      query: 'min-width: 1000px',
    }]
    let gap = "15px"
    const { resources, isFetching, totalRecords, id, handleFetch } = this.props
    if (resources) {
      const items = resources.map((record, index) =>
        <ResourceItem key={ record.id } record={ record } index={ index } />
      )
      let body = totalRecords > 0 ? items : ''
      return (
        <div id={ id } className='resource-list'>
          { totalRecords >= 0 && totalRecords >= 2 && <div className='count'>{ totalRecords.toLocaleString('en') } Databases</div> }
          { totalRecords === 1  && <div className='count'>{ totalRecords.toLocaleString('en') } Database</div> }
          { totalRecords === 0  && <div className='count'>No Databases Found</div> }
          <div className='resource-content'>{ totalRecords > 0 && <Columns gap={gap} queries={queries}>{ body }</Columns> }</div>
{/*
          { isFetching && <div>Loading...</div> }
*/}
          { !isFetching && <Waypoint onEnter={({ currentPosition }) => {
              currentPosition === Waypoint.inside && handleFetch(this.props)
            }}
          /> }
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
