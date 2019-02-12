import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import './App.css';
import Header from './Header'
import Footer from './Footer'
import Search from './Search'
import Subjects from './Subjects'

class App extends Component {
  render() {
    return (
      <div className="App">
      {this.props.children}
      <Header />
      <Row>
        <Col className="col-2" id="Subjects">
          <Subjects />
        </Col>
        <Col classname="col-6">
          <Search />
        </Col>
      </Row>
      <Footer />
      </div>
    );
  }
}

export default App;
