import { createAction } from 'redux-actions'
import * as actionTypes from './constants'
// defines action creators for the oriole app.
export const search = createAction(actionTypes.ORIOLE_SEARCH)
export const fetch = createAction(actionTypes.ORIOLE_FETCH)
export const beginFetch = createAction(actionTypes.ORIOLE_FETCH_BEGIN)
export const finishFetch = createAction(actionTypes.ORIOLE_FETCH_SUCCESS)
export const failFetch = createAction(actionTypes.ORIOLE_FETCH_ERROR)
export const fetchRecord = createAction(actionTypes.ORIOLE_FETCH_RECORD)
export const beginFetchRecord = createAction(actionTypes.ORIOLE_FETCH_RECORD_BEGIN)
export const finishFetchRecord = createAction(actionTypes.ORIOLE_FETCH_RECORD_SUCCESS)
