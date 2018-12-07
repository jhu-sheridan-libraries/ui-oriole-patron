import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = Immutable({
  query: undefined,    // the query term
  data: { resources: [], totalRecoards: 0 }, // the result
  error: undefined,    // error object
  meta: {
    isFetching: false, // if it's in the middle of fetching
    page: -1,      // current page. default 0
    pageSize: 20, // default page size
    isNewSearch: true
  }
})

export const searchReducers = handleActions({
  [actions.search]: (state, { payload }) => ({
    ...state, query: payload.query
  }),
  [actions.beginFetch]: (state, { payload }) => {
    let data, page
    if (payload.isNewSearch) { // new search, reset data and page
      data = { resources: [], totalRecoards: 0 }
      page = 0
    } else {  
      data = state.data
      page = state.meta.page + 1
    }
    return  { ...state, query: payload.query, data: data, meta: { ...state.meta, isFetching: true, page: page } }
  },
  [actions.finishFetch]: (state, { payload }) => {
    let data = state.data
    if (payload.searchParams.isNewSearch) {
      data = payload.response 
    } else {
      data.resources = [ ...data.resources, ...payload.response.resources ]
    }
    return { ...state, query: payload.searchParams.query, data: data, meta: { ...state.meta, isFetching: false } }
  },
  [actions.failFetch]: (state, { payload }) => ({
    ...state, error: payload, meta: { ...state.meta, isFetching: false }
  }),
  [actions.cancelFetch]: (state, { payload }) => ({
    ...state, error: undefined, meta: { ...state.meta, isFetching: false }
  })
}, initialState)

export default searchReducers