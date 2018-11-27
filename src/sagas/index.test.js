import { expectSaga } from 'redux-saga-test-plan'
import faker from 'faker'
import { LOCATION_CHANGE } from 'connected-react-router'
import { __RewireAPI__ as Saga } from './index'
import * as actionTypes from '../actions/constants'

describe('Saga', () => {
  describe('search saga', () => {

    it('calls api and creates a namespaced action for ORIOLE_SEARCH', () => {
      const search = Saga.__get__('search')
      const response = faker.lorem.slug
      const apiCall = value => response
      const searchTerm = faker.lorem.word()
      const action = {
        type: actionTypes.ORIOLE_SEARCH,
        payload: { query: searchTerm }
      }
      
      return expectSaga(search, apiCall, action)
        .put({ type: `${ actionTypes.ORIOLE_FETCH_SUCCESS }`, payload: { response, searchParams: { query: searchTerm }}})
        .run()
    })

    it('calls api and creates a namespaced action for router LOCATION_CHANGE', () => {
      const search = Saga.__get__('search')
      const response = faker.lorem.slug
      const apiCall = value => response
      const searchTerm = faker.lorem.word()
      const action = {
        type: LOCATION_CHANGE,
        payload: { search: `q=${ searchTerm }`, page: 0 }
      }
      return expectSaga(search, apiCall, action) 
      .put({ type: `${ actionTypes.ORIOLE_FETCH_SUCCESS }`, payload: { response, searchParams: { query: searchTerm }}})
        .run()
    })
  })

  describe('history saga', () => {
    it('pushes a record to history', () => {
      const push = Saga.__set__('push', value => value)
      const history = Saga.__get__('history')
      let searchTerm = faker.lorem.word()
      let action = {
        type: actionTypes.ORIOLE_SEARCH,
        payload: { query: searchTerm }
      }
      return expectSaga(history, action)
        .put({ search: `q=${ searchTerm }` })
        .run()
      Saga.__ResetDependency__('push')
    })
  })
})

