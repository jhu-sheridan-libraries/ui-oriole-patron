import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
import List from './List'
import ResourceDetail from './ResourceDetail'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={ Search }/>
          <Route path='/List' component={ List } />
          <Route exact path={'/databases/proxy/:altId'} />
          <Route path={'/databases/database/:altId'} component={ ResourceDetail }/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App