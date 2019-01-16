import * as selectors from './search'
import faker from 'faker'

describe('ORIOLE search selectors', () => {
  let query = faker.lorem.word()
  const state = {
    search: {
      meta: {
        page: 3, 
        isFetching: false
      },
      data: {
        resources: [ faker.lorem.word(), faker.lorem.word(), faker.lorem.word() ],
        totalRecords: 3
      },
      query
    }
  }   

  describe('getPage', () => {
    it('should return meta.page', () => {   
      const selected = selectors.getPage(state)
      expect(selected).toEqual(3)
    })
  })

  describe('isFetching', () => {
    it('should return meta.isFetching', () => {
      const selected = selectors.isFetching(state)
      expect(selected).toEqual(false)
    })
  })

  describe('getResources', () => {
    it('should return data.resources', () => {
      const selected = selectors.getResources(state)
      expect(selected.length).toEqual(3)
    })
  })

  describe('getTotalRecords', () => {
    it('should return data.resources', () => {
      const selected = selectors.getTotalRecords(state)
      expect(selected).toEqual(3)
    })
  })

  describe('getResources', () => {
    it('should return data.resources', () => {
      const selected = selectors.getQuery(state)
      expect(selected).toEqual(query)
    })
  })

})