import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const ResourceItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ "https://databases.library.jhu.edu/databases/proxy/" + record.altId } target='_new'>{ record.title }</a></span><br />
      <span className='itemDescription'>{ record.description } <Link to={{pathname: "/databases/database/" + record.altId}} >[more...]</Link></span>
      <p></p>
  </div>
)

export default withRouter(ResourceItem)
