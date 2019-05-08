import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

function returnTrimmedDescription(description) {
  let trimmedDescription = description.substr(0, 250)
  trimmedDescription = trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" ")))
  return trimmedDescription
}

const ResourceItem = ({ record, index, history }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ "https://databases.library.jhu.edu/databases/proxy/" + record.altId } target='_new'>{ record.title }</a></span><br />
      <span className='itemDescription'>{ returnTrimmedDescription(record.description) }&nbsp;
        <Link to={{pathname: "/databases/database/" + record.altId}} >[more...]</Link>
      </span>
      <p></p>
  </div>
)

ResourceItem.propTypes = {
  record: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export default withRouter(ResourceItem)
