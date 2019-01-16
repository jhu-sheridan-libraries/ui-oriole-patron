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

export const listReducers = handleActions({
  [actions.list]: (state, { payload }) => ({
    ...state, query: payload.query
  }),
  [actions.beginFetch]: (state, { payload }) => ({
    ...state, query: payload.query, data: {}, meta: { ...state.meta, isFetching: true, page: payload.page }
  }),
  [actions.finishFetch]: (state, { payload }) => ({
    ...state, query: payload.searchParams.query, data: payload.response, meta: { ...state.meta, isFetching: false }
  }),
  [actions.failFetch]: (state, { payload }) => ({
    ...state, error: payload, data: {}, meta: { ...state.meta, isFetching: false }
  })
}, initialState)

export default listReducers
