import React from 'react'

const ResourceItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ "http://proxy.library.jhu.edu/login?url=" + record.url } target='_new'>{ record.title }</a></span><br />
      <span className='itemDescription'>{ record.description }</span>
      <p></p>
  </div>
)

export default ResourceItem
