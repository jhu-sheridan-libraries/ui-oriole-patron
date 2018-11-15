import { all, takeLatest, fork, call, put } from 'redux-saga/effects'
import 'regenerator-runtime/runtime'
import qs from 'query-string'
import { push, LOCATION_CHANGE } from 'react-router-redux'
import * as actions from '../actions'
import { ORIOLE_SEARCH } from '../actions/constants'

const searchOriole = (searchParams) => {
  let url = `${ process.env.LARA_API }?page[size]=5&filter[keyword]=${ searchParams.query }`
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(url, {})
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  }) 
}

// A saga to do the search 
function* search(callApi, action) {
  let value
  if (action.type === LOCATION_CHANGE) {
    let queryParams = qs.parse(action.payload.search)
    value = { query: queryParams.q }
  } else if (action.type === ORIOLE_SEARCH) {
    value = action.payload
  } else {
    // TODO: yield an error
  }
  yield put(actions.beginSearch(value))
  try {
    const response = yield call(callApi, value)    
    yield put(actions.finishSearch(response))
  } catch (e) {
    yield put(actions.failSearch(value))
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
    fork(takeLatest, ORIOLE_SEARCH, history)]
  yield all(forks)
}

export default sagas