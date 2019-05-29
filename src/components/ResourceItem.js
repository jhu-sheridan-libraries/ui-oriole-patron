import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

function returnTrimmedDescription(description) {
  let trimmedDescription = description.substr(0, 250)
  if (trimmedDescription.length === 250) {
    trimmedDescription = trimmedDescription.substr(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" ")))
  }
  return trimmedDescription
}

function returnAccessRestrictions(accessRestrictions) {
  let thisAccessRestrictions = ""
  if (accessRestrictions.length > 0) {
    thisAccessRestrictions = "Access Restrictions: " + accessRestrictions.join("; ")
  }
  return thisAccessRestrictions
}

const ResourceItem = ({ record, index, history }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ "https://databases.library.jhu.edu/databases/proxy/" + record.altId } target='_new'>{ record.title }</a><br /></span>
      <span className='itemDescription'>{ returnTrimmedDescription(record.description) }...<br /></span>
      <span className='itemAccessRestrictions'>{ returnAccessRestrictions(record.accessRestrictions) }<br /></span>
      <span className='itemMoreInfo'><Link to={{pathname: "/databases/database/" + record.altId}} >More Info</Link></span>

      <p></p>
  </div>
)

ResourceItem.propTypes = {
  record: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export default withRouter(ResourceItem)
