import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResourceItem from './ResouceItem'

const mapStateToProps = ( { search }) => {
  if (search) {
    const { data, isFetching } = search
    if (data.totalRecords) {
      return {
        ...data,
        isFetching,
      }
    } else {
      return { isFetching: false }
    }
  } else {
    return { isFetching: false }
  }
}

class ResourceList extends Component {
  render() {
    const { resources, isFetching } = this.props
    if (isFetching) {
      return (<div>Loading...</div>)
    } else if (resources) {
      const items = this.props.resources.map((record, index) => 
        <ResourceItem key={ record.id } record={ record } index={ index } />
      )
      let body = this.props.totalRecords > 0 ? items : ''
      return (
        <div id={ this.props.id } className='resoruce-list'>
          { this.props.totalRecords >= 0 && <div className='count'>{ this.props.totalRecords.toLocaleString('en') } Results</div> }
          <div className='resource-content'>{ body }</div>
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

export default connect(mapStateToProps)(ResourceList)
