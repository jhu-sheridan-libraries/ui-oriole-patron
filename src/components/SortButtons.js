import React from 'react'
import { Container, Col, Row, Button } from 'reactstrap';

const SortButtons = () => {
    return (
      <Col className="col-*">
          Sort:  <Button color="primary">A-Z</Button>{' '} <Button color="secondary">Z-A</Button>{' '} <Button color="success">Relevance</Button>{' '}
      </Col>
   )
 }

 export default SortButtons
