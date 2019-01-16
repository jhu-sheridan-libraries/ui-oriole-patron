import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ResourceItem from './ResourceItem'
import Columns from 'react-columns'

const mapStateToProps = ( { search }) => {
  if (search) {
    const { data, meta } = search
    if (data.totalRecords) {
      return {
        ...data,
        isFetching: meta.isFetching,
      }
    } else {
      return { isFetching: meta.isFetching }
    }
  }
}

class ResourceList extends Component {
  render() {
    let queries = [{
      columns: 2,
      query: 'min-width: 500px'
    }, {
      columns: 3,
      query: 'min-width: 1000px'
    }]
    const { resources, isFetching } = this.props
    if (isFetching) {
      return (<div>Loading...</div>)
    } else if (resources) {
      const items = this.props.resources.map((record, index) =>
        <ResourceItem key={ record.id } record={ record } index={ index } />
      )
      let body = this.props.totalRecords > 0 ? items : ''
      return (
        <div id={ this.props.id } className='resource-list'>
          { this.props.totalRecords >= 0 && <div className='count'>{ this.props.totalRecords.toLocaleString('en') } Results</div> }

              <div className='resource-content'><Columns queries={queries}>{ body }</Columns></div>

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
