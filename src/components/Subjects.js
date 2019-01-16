import React, { Component } from 'react'
import { Container, Nav, NavLink, NavItem, ListGroup, ListGroupItem } from 'reactstrap'

class Subjects extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Container className="subjects-container">
          <ListGroup>
            <ListGroupItem>Subject 1</ListGroupItem>
            <ListGroupItem>Subject 2</ListGroupItem>
            <ListGroupItem>Subject 3</ListGroupItem>
            <ListGroupItem>Subject 4</ListGroupItem>
            <ListGroupItem>Subject 5</ListGroupItem>
          </ListGroup>
        </Container>
      </div>
    )
  }
}

export default Subjects
