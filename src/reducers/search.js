import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = Immutable({
  query: undefined,    // the query term
  data: { resources: [], totalRecords: 0 }, // the result
  error: undefined,    // error object
  meta: {
    isFetching: false, // if it's in the middle of fetching
    page: 0,      // current page. default 0
    pageSize: 20, // default page size
    isNewSearch: true
  },
  resource: undefined
})

export const searchReducers = handleActions({
  [actions.search]: (state, { payload }) => ({
    ...state, query: payload.query
  }),
  [actions.beginFetch]: (state, { payload }) => {
    let data, page
    const isNewSearch = payload.isNewSearch
    if (isNewSearch) { // new search, reset data and page
      data = { resources: [], totalRecords: 0 }
      page = 0
    } else {
      data = state.data
      page = state.meta.page + 1
    }
    return  { ...state, query: payload.query, data, meta: { ...state.meta, isFetching: true, page, isNewSearch } }
  },
  [actions.finishFetch]: (state, { payload }) => {
    let data = state.data
    if (payload.searchParams.isNewSearch) {
      data = payload.response
    } else {
      data.resources = [ ...data.resources, ...payload.response.resources ]  // concatenate the resources in data
    }
    return { ...state, query: payload.searchParams.query, data, meta: { ...state.meta, isFetching: false } }
  },
  [actions.failFetch]: (state, { payload }) => ({
    ...state, error: payload, meta: { ...state.meta, isFetching: false }
  }),
  [actions.finishFetchRecord]: (state, { payload }) => {
    return {...state, resource: payload.response.resources[0]} 
  }
}, initialState)

export default searchReducers
