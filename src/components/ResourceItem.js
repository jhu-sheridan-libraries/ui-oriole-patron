import React from 'react'

const ResourceItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ record.url } target='_new'>{ record.title }</a></span><br />
      <span className='itemDescription'>{ record.description }</span>
      <p></p>
  </div>
)

export default ResourceItem
