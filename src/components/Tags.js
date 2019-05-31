import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'



const Tags = ({ record, index, history }) => (
  <div className='item'>
      <span className='itemMoreInfo'><Link to={{pathname: "/databases/database/" + record.altId}} >More Info</Link></span>

      <p></p>
  </div>
)

ResourceItem.propTypes = {
  record: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export default withRouter(Tags)
