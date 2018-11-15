import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const historyMiddleware = routerMiddleware(history);
const middlewares = [ sagaMiddleware, historyMiddleware ];
const rootReducer  = combineReducers({ ...reducers, router: routerReducer });
const store = applyMiddleware(...middlewares)(createStore)(rootReducer);
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Route path='/' component={ App }/>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
