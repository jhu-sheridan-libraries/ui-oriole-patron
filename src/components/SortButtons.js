import React from 'react'
import { Container, Col, Row, Button } from 'reactstrap';
import { withRouter } from 'react-router'

const SortButtons = (props) => {
    return (
      <Col className="col-*">
          Sort:  <Button color="primary">A-Z</Button>{' '} <Button color="secondary">Z-A</Button>{' '} <Button color="success">Relevance</Button>{' '}
          Navigate: <Button onClick={() => props.history.push('/Search')}>Route</Button>
      </Col>
   )
 }

 export default withRouter(SortButtons)
