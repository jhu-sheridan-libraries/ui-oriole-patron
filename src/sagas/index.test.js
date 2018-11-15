import { expectSaga } from 'redux-saga-test-plan'
import faker from 'faker'
import { push, LOCATION_CHANGE } from 'react-router-redux'
import { __RewireAPI__ as Saga } from './index'
import * as actionTypes from '../actions/constants'

describe('Saga', () => {
  describe('search saga', () => {

    it('calls api and creates a namespaced action for ORIOLE_SEARCH', () => {
      const search = Saga.__get__('search')
      const callApi = value => ({ value })
      const searchTerm = faker.lorem.word()
      const action = {
        type: actionTypes.ORIOLE_SEARCH,
        payload: { query: searchTerm }
      }
      
      return expectSaga(search, callApi, action)
        .put({ type: `${ actionTypes.ORIOLE_SEARCH_SUCCESS }`, payload: { value: { query: searchTerm }}})
        .run()
    })

    it('calls api and creates a namespaced action for router LOCATION_CHANGE', () => {
      const search = Saga.__get__('search')
      const callApi = value => ({ value })
      const namespace = faker.lorem.word()
      const searchTerm = faker.lorem.word()
      const action = {
        type: LOCATION_CHANGE,
        payload: { search: `q=${ searchTerm }` }
      }
      return expectSaga(search, namespace, callApi, action) 
        .put({ type: `${ namespace }/${ actionTypes.ORIOLE_SEARCH_SUCCESS }`, payload: { value: { query: searchTerm }}})
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

