import faker from 'faker'
import reducer, { __RewireAPI__ as RewireAPI } from './search'
import * as actionTypes from '../actions/constants'

describe('reducers', () => {
  let value = faker.lorem.word()
  let initialState = RewireAPI.__get__('initialState')

  it('should return the initial state', () => {    
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ORIOLE_SEARCH_BEGIN', () => {
    const action = {
      type: actionTypes.ORIOLE_SEARCH_BEGIN
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, data: {}, meta: { ...initialState.meta, isFetching: true } })
  })

  it('should handle ORIOLE_SEARCH_SUCCESS', () => {
    const action = {
      type: actionTypes.ORIOLE_SEARCH_SUCCESS,
      payload: value
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, data: value, meta: { ...initialState.meta, isFetching: false }})
  })

  it('should handle ORIOLE_SEARCH_ERROR', () => { 
    const error = new TypeError(value)
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
      payload: value
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, meta: { ...initialState.meta, isFetching: false }})
  })

  it('should handle ORIOLE_FETCH_BEGIN', () => {
    const action = {
      type: actionTypes.ORIOLE_FETCH_BEGIN
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, meta: { ...initialState.meta, isFetching: true }})
  })
})