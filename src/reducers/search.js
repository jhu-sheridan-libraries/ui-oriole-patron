import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = Immutable({
  query: undefined,    // the query term
  data: {},            // the result
  error: undefined,    // error object
  meta: {
    isFetching: false, // if it's in the middle of fetching
    page: 0,      // current page. default 0
    pageSize: 20, // default page size
  }
})

export const searchReducers = handleActions({
  [actions.search]: (state, { payload }) => ({
    ...state, query: payload.query
  }),
  [actions.beginSearch]: (state, { payload }) => ({
    ...state, query: payload.query, data: {}, meta: { ...state.meta, isFetching: true, page: payload.page }
  }),
  [actions.finishSearch]: (state, { payload }) => ({
    ...state, query: payload.searchParams.query, data: payload.response, meta: { ...state.meta, isFetching: false }
  }),
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