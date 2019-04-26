import { all, takeLatest, fork, call, put, select, takeEvery } from 'redux-saga/effects'
import 'regenerator-runtime/runtime'
import qs from 'query-string'
import { push, LOCATION_CHANGE } from 'connected-react-router'
import * as actions from '../actions'
import { ORIOLE_SEARCH, ORIOLE_FETCH, ORIOLE_LIST } from '../actions/constants'
import { searchOriole, listOriole } from '../apis/oriole'
import * as selectors from '../selectors/search'

// A saga to do the search
function* search(apiCall, action) {
  console.log(apiCall, action)
  let isSearching = true
  let searchParams = {}
  if (action.type === LOCATION_CHANGE  ) {
    let { pathname, search } = action.payload.location
    if (search !== '' && action.payload.action === 'POP') {
      let urlParams = qs.parse(action.payload.location.search)
      searchParams = { query: urlParams.q, isNewSearch: true }
    } else {
      searchParams = { query: '', isNewSearch: true }
    }
    if (pathname === '/List' && apiCall === searchOriole) {
      return
    }
    if (pathname === '/Search' && apiCall === listOriole) {
      return
    }
    if (pathname === '/List') {
      isSearching = false
    }
  } else if (action.type === ORIOLE_SEARCH) {
    searchParams = { ...action.payload, isNewSearch: true }
  } else if (action.type === ORIOLE_FETCH) {
    // fetch more results. get current query from state
    const query = yield select(selectors.getQuery)
    searchParams = { query: query, isNewSearch: false }
  }
  if (isSearching && !searchParams.query) {
    return
  }  // fetch only when query is not empty
  yield put(actions.beginFetch(searchParams))
  try {
    searchParams.page = yield select(selectors.getPage)
    const response = yield call(apiCall, searchParams)
    yield put(actions.finishFetch({ response, searchParams }))
  } catch (error) {
    yield put(actions.failFetch({ error, searchParams }))  }
}

//** Push to history in react router */
function* history({ payload: searchParams }) {
  let searchString = qs.stringify({ q: searchParams.query })
  yield put(push({ search: searchString }))
}

function* sagas() {
  // Create a pair of forked sagas for each widget:
  // One fork is for user inititiated search;
  // The other is for starting search by changing the browser location
  const forks = [
    fork(takeLatest, ORIOLE_SEARCH, search, searchOriole),
    fork(takeLatest, LOCATION_CHANGE, search, searchOriole),
    fork(takeEvery, ORIOLE_FETCH, search, searchOriole),
    fork(takeLatest, ORIOLE_SEARCH, history),
    fork(takeLatest, ORIOLE_LIST, history)]
  yield all(forks)
}

export default sagas
