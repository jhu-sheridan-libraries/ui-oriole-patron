import faker from 'faker'
import reducer, { __RewireAPI__ as RewireAPI } from './search'
import * as actionTypes from '../actions/constants'

describe('reducers', () => {
  let query = faker.lorem.word()
  const initialData = { totalRecords: 0, resources: [] }
  const initialState = RewireAPI.__get__('initialState')
  

  it('should return the initial state', () => {    
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ORIOLE_FETCH_BEGIN', () => {
    const action = {
      type: actionTypes.ORIOLE_FETCH_BEGIN,
      payload: { query: query, isNewSearch: true }
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, query: query, data: initialData, meta: { ...initialState.meta, isFetching: true } })
  })

  it('should increase page by 1 if it is not a new search', () => {
    const action = {
      type: actionTypes.ORIOLE_FETCH_BEGIN,
      payload: { query: query, isNewSearch: false }
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, query: query, data: initialData, meta: { ...initialState.meta, isFetching: true, isNewSearch: false, page: 1 } })
  })

  it('should handle ORIOLE_FETCH_SUCCESS', () => {
    const state = { ...initialState, query: query } 
    const data = { resources: [ faker.lorem.word(), faker.lorem.word() ], totalRecords: 2 }
    const action = {
      type: actionTypes.ORIOLE_FETCH_SUCCESS,
      payload: { response: data, searchParams: { query: query, isNewSearch: true } }
    }
    expect(reducer(state, action)).toEqual({ ...state, data, meta: { ...state.meta, isFetching: false }})
  })

  it('should append the resources if it is not a new search', () => {
    const resources = [ faker.lorem.word(), faker.lorem.word(), faker.lorem.word() ]
    const state = { ...initialState, data: { resources: [ resources[0] ], totalRecords: 3 }, query: query }
    const data = { resources: resources.slice(1,3), totalRecords: 3 }
    const action = {
      type: actionTypes.ORIOLE_FETCH_SUCCESS,
      payload: { response: data, searchParams: { query: query, isNewSearch: false } }
    }
    expect(reducer(state, action)).toEqual({ ...state, data: { resources, totalRecords: 3 }, meta: { ...state.meta, isFetching: false }})
  })

  it('should handle ORIOLE_FETCH_ERROR', () => { 
    const error = new TypeError(faker.lorem.word())
    const action = {
      type: actionTypes.ORIOLE_FETCH_ERROR,
      payload: error,
      error: true
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, error: error, meta: { ...initialState.meta, isFetching: false }})
  })

})