import React from 'react'
import { withRouter } from 'react-router'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const ResourceItem = ({ record, index, history }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ "https://databases.library.jhu.edu/databases/proxy/" + record.altId } target='_new'>{ record.title }</a></span><br />
      <span className='itemDescription'>{ record.description } 
        {/* <Link to={{pathname: "/databases/database/" + record.altId}} >[more...]</Link> */}
        <Button onClick={() => history.push(`/databases/database/${ record.altId }`)}>[more ...]</Button>
      </span>
      <p></p>
  </div>
)

ResourceItem.propTypes = {
  record: PropTypes.object.isRequired,
  index: PropTypes.number,
}

export default withRouter(ResourceItem)
