import { all, takeLatest, call, put, select, takeEvery } from 'redux-saga/effects'
import 'regenerator-runtime/runtime'
import qs from 'query-string'
import { push, LOCATION_CHANGE } from 'connected-react-router'
import * as actions from '../actions'
import { ORIOLE_SEARCH, ORIOLE_FETCH, ORIOLE_FETCH_RECORD } from '../actions/constants'
import { searchOriole, getResourceOriole } from '../apis/oriole'
import * as selectors from '../selectors/search'

// A saga to do the search
function* search(apiCall, action) {
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
    if (pathname === '/AZList' && apiCall === searchOriole) {
      return
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
    yield put(actions.failFetch({ error, searchParams }))
  }
}

function* fetchResource(action) { // saga to fetch single resource based on altId
  let altId, proxy = false
  if (action.type === LOCATION_CHANGE) {
    let { pathname } = action.payload.location
    if (pathname.startsWith('/databases/database')) {
      altId = pathname.split('/')[3]
    } else if (pathname.startsWith('/databases/proxy')) {
      altId = pathname.split('/')[3]
      proxy = true
    } else {
      return null
    }
  } else {
    altId = action.payload
  }

  yield put(actions.beginFetchRecord(altId))
  try {
    const response = yield call(getResourceOriole, altId)
    if (proxy) {
      let record = response.resources[0]
      if (typeof record === "undefined") {
        window.location ="/NOTFOUND-" + altId;
     }
      if (record.proxy) {
        window.location = `http://proxy1.library.jhu.edu/login?url=${ record.url }`
      } else {
        window.location = record.url
      }
    } else {
      yield put(actions.finishFetchRecord({ response, altId }))
    }
  } catch (error) {
    yield put(actions.failFetch({ error, altId }))
  }
}

//** Push to history in react router */
function* history({ payload: searchParams }) {
  let searchString = qs.stringify({ q: searchParams.query })
  yield put(push({ search: searchString }))
}

function* sagas() {
  yield all([
    takeLatest(ORIOLE_SEARCH, search, searchOriole),
    takeLatest(LOCATION_CHANGE, search, searchOriole),
    takeEvery(ORIOLE_FETCH, search, searchOriole),
    takeLatest(ORIOLE_SEARCH, history),
    takeLatest(ORIOLE_FETCH_RECORD, fetchResource),
    takeLatest(LOCATION_CHANGE, fetchResource)
  ])
}

export default sagas
