import * as actions from './index'
import faker from 'faker'
import * as actionTypes from './constants'

describe('ORIOLE search actions', () => {
  let value = faker.lorem.word()

  describe('ORIOLE_FETCH_BEGIN', () => {
    it('should create an action to begin fetch', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_FETCH_BEGIN,
        payload: value
      }
      expect(actions.beginFetch(value)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_FETCH_SUCCESS', () => {
    it('should create an action to finish a fetch', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_FETCH_SUCCESS,
        payload: value
      }
      expect(actions.finishFetch(value)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_FETCH_ERROR', () => {
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
  
  describe('ORIOLE_FETCH_RECORD_BEGIN', () => {
    it('should create an action to begin fetch', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_FETCH_RECORD_BEGIN,
        payload: value
      }
      expect(actions.beginFetch(value)).toEqual(expectedAction)
    })
  })

  describe('ORIOLE_FETCH_RECORD_SUCCESS', () => {
    it('should create an action to finish a fetch', () => {
      let expectedAction = {
        type: actionTypes.ORIOLE_FETCH_RECORD_SUCCESS,
        payload: value
      }
      expect(actions.finishFetch(value)).toEqual(expectedAction)
    })
  })
})