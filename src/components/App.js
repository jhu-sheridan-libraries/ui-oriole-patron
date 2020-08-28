import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
import AZList from './AZList'
import ResourceDetail from './ResourceDetail'
import TagResourceList from './TagResourceList'
import PageNotFound from './PageNotFound'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={ Search }/>
          <Route exact path='/databases.library.jhu.edu' component={ Search }/>
          <Route path='/AZList' component={ AZList } />
          <Route path='/databases/subject/:tag' component={ TagResourceList } />
		      <Route path='/embed/subject/:tag' component={ TagResourceList } />
          <Route path='/databases/database/:altId' component={ ResourceDetail }/>
          <Route component={ PageNotFound }/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App
