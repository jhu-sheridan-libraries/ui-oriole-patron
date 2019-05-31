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

function returnAccessRestrictions(accessRestrictionsArray) {
  let htmlAccessRestrictions = ""
  if (accessRestrictionsArray.length > 0) {
    let accessRestrictionsList = []
    for (var i = 0; i < accessRestrictionsArray.length; i++) {
      accessRestrictionsList.push(accessRestrictionsArray[i].content)
    }
    accessRestrictionsList = accessRestrictionsList.join("<br />")
    htmlAccessRestrictions = `<b>Note:</b> ` + accessRestrictionsList + `<br />`
    return {__html: htmlAccessRestrictions}
  }
  return null
}

const ResourceItem = ({ record, index, history }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ "https://databases.library.jhu.edu/databases/proxy/" + record.altId } target='_new'>{ record.title }</a></span><br />
      <span className='itemDescription'>{ returnTrimmedDescription(record.description) }...</span><br />
      <span className='itemAccessRestrictions' dangerouslySetInnerHTML={returnAccessRestrictions(record.accessRestrictions)} />
      <span className='itemMoreInfo'><Link to={{pathname: "/databases/database/" + record.altId}} >More Info</Link></span>

      <p></p>
  </div>
)

ResourceItem.propTypes = {
  record: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export default withRouter(ResourceItem)
