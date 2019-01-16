import React from 'react'

const ResourceItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ record.url } target='_new'>{ record.title }</a></span>
  </div>
)

export default ResourceItem
