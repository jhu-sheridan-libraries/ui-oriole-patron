import * as actions from './index'
import faker from 'faker'
import * as actionTypes from './constants'

describe('ORIOLE search actions', () => {
  let value = faker.lorem.word()

  describe('ORIOLE_SEARCH_BEGIN', () => {
    it('should create an action to begin search', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_SEARCH_BEGIN,
        payload: value
      }
      expect(actions.beginSearch(value)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_SEARCH_CANCEL', () => {
    it('should create an action to cancel a search', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_SEARCH_CANCEL,
        payload: value
      }
      expect(actions.cancelSearch(value)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_SEARCH_FINISH', () => {
    it('should create an action to finish a search', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_SEARCH_SUCCESS,
        payload: value
      }
      expect(actions.finishSearch(value)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_SEARCH_FAIL', () => {
    it('should create an action and set action.error to true', () => {
      let error = new TypeError(value)
      let expectedAction = {
        type: actionTypes.ORIOLE_SEARCH_ERROR,
        payload: error,
        error: true
      }
      expect(actions.failSearch(error)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_FETCH_BEGIN', () => {
    it('should create an action to begin fetch', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_FETCH_BEGIN,
        payload: value
      }
      expect(actions.beginFetch(value)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_FETCH_FINISH', () => {
    it('should create an action to finish a fetch', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_FETCH_SUCCESS,
        payload: value
      }
      expect(actions.finishFetch(value)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_FETCH_FAIL', () => {
    it('should create an action and set action.error to true', () => {
      let error = new TypeError(value)
      let expectedAction = {
        type: actionTypes.ORIOLE_FETCH_ERROR,
        payload: error,
        error: true
      }
      expect(actions.failFetch(error)).toEqual(expectedAction)
    })
  })
})