import faker from 'faker'
import reducer, { __RewireAPI__ as RewireAPI } from './search'
import * as actionTypes from '../actions/constants'

describe('reducers', () => {
  let query = faker.lorem.word()
  let data = { totalRecords: 20, resources: {} }
  let initialState = RewireAPI.__get__('initialState')

  it('should return the initial state', () => {    
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ORIOLE_SEARCH_BEGIN', () => {
    const action = {
      type: actionTypes.ORIOLE_SEARCH_BEGIN,
      payload: { query: query, page: 0 }
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, query: query, data: {}, meta: { ...initialState.meta, isFetching: true } })
  })

  it('should handle ORIOLE_SEARCH_SUCCESS', () => {
    const state = { ...initialState, query: query }
    const action = {
      type: actionTypes.ORIOLE_SEARCH_SUCCESS,
      payload: data
    }
    expect(reducer(state, action)).toEqual({ ...state, data: data, meta: { ...state.meta, isFetching: false }})
  })

  it('should handle ORIOLE_SEARCH_ERROR', () => { 
    const error = new TypeError(faker.lorem.word())
    const action = {
      type: actionTypes.ORIOLE_SEARCH_ERROR,
      payload: error,
      error: true
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, error: error, meta: { ...initialState.meta, isFetching: false }})
  })

  it('should handle ORIOLE_SEARCH_CANCEL', () => {
    const action = {
      type: actionTypes.ORIOLE_SEARCH_CENCEL,
      payload: query
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, meta: { ...initialState.meta, isFetching: false }})
  })

  it('should handle ORIOLE_FETCH_BEGIN', () => {
    const action = {
      type: actionTypes.ORIOLE_FETCH_BEGIN
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, meta: { ...initialState.meta, isFetching: true }})
  })

  it('should handle ORIOLE_FETCH_ERROR', () => {
    const error = new TypeError(query)
    const action = {
      type: actionTypes.ORIOLE_FETCH_ERROR,
      payload: error, 
      error: true
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, error: error, meta: { ...initialState.meta, isFetching: false }})
  })

  it('should handle ORIOLE_FETCH_SUCCESS', () => {
    const action = {
      type: actionTypes.ORIOLE_FETCH_SUCCESS,
      payload: query
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, data: query, meta: { ...initialState.meta, page: 1, isFetching: false }})
  })
})