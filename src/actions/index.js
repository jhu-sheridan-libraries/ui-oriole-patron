import { createAction } from 'redux-actions'
import * as actionTypes from './constants'
// defines action creators for the oriole app. 
export const search = createAction(actionTypes.ORIOLE_SEARCH)
export const fetch = createAction(actionTypes.ORIOLE_FETCH)
export const beginFetch = createAction(actionTypes.ORIOLE_FETCH_BEGIN)
export const finishFetch = createAction(actionTypes.ORIOLE_FETCH_SUCCESS)
export const failFetch = createAction(actionTypes.ORIOLE_FETCH_ERROR)
export const cancelFetch = createAction(actionTypes.ORIOLE_FETCH_CANCEL)
