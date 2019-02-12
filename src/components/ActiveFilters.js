import React from 'react'
import { Container, Col, Row, Button } from 'reactstrap';

const ActiveFilters = () => {
    return (
      <Col className="col-*">
          Active Filters:  <Button color="primary">Filter</Button>{' '} <Button color="secondary">Filter</Button>{' '} <Button color="success">Filter</Button>{' '}
      </Col>
    )
 }

 export default ActiveFilters
