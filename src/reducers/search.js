import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = Immutable({
  query: undefined,
  data: {},
  error: undefined,
  meta: {
    isFetching: false,
    page: 0,
    size: 20,
  }
})

export const searchReducers = handleActions({
  [actions.search]: (state, { payload }) => ({
    ...state, query: payload.query
  }),
  [actions.beginSearch]: (state, { payload }) => ({
    ...state, data: {}, meta: { ...state.meta, isFetching: true, page: 0 }
  }),
  [actions.finishSearch]: (state, { payload }) => {
    return { 
    ...state, data: payload, meta: { ...state.meta, isFetching: false }
  }},
  [actions.failSearch]: (state, { payload }) => ({
    ...state, error: payload, data: {}, meta: { ...state.meta, isFetching: false }
  }),
  [actions.cancelSearch]: (state, { payload }) => ({
    ...state, data: payload, isFetching: false
  }),
  [actions.beginFetch]: (state, { payload }) => ({
    ...state, meta: { ...state.meta, isFetching: true }
  }),
  [actions.finishFetch]: (state, { payload }) => ({
    ...state, data: payload, meta: { ...state.meta, page: state.meta.page+1, isFetching: false }
  }), 
  [actions.failFetch]: (state, { payload }) => ({
    ...state, error: payload, meta: { ...state.meta, isFetching: false }
  })
}, initialState)

export default searchReducers