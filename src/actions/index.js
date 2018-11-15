import { createAction } from 'redux-actions'
import * as actionTypes from './constants'
// defines action creators for the oriole app. 
export const search = createAction(actionTypes.ORIOLE_SEARCH)
export const beginSearch = createAction(actionTypes.ORIOLE_SEARCH_BEGIN)
export const cancelSearch = createAction(actionTypes.ORIOLE_SEARCH_CANCEL)
export const finishSearch = createAction(actionTypes.ORIOLE_SEARCH_SUCCESS)
export const failSearch = createAction(actionTypes.ORIOLE_SEARCH_ERROR)
