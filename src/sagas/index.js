import { all, takeLatest, fork, call, put, select, takeEvery } from 'redux-saga/effects'
import 'regenerator-runtime/runtime'
import qs from 'query-string'
import { push, LOCATION_CHANGE } from 'connected-react-router'
import * as actions from '../actions'
import { ORIOLE_SEARCH, ORIOLE_FETCH } from '../actions/constants'
import { searchOriole } from '../apis/oriole'
import * as selectors from '../selectors/search'

// A saga to do the search 
function* search(apiCall, action) {
  let searchParams = {}
  if (action.type === LOCATION_CHANGE && action.payload.action === 'POP') { 
    // only handles location change from browser
    let urlParams = qs.parse(action.payload.location.search)
    searchParams = { query: urlParams.q, isNewSearch: true }
  } else if (action.type === ORIOLE_SEARCH) {
    searchParams = { ...action.payload, isNewSearch: true }
  } else if (action.type === ORIOLE_FETCH) {
    // fetch more results. get current query from state
    const query = yield select(selectors.getQuery)
    searchParams = { query: query, isNewSearch: false }
  }
  if (searchParams.query) {  // fetch only when query is not empty
    yield put(actions.beginFetch(searchParams))
    try {
      searchParams.page = yield select(selectors.getPage)  
      const response = yield call(apiCall, searchParams)  
      yield put(actions.finishFetch({ response, searchParams }))
    } catch (error) {
      yield put(actions.failFetch({ error, searchParams }))
    }
  }
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
    fork(takeLatest, ORIOLE_SEARCH, history)]
  yield all(forks)
}

export default sagas