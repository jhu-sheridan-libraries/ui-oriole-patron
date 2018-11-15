import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'

const initialState = Immutable({
  data: {},
  isFetching: false
})

export const reducers = handleActions({
  [actions.beginSearch]: (state, { payload }) => ({
    ...state, data: payload, isFetching: true
  }),
  [actions.finishSearch]: (state, { payload }) => ({ 
    ...state, data: payload, isFetching: false
  }),
  [actions.failSearch]: (state, { payload }) => ({
    ...state, error: payload, isFetching: false
  }),
  [actions.cancelSearch]: (state, { payload }) => ({
    ...state, data: payload, isFetching: false
  })
}, initialState)

export default reducers