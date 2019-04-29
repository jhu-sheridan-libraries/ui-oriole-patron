import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import './App.css';
import Header from './Header'
import Footer from './Footer'
import Search from './Search'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
        <Header />
        <Row>
          <Col className="col-12">
            <Search />
          </Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default App