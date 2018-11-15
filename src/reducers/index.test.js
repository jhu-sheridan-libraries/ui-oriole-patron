import faker from 'faker'
import Immutable from 'seamless-immutable'
import reducer from './index'
import * as actionTypes from '../actions/constants'

describe('reducers', () => {
  let value = faker.lorem.word()
  let initialState = Immutable({
    data: {},
    isFetching: false
  })

  it('should return the initial state', () => {    
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ORIOLE_SEARCH_BEGIN', () => {
    const action = {
      type: actionTypes.ORIOLE_SEARCH_BEGIN,
      payload: value
    }
    expect(reducer(initialState, action)).toEqual({ data: value, isFetching: true })
  })

  it('should handle ORIOLE_SEARCH_SUCCESS', () => {
    const action = {
      type: actionTypes.ORIOLE_SEARCH_SUCCESS,
      payload: value
    }
    expect(reducer(initialState, action)).toEqual({ data: value, isFetching: false })
  })

  it('should handle ORIOLE_SEARCH_ERROR', () => { 
    const error = new TypeError(value)
    const action = {
      type: actionTypes.ORIOLE_SEARCH_ERROR,
      payload: error,
      error: true
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, error: error, isFetching: false })
  })

  it('should handle ORIOLE_SEARCH_CANCEL', () => {
    const action = {
      type: actionTypes.ORIOLE_SEARCH_CENCEL,
      payload: value
    }
    expect(reducer(initialState, action)).toEqual({ ...initialState, isFetching: false })
  })
})