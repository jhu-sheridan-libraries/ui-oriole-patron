import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import './index.css'
import Search from './components/Search'
import * as serviceWorker from './serviceWorker'

const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const historyMiddleware = routerMiddleware(history)
const middlewares = [ sagaMiddleware, historyMiddleware ]
const rootReducer  = combineReducers({ ...reducers, router: connectRouter(history) })
const store = applyMiddleware(...middlewares)(createStore)(rootReducer)
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Route path='/' component={ Search }/>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
