import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = Immutable({
  data: undefined,
  meta: {
    isFetching: false,
    start: 0,
    page: 0,
    size: 20
  }
})

export const searchReducers = handleActions({
  [actions.search]: (state, { payload }) => ({
    ...state, query: payload.query
  }),
  [actions.beginSearch]: (state, { payload }) => ({
    ...state, data: payload, isFetching: true
  }),
  [actions.finishSearch]: (state, { payload }) => {
    return { 
    ...state, data: payload, isFetching: false
  }},
  [actions.failSearch]: (state, { payload }) => ({
    ...state, error: payload, isFetching: false
  }),
  [actions.cancelSearch]: (state, { payload }) => ({
    ...state, data: payload, isFetching: false
  })
}, initialState)

export default searchReducers