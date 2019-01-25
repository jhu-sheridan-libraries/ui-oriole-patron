import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import './index.css'
import App from './components/App'
import Search from './components/Search'
import List from './components/List'
import AZList from './components/AZList'
import Subjects from './components/Subjects'
import Header from './components/Header'
import Footer from './components/Footer'
import ActiveFilters from './components/ActiveFilters'
import * as serviceWorker from './serviceWorker'

const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
const historyMiddleware = routerMiddleware(history)
const middlewares = [ sagaMiddleware, historyMiddleware ]
const rootReducer  = combineReducers({ ...reducers, router: connectRouter(history) })
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div>
        <Switch>
          <Route path='/' component={ App }/>
          <Route path='/Search' component={ Search }/>
          <Route path='/List' component={ List }/>
          <Route path='/AZList' component={ AZList }/>
          <Route path='/Subjects' component={ Subjects }/>
          <Route path='/Header' component={ Header }/>
          <Route path='/Footer' component={ Footer }/>
          <Route path='/ActiveFilters' component={ ActiveFilters }/>
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
