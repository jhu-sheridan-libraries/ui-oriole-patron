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
    const action = {
      type: actionTypes.ORIOLE_FETCH_SUCCESS,
      payload: { response: initialData, searchParams: { query: query } }
    }
    expect(reducer(state, action)).toEqual({ ...state, data: initialData, meta: { ...state.meta, isFetching: false }})
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

  it('should handle ORIOLE_FETCH_CANCEL', () => {
    const action = {
      type: actionTypes.ORIOLE_FETCH_CANCEL,
      payload: query
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, meta: { ...initialState.meta, isFetching: false }})
  })

})