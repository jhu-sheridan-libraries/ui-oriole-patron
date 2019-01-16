import React from 'react'
import { shallow } from 'enzyme'
import faker from 'faker'
import { __RewireAPI__ as RewiredAPI } from './ResourceItem'

const ResourceItem = RewiredAPI.__get__("ResourceItem")

describe('ResourceItem', () => {

  const title = faker.lorem.sentence()
  const record = { 
    title,
    url: faker.internet.url(),
    description: faker.lorem.paragraph()
  }
  const component = shallow(<ResourceItem record = { record } />)

  it('should render without throwing an error', () => {
    expect(component.exists()).toBe(true)
  })

  it('should render item title html-decoded', () => {
    expect(component.find('.itemTitle').text()).toEqual(title)
  })

})
